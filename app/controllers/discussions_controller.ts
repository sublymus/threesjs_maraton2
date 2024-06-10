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
import UserStore from '#models/user_store';
import { limitation } from './Tools/Utils.js';

export default class DiscussionController {

  public async get_discussions({ request, auth }: HttpContext) {
    const { /*blocked,*/ discussion_id, other_id, from_id, to_id, page, limit, add_store } = request.qs() as Record<string, any> & { context: string[] };
    const user = await auth.authenticate()
    const isAdmin = await UserStore.isSublymusManager(user.id)
    if (!from_id && !isAdmin) throw new Error('Permison Required');
    // if (other_id && !to_id && !await UserStore.isSublymusManager(other_id)) throw new Error('Permison Required')

    let query = db.from(Discussion.table).select("*")
    if (other_id) {
      query = query.where((q) => {
        q.where((p) => {
          p.where("creator_id", user.id)
            .andWhere("receiver_id", other_id)
        })
          .orWhere((p) => {
            p.where("creator_id", other_id)
              .andWhere("receiver_id", user.id)
          })
      })
        .andWhere(q => {
          q.where(p => {
            p.where('from_id', from_id || null)
              .andWhere('to_id', to_id || null)
          }).orWhere(p => {
            p.where('from_id', to_id || null)
              .andWhere('to_id', from_id || null)
          })
        })
    } else {
      query = query.where((q) => {
        q.where(p => {
          p.where("creator_id", user.id)
            .andWhere('from_id', from_id || null)
          if (to_id) p.andWhere('to_id', to_id)
          // else if (isAdmin) p.andWhereNull('to_id')
        })
          .orWhere(p => {
            p.where("receiver_id", user.id)
              .andWhere('to_id', from_id || null)
            if (to_id) p.andWhere('from_id', to_id)
            // else if ( isAdmin) p.andWhereNull('from_id')
          })
      })
    }

    const l = await limitation(query, page, limit);
    if (discussion_id) query = l.query.andWhere('id', discussion_id).limit(1)
    ///where ('delete','!=',user.id)
    const not_deleted_discussions = (await query).filter(f => f.deleted != user.id);

    const promises = not_deleted_discussions.map((d) => new Promise(async (rev) => {
      const creator = (await db.from(User.table).where('id', d.creator_id).limit(1))[0];
      const receiver = (await db.from(User.table).where('id', d.receiver_id).limit(1))[0];
      const other = user.id == receiver.id ? User.ParseUser(creator as any) : User.ParseUser(receiver as any);

      const me = user.id == receiver.id ? 'receiver' : 'creator';
      const other_att = user.id == receiver.id ? 'creator' : 'receiver';
      const store_id = (d.from_id||null)===(from_id||null)?d.to_id:d.from_id;
      const store = (add_store && store_id) && await Store.find(store_id)
      rev({
        ...d,
        other,
        other_att,
        store,
        last_message: (await db.query().from(Message.table).select('*').where('table_id', d.id).orderBy('created_at', 'desc').limit(1))[0],
        unchecked_count: (await db.query().from(Message.table).select('id').where('table_id', d.id).andWhere('user_id', other.id).andWhere('created_at', '>', (d[me + '_opened_at'] || 0))).length,
      })
    }));

    const discussions = (await Promise.allSettled(promises))
      .filter(f => f.status == 'fulfilled')
      .map(m => (m as any).value as Discussion)
      .sort((a, b) => ((a as any).last_message?.created_at) > ((b as any).last_message?.created_at) ? -1 : 1
      )

    // if (blocked == 'no') {
    //   return discussions.filter(f => !f.blocked?.includes(user.id));
    // } if (blocked == 'only') {
    //   return discussions.filter(f => !!(f.blocked && f.blocked.includes(user.id)));
    // }
    return {
      ...l.paging,
      list: discussions
    };
  }

  public async create_discussion({ auth, request }: HttpContext) {
    let { receiver_id, from_id, to_id } = request.body();
    const user = await auth.authenticate();

    if (!from_id) {
      if (!UserStore.isSublymusManager(user.id)) throw new Error("Premission Required");
    } else {
      const storeFrom = await Store.find(from_id);
      if (!storeFrom) throw new Error('origin store not found');
    }
    if (!to_id) {
      if (!UserStore.isSublymusManager(receiver_id)) throw new Error("Premission Required");
    }
    else {
      const storeTo = await Store.find(to_id);
      if (!storeTo) throw new Error('destination store not found');
    }

    const receiver = await User.find(receiver_id);
    if (!receiver) throw new Error('Receiver Not Found');

    if (receiver_id == user.id) throw new Error("You Can't chat with you self");

    const id = v4();

    const existingDiscussion = (await Discussion.query()
      .select("*")
      .where((q) => {
        q.where((p) => {
          p.where("creator_id", user.id)
            .andWhere("receiver_id", receiver_id)
        })
          .orWhere((p) => {
            p.where("creator_id", receiver_id)
              .andWhere("receiver_id", user.id)
          })
      })
      .andWhere(q => {
        q.where(p => {
          p.where('from_id', from_id || null)
            .andWhere('to_id', to_id || null)
        }).orWhere(p => {
          p.where('from_id', to_id || null)
            .andWhere('to_id', from_id || null)
        })
      })
      .limit(1))[0];
    if (existingDiscussion) {
      if (existingDiscussion.deleted == user.id) {
        existingDiscussion.deleted = null;
        await existingDiscussion.save();
      }
      const me = existingDiscussion.receiver_id == user.id ? 'receiver' as const : 'creator' as const;
      const other_att = existingDiscussion.receiver_id == user.id ? 'creator' as const : 'receiver' as const;

      transmit.broadcast(user.id, {
        new_discussion: {
          ...existingDiscussion.$attributes,
          receiver: User.ParseUser(receiver),
          creator: User.ParseUser(user),
          unchecked_count: 0,
          id,
        }
      })
      return {
        ...existingDiscussion.$attributes,
        other: User.ParseUser(receiver),
        other_att,
        last_message: (await db.query().from(Message.table).select('*').where('table_id', existingDiscussion.id).orderBy('created_at', 'desc').limit(1))[0],
        unchecked_count: (await db.query().from(Message.table).select('id').where('table_id', existingDiscussion.id).andWhere('user_id', receiver.id).andWhere('created_at', '>', (existingDiscussion[`${me}_opened_at`]?.toString() || 0))).length,
      }
    }

    const discussion = await Discussion.create({
      id,
      creator_id: user.id,
      receiver_id,
      creator_opened_at: DateTime.now(),
      from_id,
      to_id,
    })
    const disco = {
      ...discussion.$attributes,
      receiver: User.ParseUser(receiver),
      creator: User.ParseUser(user),
      unchecked_count: 0,
      id,
    }
    transmit.broadcast(`${user.id}/${from_id||''}`, { new_discussion: disco })
    transmit.broadcast(`${receiver_id}/${to_id||''}`, { new_discussion: disco })
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
