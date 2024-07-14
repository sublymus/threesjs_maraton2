import User from '#models/user';
import UserNotifContext from '#models/user_notif_context';
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db';

export default class UserNotifContextsController {
    async add_notif_context({ request, auth }: HttpContext) {
        const { context_name, context_id } = request.body();
        const user = await auth.authenticate();
        return await this._add_notif_context({
            context_id,context_name,user
        });
    }
    async _add_notif_context({context_id,context_name,user}:{context_name:string, context_id:string ,user:User}) {
        let user_context = (await UserNotifContext.query().where('user_id', user.id).where('context_name', context_name).where('context_id', context_id).limit(1))[0];
        console.log({context_id, context_name});
        
        if (!user_context) {
            user_context = await UserNotifContext.create({
                context_id,
                context_name,
                user_id: user.id,
            })
        }
        return user_context
    }
    async get_notif_contexts({ request, auth }: HttpContext) {
        const { context_id, context_name } = request.qs()
        const user = await auth.authenticate();
        const a =await this._get_notif_contexts({
            context_id,
            context_name,
            user_id:user.id
        })
        return a.map(c=> c.$attributes)
    }
    async _get_notif_contexts({context_id,context_name,user_id}:{context_id?:string, context_name?:string,user_id?:string}) {
        let query = UserNotifContext.query();
        if (user_id) query = query.andWhere('user_id', user_id)
        if (context_name) query = query.andWhere('context_name', context_name)
        if (context_id) query = query.andWhere('context_id', context_id)

        return  await query;
    }

    async remove_notif_context({ request, auth }: HttpContext) {
        const context_id = request.param('id');
        const user = await auth.authenticate();
        return await this._remove_notif_context({context_id, user_id:user.id})
    }
    async _remove_notif_context({context_id, user_id}:{context_id:string, user_id:string}) {
      const c =  (await this._get_notif_contexts({context_id,user_id}))[0]
        if(!c) throw new Error("UserNotifContext Not Found");
        await c.delete();
        return {
            deleted: false
        }
    }
}