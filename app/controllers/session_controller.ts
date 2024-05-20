import Session from '#models/session';
import User from '#models/user';
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon';
import { v4 } from 'uuid';
import Message from '#models/message';
import db from '@adonisjs/lucid/services/db';
import Store from '#models/store';
import { deleteFiles } from './Tools/FileManager/DeleteFiles.js';
import transmit from '@adonisjs/transmit/services/main';

export default class SessionController {

  public async get_sessions({ request, auth }: HttpContext) {
    // on recus tout les messages
    const { closed, store_id, session_id , collaborator_id } = request.qs();

    const user = await auth.authenticate();

    let query = db.from(Session.table)
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
      
    if (session_id) query = query.andWhere('id', session_id).limit(1)
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
 
    const sessions = (await Promise.allSettled(promises)).filter(f => f.status == 'fulfilled').map(m => (m as any).value)
    
    if (closed == 'no') {
      return sessions.filter(f => !f.closed?.includes(user.id));
    } if (closed == 'only') {
      return sessions.filter(f => !!(f.closed && f.closed.includes(user.id)));
    }
    return sessions;
  }

  public async create_session({ auth, request }: HttpContext) {
    const { receiver_id, store_id , title} = request.body();
    console.log({ receiver_id, store_id , title});
    
    if(!title) throw new Error("title is required");
    
    const store = await Store.find(store_id || '');
    if (!store) throw new Error("Store Not Found");

    const receiver = await User.find(receiver_id);
    if (!receiver) throw new Error('Receiver Not Found');

    const user = await auth.authenticate();
    if (receiver_id == user.id) throw new Error("You Can't chat with you self");

    const id = v4();

    const existingSession = (await Session.query()
      .select("*").where((p) => {
        p.where("creator_id", user.id)
          .andWhere("receiver_id", receiver_id)
      }).orWhere((p) => {
        p.where("creator_id", receiver_id)
          .andWhere("receiver_id", user.id)
      }).andWhere('table_id', store_id).limit(1))[0];
    if (existingSession) {
      if (existingSession.deleted == user.id) {
        existingSession.deleted = null;
        await existingSession.save();
      }
      const other_att = existingSession.receiver_id == user.id ? 'creator' as const : 'receiver' as const;
      const me = existingSession.receiver_id == user.id ? 'receiver' as const : 'creator' as const;
      transmit.broadcast(user.id,{new_session:{
        ...existingSession.$attributes,
        receiver: User.ParseUser(receiver),
        creator: User.ParseUser(user),
        unchecked_count: 0,
        id,
      }})
      return {
        ...existingSession.$attributes,
        other: User.ParseUser(receiver),
        other_att,
        last_message: (await db.query().from(Message.table).select('*').where('table_id', existingSession.id).orderBy('created_at', 'desc').limit(1))[0],
        unchecked_count: (await db.query().from(Message.table).select('id').where('table_id', existingSession.id).andWhere('user_id', receiver.id).andWhere('created_at', '>', (existingSession[`${me}_opened_at`].toString() || 0))).length,
      }
    }

    const session = await Session.create({
      id,
      creator_id: user.id,
      receiver_id,
      title,
      creator_opened_at: DateTime.now(),
      table_id: store_id,
      table_name: Store.table,
    })
    const newSession= {
      ...session.$attributes,
      receiver: User.ParseUser(receiver),
      creator: User.ParseUser(user),
      unchecked_count: 0,
      id,
    }
    transmit.broadcast(user.id,{new_session:newSession})
    transmit.broadcast(receiver_id,{new_session:newSession})
    return {
      ...session.$attributes,
      other: User.ParseUser(receiver),
      other_att: 'receiver',
      unchecked_count: 0,
      id,
    }
  }

  public async close_session({ request, auth }: HttpContext) {
    const session_id = request.param('id')
    const user = await auth.authenticate();

    const session = await Session.find(session_id);
    if (!session) throw new Error("ERROR session not found");

    if (session.creator_id !== user.id && session.receiver_id !== user.id) throw new Error("Permission Denied");
    
    if (!session.closed?.includes(user.id)) {
      session.closed = (session.closed || '') + user.id;
      await session.save()
    }
    transmit.broadcast(session.id,{reload:true})
    return session.$attributes
  }
  public async open_session({ request, auth }: HttpContext) {
    const session_id = request.param('id')
    const user = await auth.authenticate();

    const session = await Session.find(session_id);
    if (!session) throw new Error("ERROR session not found");

    if (session.creator_id !== user.id && session.receiver_id !== user.id) throw new Error("Permission Denied");

    if (session.closed?.includes(user.id)) {
      session.closed = session.closed.replaceAll(user.id, '');
      await session.save()
    }
    transmit.broadcast(session.id,{reload:true})
    return session.$attributes
  }

  public async delete_session({ request, auth }: HttpContext) {

    const session_id = request.param('id')
    const user = await auth.authenticate();

    const session = await Session.find(session_id);
    if (!session) throw new Error("ERROR session not found");

    if (session.creator_id !== user.id && session.receiver_id !== user.id) throw new Error("Permission Denied");

    if (session.deleted && session.deleted != user.id) {
      const messages = await Message.query().where("table_id", session_id)
      messages.forEach(m => {
        deleteFiles(m.id);
        m.delete();
      });
      await session.delete();
    } else if (!session.deleted) {
      session.deleted = user.id;
    }

    if (!session.$isDeleted) {
      await session.save();
    }

    return {
      deleted: true,
    }
  }
}
