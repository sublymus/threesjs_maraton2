import type { HttpContext } from '@adonisjs/core/http'

import Role, { type TypeJsonRole, JsonRole } from "../models/role.js";
import { v4 } from 'uuid';
import db from '@adonisjs/lucid/services/db';
import UserStore from '#models/user_store';
import { limitation, paginate } from './Tools/Utils.js';
import User, { USER_TYPE } from '#models/user';
export default class RolesController {

    async get_roles_json({ request }: HttpContext) {
        return JsonRole
    }
    async get_store_roles({ request, auth }: HttpContext) {
        let { page, limit, name, order_by, store_id } = paginate(request.qs() as { page: number | undefined, limit: number | undefined } & { [k: string]: any });

        const user = await auth.authenticate()
        if (!await UserStore.isStoreManagerOrMore(user.id, store_id)) throw new Error('Permison Required')

        let query = db.query()
            .from(Role.table)
            .select('*')
        if (store_id && store_id) {
            query = query.andWhereLike('store_id', store_id).andWhere('store_id', store_id);
        }

        if (name) {
            query = query.andWhereLike('name', `%${name.split('').join('%')}%`);
        }

        const roles = await limitation(query, page, limit, order_by)

        return {
            ...roles.paging,
            list: await roles.query,
        }
    }
    async create_collaborator_role({ request, auth }: HttpContext) {
        const body = request.body();

        const user = await auth.authenticate()
        if (!await UserStore.isStoreManagerOrMore(user.id, body.store_id)) throw new Error('Permison Required')

        const _role = (await db.query().from(Role.table).where('store_id', body.store_id).andWhere('name', body.name).limit(1))[0]
        if (_role) {
            return console.log('Role "' + _role.name + '" Exist');
        }

        const a: any = {};
        Object.keys(JsonRole).forEach((k) => body[k] ? a[k] = true : 0)
        const id = v4();
        const role = await Role.create({
            id,
            name: body.name,
            store_id: body.store_id,
            ...a
        });

        return {
            ...role.$attributes,
            created_at: role.createdAt,
            updated_at: role.updatedAt,
            id
        }
    }
    async change_collaborator_role({ request, auth }: HttpContext) {
        const { store_id, new_role_id, collaborator_id } = request.body();
        console.log(store_id, new_role_id, collaborator_id);

        const user = await auth.authenticate();
        if (!await UserStore.isStoreManagerOrMore(user.id, store_id)) throw new Error('Permison Required')

        const c_store = (await db.from(UserStore.table).where('store_id', store_id).andWhere('user_id', collaborator_id).andWhere('type', USER_TYPE.COLLABORATOR).limit(1))[0] as UserStore | null

        console.log('c_store', c_store);

        if (!c_store) return

        const c = (await UserStore.find(c_store.id));
        if (!c) return
        c.roleId = new_role_id;
        await c.save();
        return c.$attributes

    }
    async create_moderator_role({ }: HttpContext) {
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
        //     store_id:body.store_id,
        //     ...a
        // });

        // return {
        //     ...role,
        //     id
        // }
    }
    async update_role({ request, auth }: HttpContext) {
        const body = request.body();

        const role = await Role.find(body.role_id);
        if (!role) return 'Role not found'

        const user = await auth.authenticate();
        if (!await UserStore.isStoreManagerOrMore(user.id, role.store_id)) throw new Error('Permison Required')

        if (body.newOptions) {
            Object.keys(JsonRole).forEach(t => ((role as any)[t] = !!body[t]))
        }

        if (body.name) role.name = body.name

        await role.save();

        console.log(role.$attributes);

        return role.$attributes

    }
    async get_role({ }: HttpContext) {

    }
    async get_roles({ }: HttpContext) {

    }
    async delete_role({ request, auth }: HttpContext) {
        const { role_id, store_id } = request.body();
        
        if (!role_id || !store_id) return
        const role = await Role.find(role_id);
        if (!role) return 'role not Found'
        
        const user = await auth.authenticate();
        if (!await UserStore.isStoreManagerOrMore(user.id, role.store_id)) throw new Error('Permison Required')
        
        await role?.delete();
        return {
            deleted: true
        }
    }
}