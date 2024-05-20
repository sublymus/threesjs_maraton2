import Command from '#models/command';
import Product from '#models/product';
import type { HttpContext } from '@adonisjs/core/http'
import { v4 } from 'uuid';
import { limitation, paginate } from './Tools/Utils.js';
import db from '@adonisjs/lucid/services/db';
import UserStore from '#models/user_store';

export default class CommandsController {
    async create_command ({request, auth}:HttpContext){
        const { product_id, collected_features, quantity } = request.body();
        const product = await Product.find(product_id);
        if(!product) throw new Error("Product Note Found");
        const user = await auth.authenticate();
        const id = v4();
        const command= await Command.create({
            id,
            product_id,
            price:Math.random()*100000,
            status:Command.CommandEnum.CART,
            quantity,
            store_id:product.store_id,
            user_id:user.id
        });
        // cree les collected featuure product, feature, component
        return {
            ...command.$attributes,
            id
        }
    }
    async update_command ({request, auth}:HttpContext){
        const {command_id, quantity, status} = request.body();
        const user = await auth.authenticate()

        const command = await Command.find(command_id);
        if(!command) throw new Error("Command Not Found");
        if(command.status == Command.CommandEnum.CART && user.id == command.user_id && quantity){
            command.quantity= quantity;
            command.price=Math.random()*100000;
            await command.save();
        }
        if(await UserStore.isStoreManagerOrMore(user.id, command.store_id)){
            if(Object.keys(Command.CommandEnum).includes(status) ){
                command.status = status;
                await command.save();  
            }
        }
        return command.$attributes;
    }

    async get_commands ({request, auth}:HttpContext){
        const {limit, page, status,no_status, user_id, store_id} =await paginate(request.qs() as any);
        let query = db.from(Command.table).where('store_id',store_id);
        if(user_id &&(await  UserStore.isStoreManagerOrMore(store_id))){
            query = query.andWhere('user_id', user_id);
            if(status){
                query = query.andWhere('status',status);
            }
        }
        if(status){
            query = query.andWhere('status',status);
        }else if(no_status){
            query = query.andWhere('status','!=',no_status);
        }
        
        const l = await limitation(query, page, limit);
        return {
            ...l.paging,
            list : await l.query
        }
    }
    async delete_command ({request}:HttpContext){

        // const {id:command_id} = request.params();
        // const command = await Command.find(command_id);
        // if(!command) throw new Error("Command Not Found");
        // await command.delete();
        // return {
        //     deleted:true
        // }
        
    }
}