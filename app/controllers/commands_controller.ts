import Command from '#models/command';
import Product from '#models/product';
import type { HttpContext } from '@adonisjs/core/http'
import { v4 } from 'uuid';
import { limitation, paginate } from './Tools/Utils.js';
import db from '@adonisjs/lucid/services/db';
import UserStore from '#models/user_store';

export default class CommandsController {
    async create_command({ request, auth }: HttpContext) {
        const { product_id, collected_features, quantity } = request.body();
        const product = await Product.find(product_id);
        if (!product) throw new Error("Product Note Found");
        const user = await auth.authenticate();
        const id = v4();
        const command = await Command.create({
            id,
            product_id,
            price: 10000,
            status: Command.CommandEnum.CART,
            quantity,
            store_id: product.store_id,
            user_id: user.id,
            collected_features
        });
        // cree les collected featuure product, feature, component
        return {
            ...command.$attributes,
            id
        }
    }

    async client_confirm_command({ auth }: HttpContext) {
        const user = await auth.authenticate();
        const commands_ids = await db.from(Command.table).select('id').andWhere('user_id', user.id).andWhere('status', Command.CommandEnum.CART);
        const commands = (await Command.findMany(commands_ids.map(c => c.id)));
        for (const c of commands) {
            c.status = Command.CommandEnum.IN_DELIVERY;
            await c.save()
        }
        return {
            success: true,
        }
    }
    async update_command({ request, auth }: HttpContext) {
        const { command_id, quantity, status } = request.body();
        const user = await auth.authenticate()

        const command = await Command.find(command_id);
        if (!command) throw new Error("Command Not Found");
        if (command.status == Command.CommandEnum.CART && user.id == command.user_id && quantity) {
            command.quantity = quantity;
            // command.price = 10000;
            await command.save();
        }
        if (await UserStore.isStoreManagerOrMore(user.id, command.store_id)) {
            if (Object.keys(Command.CommandEnum).includes(status)) {
                command.status = status;
                await command.save();
            }
        }
        const product = await Product.find(command.product_id);
        let p: any = {}
        if (product) p = Product.clientProduct(product);
        return {
            ...command.$attributes,
            images: p.images,
            title: p.title,
            stock: p.stock
        }
    }

    async get_commands({ request, auth }: HttpContext) {
        const { limit, page, status, no_status, user_id, store_id, product_id } = await paginate(request.qs() as any);

        const user = await auth.authenticate();
        let query = db.from(Command.table)
            .where('commands.store_id', store_id)
            .leftJoin('products', 'products.id', 'commands.product_id')
            .select('commands.id')
            .select('commands.status')
            .select('commands.collected_features')
            .select('commands.created_at')
            .select('commands.updated_at')
            .select('commands.quantity')
            .select('commands.price')
            .select('commands.payment_id')
            .select('commands.user_id')
            .select('products.images')
            .select('products.title')
            .select('products.description')
            .select('products.stock')
            .select('product_id')
        if (user_id && (await UserStore.isStoreManagerOrMore(user.id, store_id))) {
            query = query.andWhere('user_id', user_id);
        } else {
            query = query.andWhere('user_id', user.id);
        }
        if (status) {
            query = query.andWhere('commands.status', status);
        } else if (no_status) {
            query = query.andWhere('commands.status', '!=', no_status);
        }

        if (product_id) {
            query = query.andWhere('products.id', product_id);
        }

        const l = await limitation(query, page, limit, 'commands.created_at_desc');

        return {
            ...l.paging,
            list: (await l.query).map(m => {
                const b = Product.clientProduct(m);
                let c;
                try {
                    c = JSON.parse(m.collected_features || '{}')
                } catch (error) { }
                return {
                    ...b,
                    collected_features: c
                }
            })

        }
    }
    async delete_command({ request, auth }: HttpContext) {
        const { id: command_id } = request.params();

        const user = await auth.authenticate();

        const command = await Command.find(command_id);
        if (!command) throw new Error("Command Not Found");

        if (user.id != command.user_id) throw new Error("Permision Required");
        if (command.status != Command.CommandEnum.CART) throw new Error("Permision Require");

        await command.delete();

        return { deleted: true }
    }
}