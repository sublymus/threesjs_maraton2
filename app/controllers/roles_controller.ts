import type { HttpContext } from '@adonisjs/core/http'

import  Role, {type TypeJsonRole, JsonRole } from "../models/role.js";
import { v4 } from 'uuid';
export default class RolesController {
    
    async get_roles_json ({request}:HttpContext){
        return JsonRole
    }
    async create_role ({request}:HttpContext){
        const {} = request.body() as TypeJsonRole;

        const id  = v4();
        const role = Role.create({
            id,
            name:'',
            store_id:'',
            ban_client:true,
            ban_collaborator:true,
            chat_client:true,
            create_delete_collaborator:true,
            create_delete_product:true,
            edit_product:true,
            filter_client:true,
            filter_collaborator:true,
            filter_command:true,
            filter_product:true,
            manage_command:true,
            manage_interface:true,
            manage_scene_product:true,
        })
    }
    async update_role ({}:HttpContext){
        
    }
    async get_role ({}:HttpContext){
        
    }
    async get_roles ({}:HttpContext){
        
    }
    async delete_role ({}:HttpContext){
        
    }
}