import Discussion from '#models/discussion';
import type { HttpContext } from '@adonisjs/core/http'
import { v4 } from 'uuid';
import { createFiles } from './Tools/FileManager/CreateFiles.js';
import Message from '#models/message';
import transmit from '@adonisjs/transmit/services/main';
import { limitation, paginate } from './Tools/Utils.js';
import { DateTime } from 'luxon';
import db from '@adonisjs/lucid/services/db';
import Session from '#models/session';
import Subject from '#models/subject';
import UserNotifContext from '#models/user_notif_context';
import UserBrowser from '#models/user_browser';
import webpush from "web-push";

type ContextName = 'discussions' | 'sessions';
type ContextType = {
  id: string,
  deleted?: string,
  creator_id: string,
  receiver_id?: string
} & Record<string, any>
const contextMap = {
  discussions: Discussion,
  sessions: Session,
  subjects: Subject
}
export default class MessagesController {

  publicContext = ['subjects']

  public async send_message({ request, auth }: HttpContext) {

    const { context_id, context_name, text, reply_id } = request.body();
    const user = await auth.authenticate();

    const context = (await db.query().from(context_name).where('id', context_id))[0] as ContextType;
    if (!context) throw new Error(context_name + " Not Found");

    if (context.deleted == user.id) throw new Error('Context Deleted');

    if (!this.publicContext.includes(context_name) && context.creator_id !== user.id && context.receiver_id !== user.id) return "Permission Denied";

    const message_id = v4();
    const files = await createFiles({
      request,
      column_name: 'files',
      table_id: message_id,
      table_name: 'messages',
      options: {
        throwError: true
      }
    });
    const message = await Message.create({
      id: message_id,
      text: text || '',
      table_id: context_id,
      table_name: context_name,
      files: JSON.stringify(files),
      user_id: user.id,
      reply_id,
      // form_id
      // rating_id
      // survey_id
    });
    // console.log(message.text);


    try {
      let user_contexts = await UserNotifContext.query().where('context_id', context_id)//.where('context_name', context_name);

      for (const c of user_contexts) {
        let browsers = await UserBrowser.query().where('user_id', c.user_id);
        //if (c.user_id != user.id) {
          for (const b of browsers) {
            console.log('==>', b.$attributes);

            const payload = JSON.stringify({ title: 'New Message', content: message.text.substring(0, 100) });
            try {
              if (b.notification_data) webpush.sendNotification(JSON.parse(b.notification_data) as any, payload).catch(err => console.error(err));
            } catch (error) { }
          }
       // }
      }

    } catch (error) { }

console.log(message.table_id, context_id);

    transmit.broadcast(context_id, { reloadMessage: true })
    return { ...message.$attributes, id: message_id, files };
  }
  public async get_messages({ request, auth }: HttpContext) {
    let { context_id, context_name, limit, page, order_by } = paginate(request.qs() as any);
    const n = context_name as ContextName;

    const query = db.query().from(Message.table)
      .where("table_id", context_id);
    const p = await limitation(query, page, limit, order_by||'created_at_desc');

    const context = await contextMap[n].find(context_id);
    // console.log({context_id, user:user.email});

    if (!context) throw new Error(n + ' Not Found');

    if (!this.publicContext.includes(context_name)) {
      const user = await auth.authenticate();

      if (context.deleted == user.id) throw new Error('Discussion Deleted');

      if (context.creator_id !== user.id && context.receiver_id !== user.id) throw new Error("Permission Denied");

      const me = context.creator_id == user.id ? 'creator' as const : 'receiver' as const;
      // const other_att = context.creator_id == user.id ? 'receiver' as const : 'creator' as const;

      context[`${me}_opened_at`] = DateTime.now();
      await context.save();

      // const other = await User.find(context[`${me}_id`]);
      // if (!other) throw new Error("Receiver Not fount");
      transmit.broadcast(context_id, { reload: true })
    }

    const list = (await p.query).map(m => Message.parseMessage(m))

    return {
      ...p.paging,
      list: (await Promise.allSettled(list)).map(f => (f as any).value)
    };
  }

  public async delete_message({ request, auth }: HttpContext) {
    let message_id = request.param('id');
    const user = await auth.authenticate();

    const message = await Message.find(message_id);
    if (!message) throw new Error('Message Not Found');

    if (message.user_id != user.id) throw new Error('Permission Missing');

    await message?.delete();
    transmit.broadcast(message.table_id, { reloadMessage: true })

    return {
      deleted: true,
    }
  }

  public async edit_message({ request, auth }: HttpContext) {
    let { message_id, text } = request.body();
    const user = await auth.authenticate();

    const message = await Message.find(message_id);
    if (!message) throw new Error('Message Not Found');
    ;
    if (message.user_id != user.id) throw new Error('Permission Missing');
    ;

    if (text) {
      message.text = text;
      await message.save();
    } else throw new Error("'Text Required'");

    transmit.broadcast(message.table_id, { reloadMessage: true })

    return message.$attributes
  }

}