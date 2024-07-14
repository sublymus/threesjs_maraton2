import User from '#models/user';
import UserNotifContext from '#models/user_notif_context';
import type { HttpContext } from '@adonisjs/core/http'

export default class UserNotifContextsController {
    async add_notif_context({ request, auth }: HttpContext) {
        const { context_name, context_id } = request.body();
        const user = await auth.authenticate();
        return await this._add_notif_context(context_id,context_name,user);
    }
    async _add_notif_context(context_name:string, context_id:string ,user:User) {
        let user_context = (await UserNotifContext.query().where('user_id', user.id).where('context_name', context_name).where('context_id', context_id).limit(1))[0];
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
        return await this._get_notif_contexts(context_id,context_name,user)
    }
    async _get_notif_contexts(context_id:string, context_name:string,user:User) {
        let query = UserNotifContext.query().where('user_id', user.id);
        if (context_name) query = query.where('context_name', context_name)
        if (context_id) query = query.where('context_id', context_id)
        return await query
    }

    async romove_notif_context({ request, auth }: HttpContext) {
        const context_id = request.param('id');
        const user = await auth.authenticate();
        return await this._romove_notif_context(context_id, user)
    }
    async _romove_notif_context(context_id:string, user:User) {
        let user_context = (await UserNotifContext.query().where('user_id', user.id).where('context_id', context_id).limit(1))[0];
        if (!user_context) throw new Error("user_context not  found");
        await user_context.delete()
        return {
            deleted: user_context.$isDeleted
        }
    }
}