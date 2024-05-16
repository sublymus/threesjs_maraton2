import Discussion from '#models/discussion';
import User from '#models/user';
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon';
import { v4 } from 'uuid';
import Message from '#models/message';
import db from '@adonisjs/lucid/services/db';
import Store from '#models/store';
import { deleteFiles } from './Tools/FileManager/DeleteFiles.js';
import transmit from '@adonisjs/transmit/services/main';

export default class DiscussionController {

  public async get_discussions({ request, auth }: HttpContext) {
    // on recus tout les messages
    const { blocked, store_id, discussion_id , collaborator_id } = request.qs();

    const user = await auth.authenticate();

    let query = db.from(Discussion.table)
      .select("*");
      if(collaborator_id){
        query.where((p) => {
          p.where("creator_id", user.id)
            .andWhere("receiver_id", collaborator_id)
        }).orWhere((p) => {
          p.where("creator_id", collaborator_id)
            .andWhere("receiver_id", user.id)
        })
      }else{
        query.where((q) => {
          q.where("creator_id", user.id)
            .orWhere("receiver_id", user.id)
        }).andWhere('table_id', store_id)
        .orderBy("updated_at", "desc");
      }
      
    if (discussion_id) query = query.andWhere('id', discussion_id).limit(1)
    const ds = await query;
    const ds2 = ds.filter(f => f.deleted != user.id);
    const promises = ds2.map((d) => new Promise(async (rev) => {
      const creator = (await db.from(User.table).where('id', d.creator_id).limit(1))[0];
      const receiver = (await db.from(User.table).where('id', d.receiver_id).limit(1))[0];
      const other = user.id == receiver.id ? User.ParseUser(creator as any) : User.ParseUser(receiver as any);

      const me = user.id == receiver.id ? 'receiver' : 'creator';
      const other_att = user.id == receiver.id ? 'creator' : 'receiver';
      rev({
        ...d,
        other,
        other_att,
        last_message: (await db.query().from(Message.table).select('*').where('table_id', d.id).orderBy('created_at', 'desc').limit(1))[0],
        unchecked_count: (await db.query().from(Message.table).select('id').where('table_id', d.id).andWhere('user_id', other.id).andWhere('created_at', '>', (d[me + '_opened_at'] || 0))).length,
      })
    }));

    const discussions = (await Promise.allSettled(promises)).filter(f => f.status == 'fulfilled').map(m => (m as any).value)
    console.log({discussions});
    
    if (blocked == 'no') {
      return discussions.filter(f => !f.blocked?.includes(user.id));
    } if (blocked == 'only') {
      return discussions.filter(f => !!(f.blocked && f.blocked.includes(user.id)));
    }
    return discussions;
  }

  public async create_discussion({ auth, request }: HttpContext) {
    const { receiver_id, store_id } = request.body();

    const store = await Store.find(store_id || '');
    if (!store) throw new Error("Store Not Found");

    const receiver = await User.find(receiver_id);
    if (!receiver) throw new Error('Receiver Not Found');

    const user = await auth.authenticate();
    if (receiver_id == user.id) throw new Error("You Can't chat with you self");

    const id = v4();

    const existingDiscussion = (await Discussion.query()
      .select("*").where((p) => {
        p.where("creator_id", user.id)
          .andWhere("receiver_id", receiver_id)
      }).orWhere((p) => {
        p.where("creator_id", receiver_id)
          .andWhere("receiver_id", user.id)
      }).andWhere('table_id', store_id).limit(1))[0];
    if (existingDiscussion) {
      if (existingDiscussion.deleted == user.id) {
        existingDiscussion.deleted = null;
        await existingDiscussion.save();
      }
      const other_att = existingDiscussion.receiver_id == user.id ? 'creator' as const : 'receiver' as const;
      const me = existingDiscussion.receiver_id == user.id ? 'receiver' as const : 'creator' as const;
      transmit.broadcast(user.id,{new_discussion:{
        ...existingDiscussion.$attributes,
        receiver: User.ParseUser(receiver),
        creator: User.ParseUser(user),
        unchecked_count: 0,
        id,
      }})
      return {
        ...existingDiscussion.$attributes,
        other: User.ParseUser(receiver),
        other_att,
        last_message: (await db.query().from(Message.table).select('*').where('table_id', existingDiscussion.id).orderBy('created_at', 'desc').limit(1))[0],
        unchecked_count: (await db.query().from(Message.table).select('id').where('table_id', existingDiscussion.id).andWhere('user_id', receiver.id).andWhere('created_at', '>', (existingDiscussion[`${me}_opened_at`].toString() || 0))).length,
      }
    }

    const discussion = await Discussion.create({
      id,
      creator_id: user.id,
      receiver_id,
      creator_opened_at: DateTime.now(),
      table_id: store_id,
      table_name: Store.table,
    })
    const disco= {
      ...discussion.$attributes,
      receiver: User.ParseUser(receiver),
      creator: User.ParseUser(user),
      unchecked_count: 0,
      id,
    }
    transmit.broadcast(user.id,{new_discussion:disco})
    transmit.broadcast(receiver_id,{new_discussion:disco})
    return {
      ...discussion.$attributes,
      other: User.ParseUser(receiver),
      other_att: 'receiver',
      unchecked_count: 0,
      id,
    }
  }
  public async block_discussion({ request, auth }: HttpContext) {

    const discussion_id = request.param('id')
    const user = await auth.authenticate();

    const discussion = await Discussion.find(discussion_id);
    if (!discussion) throw new Error("ERROR discussion not found");


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
    if (!discussion) throw new Error("ERROR discussion not found");


    if (discussion.blocked?.includes(user.id)) {
      discussion.blocked = discussion.blocked.replaceAll(user.id, '') || null;
      await discussion.save()
    }

    return discussion.$attributes
  }

  public async delete_discussion({ request, auth }: HttpContext) {

    const discussion_id = request.param('id')
    const user = await auth.authenticate();

    const discussion = await Discussion.find(discussion_id);
    if (!discussion) throw new Error("ERROR discussion not found");


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
}
