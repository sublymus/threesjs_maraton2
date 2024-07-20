import type { HttpContext } from '@adonisjs/core/http'

import Role, { JsonRole, JsonRoleAdmin } from "../models/role.js";
import { v4 } from 'uuid';
import db from '@adonisjs/lucid/services/db';
import UserStore from '#models/user_store';
import { limitation, paginate } from './Tools/Utils.js';
import { USER_TYPE } from '#models/user';
export default class RolesController {

    async get_roles_json({ request }: HttpContext) {
        const {type} = request.qs();
        if(type == 'moderator') return JsonRoleAdmin
        return JsonRole
    }

    async get_store_roles({ request, auth }: HttpContext) {
        let { page, limit, name, order_by, store_id, role_id } = paginate(request.qs() as { page: number | undefined, limit: number | undefined } & { [k: string]: any });

        const user = await auth.authenticate()
        if (!await UserStore.isStoreManagerOrMore(user.id, store_id)) throw new Error('Permison Required')

        let query = db.query()
            .from(Role.table)
            .select('*')
            
        if (store_id) {
            query = query.andWhere('store_id', store_id);
        }else{
            if(!await UserStore.isSublymusManager(user.id)) throw new Error('Permison Required')
            query = query.andWhereNull('store_id');
        }

        if(role_id){
            query = query.andWhereLike('id', role_id);
        }else if (name) {
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
            created_at: role.created_at,
            updated_at: role.updated_at,
            id
        }
    }
    async change_collaborator_role({ request, auth }: HttpContext) {
        const { store_id, new_role_id, collaborator_id } = request.body();
        
        const user = await auth.authenticate();
        const u = await UserStore.isStoreManagerOrMore(user.id, store_id);
        if (!u) throw new Error('Permison Required') // TODO ajouter throw error partout;

        const editor_role = u.roleId && await Role.find(u.roleId);
        
        if(editor_role && !editor_role.ban_collaborator)  throw new Error('Permison Required')
        if(user.id == collaborator_id)  throw new Error('Can not your self role')

        const c_store = (await db.from(UserStore.table).where('store_id', store_id).andWhere('user_id', collaborator_id).andWhere('type', USER_TYPE.COLLABORATOR).limit(1))[0] as UserStore | null
        if (!c_store) throw new Error('Collaborator not found in this store')

        const c = (await UserStore.find(c_store.id));
        if (!c) throw new Error('Collaborator not found in this store')
        if(c.type == USER_TYPE.OWNER) throw new Error('Can not owner role')
        
        c.roleId = new_role_id;
        await c.save();
        return c.$attributes

    }
    async create_moderator_role({ request, auth }: HttpContext) {
        const body = request.body();

        const user = await auth.authenticate()
        if (!await UserStore.isStoreManagerOrMore(user.id)) throw new Error('Permison Required')

        const _role = (await db.query().from(Role.table).whereNull('store_id').andWhere('name', body.name).limit(1))[0]
        if (_role) {
            return console.log('Role "' + _role.name + '" Exist');
        }

        const a: any = {};
        Object.keys(JsonRoleAdmin).forEach((k) => body[k] ? a[k] = true : 0)
        const id = v4();
        const role = await Role.create({
            id,
            name: body.name,
            ...a
        });

        return {
            ...role.$attributes,
            created_at: role.created_at,
            updated_at: role.updated_at,
            id
        }
    }
    async change_moderator_role({ request, auth }: HttpContext) {
        const { store_id, new_role_id, moderator_id } = request.body();
        
        const user = await auth.authenticate();
        const u = await UserStore.isStoreManagerOrMore(user.id, store_id);
        if (!u) throw new Error('Permison Required') // TODO ajouter throw error partout;

        const editor_role = u.roleId && await Role.find(u.roleId);
        
        if(editor_role && !editor_role.ban_collaborator)  throw new Error('Permison Required')
        if(user.id == moderator_id)  throw new Error('Can not your self role')

        const c_store = (await db.from(UserStore.table).where('store_id', store_id).andWhere('user_id', moderator_id).andWhere('type', USER_TYPE.COLLABORATOR).limit(1))[0] as UserStore | null
        if (!c_store) throw new Error('Collaborator not found in this store')

        const c = (await UserStore.find(c_store.id));
        if (!c) throw new Error('Collaborator not found in this store')
        if(c.type == USER_TYPE.OWNER) throw new Error('Can not owner role')
        
        c.roleId = new_role_id;
        await c.save();
        return c.$attributes

    }
   
    async update_role({ request, auth }: HttpContext) {
        const body = request.body();

        const role = await Role.find(body.role_id);
        if (!role) return 'Role not found'

        const user = await auth.authenticate();
        if(role.store_id){
            if(!await UserStore.isStoreManagerOrMore(user.id, role.store_id)) throw new Error('Permison Required')
        }
        else if(!await UserStore.isSublymusManager(user.id))  throw new Error('Permison Required')
        
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