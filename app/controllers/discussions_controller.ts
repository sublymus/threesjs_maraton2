import Discussion from '#models/discussion';
import User from '#models/user';
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon';
import { v4 } from 'uuid';
import { createFiles } from './Tools/FileManager/CreateFiles.js';
import Message from '#models/message';
import { limitation, paginate } from './Tools/Utils.js';
import db from '@adonisjs/lucid/services/db';
import { deleteFiles } from './Tools/FileManager/DeleteFiles.js';

export default class DiscussionController {

  public async get_discussions({ request, auth }: HttpContext) {
    // on recus tout les messages
    const { blocked } = request.qs();
    const user = await auth.authenticate();
    const ds = await db.from(
      db.from(Discussion.table)
        .select("*")
        .where((q) => {
          q.where("creator_id", user.id)
            .orWhere("receiver_id", user.id)
        })
    ).select('*')
      .orderBy("updated_at", "desc");
    const ds2 = ds.filter(f => f.deleted != user.id);
    const promises = ds2.map((d) => new Promise(async (rev) => {
      const creator = (await db.from(User.table).where('id', d.creator_id).limit(1))[0];
      const receiver = (await db.from(User.table).where('id', d.receiver_id).limit(1))[0];
      const me = user.id == receiver.id ? 'receiver' : 'creator';
      const other = user.id == receiver.id ? 'creator' : 'receiver';
      d.receiver = User.ParseUser(receiver as any);
      d.creator= User.ParseUser(creator as any);
      
      rev({
        ...d,
        me,
        other,
        unchedked_count: (await db.query().from(Message.table).select('*').where('table_id', d.id).andWhere('created_at', '>', d[me+'_opened_at'])).length
      })
    }));

    const discussions = (await Promise.allSettled(promises)).filter(f => f.status == 'fulfilled').map(m => (m as any).value)
    if (blocked == 'no') {
      return discussions.filter(f => !f.blocked?.includes(user.id));
    } if (blocked == 'only') {
      return discussions.filter(f => !!(f.blocked && f.blocked.includes(user.id)));
    }
    return discussions;
  }

  public async create_discussion({ auth, request }: HttpContext) {
    const { receiver_id } = request.body();

    const receiver = await User.find(receiver_id);
    if (!receiver) return 'Receiver Not Found';

    const user = await auth.authenticate();
    const id = v4();

    const existingDiscussion = (await Discussion.query()
      .select("*").where((p) => {
        p.where("creator_id", user.id)
          .andWhere("receiver_id", receiver_id)
      }).orWhere((p) => {
        p.where("creator_id", receiver_id)
          .andWhere("receiver_id", user.id)
      }).limit(1))[0];
    if (existingDiscussion) {
      if (existingDiscussion.deleted == user.id) {
        existingDiscussion.deleted = null;
        await existingDiscussion.save();
      }
      return existingDiscussion.$attributes
    }

    const discussion = await Discussion.create({
      id,
      creator_id: user.id,
      receiver_id,
      creator_opened_at: DateTime.now()
    })

    return {
      ...discussion.$attributes,
      id,
    }
  }

  public async send_message({ request, auth }: HttpContext) {

    const { discussion_id, text } = request.body();
    const user = await auth.authenticate();

    const discussion = await Discussion.find(discussion_id);
    if (!discussion) return "Discussion Not Found";
    if (discussion.deleted == user.id) return 'Discussion Deleted'
    if (discussion.creator_id !== user.id && discussion.receiver_id !== user.id) return "Permission Denied";

    const message_id = v4();
    const files = await createFiles({
      request,
      column_name: 'files',
      table_id: message_id,
      table_name: 'messages',
    });
    const message = await Message.create({
      id: message_id,
      text,
      table_id: discussion_id,
      table_name: Discussion.table,
      files: JSON.stringify(files),
      user_id: user.id,
      // form_id
      // rating_id
      // survey_id
    });
    return { ...message.$attributes, id: message_id, files };
  }

  public async get_messages({ request, auth }: HttpContext) {
    let { discussion_id, limit, page } = paginate(request.qs() as any);
    const user = await auth.authenticate();
    const discussion = await Discussion.find(discussion_id);
    
    if (!discussion) return 'Discussion Not Found';

    if (discussion.deleted == user.id) return 'Discussion Deleted'
    if (discussion.creator_id !== user.id && discussion.receiver_id !== user.id) return "Permission Denied";

    const me = discussion.creator_id == user.id ? 'creator' as const :'receiver' as const;
    discussion[`${me}_opened_at`] = DateTime.now();
    await discussion.save();

    const query = db.query().from(Message.table)
      .where("table_id", discussion_id);
    const p = await limitation(query, page, limit, 'created_at_asc')

    return {
      ...p.paging,
      list: await p.query
    };
  }

  public async delete_message({ request, auth }: HttpContext) {
    let message_id = request.param('id');
    const user = await auth.authenticate();

    const message = await Message.find(message_id);
    if (!message) return 'Message Not Found';
    if (message.user_id != user.id) return 'Permission Missing';

    await message?.delete();

    return {
      success: true,
    }
  }

  public async edit_message({ request, auth }: HttpContext) {
    let { message_id, text } = request.body();
    const user = await auth.authenticate();

    const message = await Message.find(message_id);
    if (!message) return 'Message Not Found';
    if (message.user_id != user.id) return 'Permission Missing';

    if (text) {
      message.text = text;
      await message.save();
    } else {
      return 'Text Required'
    }

    return message.$attributes
  }

  public async delete_discussion({ request, auth }: HttpContext) {

    const discussion_id = request.param('id')
    const user = await auth.authenticate();

    const discussion = await Discussion.find(discussion_id);
    if (!discussion) return "ERROR discussion not found"

    if (discussion.deleted && discussion.deleted != user.id) {
      const messages = await Message.query().where("table_id", discussion_id)
      messages.forEach(m => {
        deleteFiles(m.id);
        m.delete();
      });
      await discussion.delete();
    } else if (!discussion.deleted) {
      discussion.deleted = user.id;
    }

    if (!discussion.$isDeleted) {
      await discussion.save();
    }

    return {
      deleted: true,
    }
  }
  public async block_discussion({ request, auth }: HttpContext) {

    const discussion_id = request.param('id')
    const user = await auth.authenticate();

    const discussion = await Discussion.find(discussion_id);
    if (!discussion) return "ERROR discussion not found"

    if (!discussion.blocked?.includes(user.id)) {
      discussion.blocked = (discussion.blocked || '') + user.id;
      await discussion.save()
    }

    return discussion.$attributes
  }
  public async unblock_discussion({ request, auth }: HttpContext) {

    const discussion_id = request.param('id')
    const user = await auth.authenticate();

    const discussion = await Discussion.find(discussion_id);
    if (!discussion) return "ERROR discussion not found"

    if (discussion.blocked?.includes(user.id)) {
      discussion.blocked = discussion.blocked.replaceAll(user.id, '') || null;
      await discussion.save()
    }

    return discussion.$attributes
  }
}
