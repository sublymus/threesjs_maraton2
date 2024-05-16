import Discussion from '#models/discussion';
import type { HttpContext } from '@adonisjs/core/http'
import { v4 } from 'uuid';
import { createFiles } from './Tools/FileManager/CreateFiles.js';
import Message from '#models/message';
import transmit from '@adonisjs/transmit/services/main';
import { limitation, paginate } from './Tools/Utils.js';
import { DateTime } from 'luxon';
import db from '@adonisjs/lucid/services/db';
import User from '#models/user';
import { deleteFiles } from './Tools/FileManager/DeleteFiles.js';

type ContextName = 'discussions'|'groups'|'sessions';
type ContextType = {
    id:string,
    deleted?:string,
    creator_id:string,
    receiver_id?:string
}&Record<string,any>
export default class MessagesController {


  public async send_message({ request, auth }: HttpContext) {

    const { context_id, context_name, text } = request.body();
    const user = await auth.authenticate();

    const discussion = (await db.query().from(context_name).where('id',context_id))[0] as ContextType;
    if (!discussion) throw new Error( context_name+" Not Found");
    console.log(discussion);
    
    if (discussion.deleted == user.id) throw new Error('Discussion Deleted');
    
    if (discussion.creator_id !== user.id && discussion.receiver_id !== user.id) return "Permission Denied";

    const message_id = v4();
    const files = await createFiles({
      request,
      column_name: 'files',
      table_id: message_id,
      table_name: 'messages',
      options:{
        throwError:true
      }
    });
    const message = await Message.create({
      id: message_id,
      text: text || '',
      table_id: context_id,
      table_name: context_name,
      files: JSON.stringify(files),
      user_id: user.id,
      // form_id
      // rating_id
      // survey_id
    });

    transmit.broadcast(message.table_id,{reloadMessage:true})
    return { ...message.$attributes, id: message_id, files };
  }

  public async get_messages({ request, auth }: HttpContext) {
    let { context_id, limit, page } = paginate(request.qs() as any);
    const user = await auth.authenticate();
    const discussion = await Discussion.find(context_id);
    console.log({context_id, user:user.email});
    
    if (!discussion) throw new Error('Discussion Not Found');

    if (discussion.deleted == user.id) throw new Error('Discussion Deleted');
    
    if (discussion.creator_id !== user.id && discussion.receiver_id !== user.id) throw new Error("Permission Denied");
    ;

    const me = discussion.creator_id == user.id ? 'creator' as const : 'receiver' as const;
    // const other_att = discussion.creator_id == user.id ? 'receiver' as const : 'creator' as const;

    discussion[`${me}_opened_at`] = DateTime.now();
    await discussion.save();
    const query = db.query().from(Message.table)
      .where("table_id", context_id);
    const p = await limitation(query, page, limit, 'created_at_desc');

    const other = await User.find(discussion[`${me}_id`]);
    if(!other) throw new Error("Receiver Not fount");
    

    transmit.broadcast(context_id,{context_id:context_id})
    
    return {
      ...p.paging,
      list: (await p.query).map(m => Message.parseMessage(m)).reverse()
    };
  }

  public async delete_message({ request, auth }: HttpContext) {
    let message_id = request.param('id');
    const user = await auth.authenticate();

    const message = await Message.find(message_id);
    if (!message) throw new Error('Message Not Found');
    
    if (message.user_id != user.id) throw new Error('Permission Missing');
    
    await message?.delete();
    transmit.broadcast(message.table_id,{reloadMessage:true})

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
    
    transmit.broadcast(message.table_id,{reloadMessage:true})
    
    return message.$attributes
  }

}