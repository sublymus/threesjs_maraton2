import type { HttpContext } from '@adonisjs/core/http'

import Role, { type TypeJsonRole, JsonRole } from "../models/role.js";
import { v4 } from 'uuid';
import db from '@adonisjs/lucid/services/db';
import UserStore from '#models/user_store';
import { limitation, paginate } from './Tools/Utils.js';
import { USER_TYPE } from '#models/user';
export default class RolesController {

    async get_roles_json({ request }: HttpContext) {
        return JsonRole
    }
    async get_store_roles({ request, auth }: HttpContext) {
        let { page, limit, name, order_by, context_id, context_table } = paginate(request.qs() as { page: number | undefined, limit: number | undefined } & { [k: string]: any });
        const user = await auth.authenticate();
        const user_store = (await db.query().from(UserStore.table).select('*').where('user_id', user.id).andWhere('store_id', context_id))[0] as UserStore;
        if (!user_store) return;
        if (user_store.type == USER_TYPE.CLIENT) return;
        let query = db.query()
            .from(Role.table)
            .select('*')

        if (context_table) {
            query = query.andWhereLike('context_table', `%${context_table.split('').join('%')}%`);
        }
        if (context_table && context_id) {
            query = query.andWhereLike('context_table', context_table).andWhere('context_id',context_id);
        }

        if (name) {
            query = query.andWhereLike('name', `%${name.split('').join('%')}%`);
        }

        const roles = await limitation(query, page, limit, order_by)

        return {
            ...roles.paging,
            list: await roles.query
        }
    }
    async create_collaborator_role({ request, auth }: HttpContext) {
        const body = request.body();
        const user = await auth.authenticate();
        const user_store = (await db.query().from(UserStore.table).select('*').where('user_id', user.id).andWhere('store_id', body.store_id).whereNot((p)=>p.where('type','CLIENT')))[0] as UserStore;
        if (!user_store) return;
        const a: any = {};
        Object.keys(JsonRole).forEach((k) => body[k] ? a[k] = true : 0)
        const id = v4();
        const role = await Role.create({
            id,
            name: body.name,
            context_table: 'store',
            context_id: body.store_id,
            ...a
        });

        return {
            ...role.$attributes,
            id
        }
    }
    async create_moderator_role({  }: HttpContext) {
        // const user = auth.authenticate();
        // const body = request.body();
        // console.log(body);

        // const store = db.query().from(UserStore.table).where('store_id',body.store_id)

        // const a : any = {};
        // Object.keys(a).forEach((k)=>body[k]?a[k]=true:0)
        // const id  = v4();
        // const role = Role.create({
        //     id,
        //     name:body.name,
        //     context_table:'store',
        //     context_id:body.store_id,
        //     ...a
        // });

        // return {
        //     ...role,
        //     id
        // }
    }
    async update_role({ }: HttpContext) {

    }
    async get_role({ }: HttpContext) {

    }
    async get_roles({ }: HttpContext) {

    }
    async delete_role({ }: HttpContext) {

    }
}