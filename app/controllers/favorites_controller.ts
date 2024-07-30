import Favorite from '#models/favorite';
import UserStore from '#models/user_store';
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db';
import { limitation } from './Tools/Utils.js';
import User from '#models/user';
import Product from '#models/product';
import { v4 } from 'uuid';
import ProductsController from './products_controller.js';

export default class FavoritesController {
    async add_favorite({ request, auth }: HttpContext) {
        let { label, product_id } = request.body();
        
        label = label.trim().toLowerCase()
        if (!label) throw new Error("Label Required");

        const user = await auth.authenticate();

        
        const product = await Product.find(product_id)

        if (!product) throw new Error("Product Not Found");

        let favorite = (await Favorite.query()
            .where('label', label)
            .andWhere('store_id', product.store_id)
            .andWhere('user_id', user.id)
            .andWhere('product_id', product_id).limit(1))[0];

        if (favorite) {
            return {
                ...(favorite.$attributes),
                product: Product.clientProduct(product)
            }
        } else {
            const id = v4();
            favorite = await Favorite.create({
                id,
                label,
                product_id,
                store_id: product.store_id,
                user_id: user.id,
            })

            return {
                id,
                ...favorite.$attributes,
                product: Product.clientProduct(product)
            }
        }
    }
    async get_favorites({ request, auth }: HttpContext) {
        const { page,
            limit,
            order_by,
            favorite_id,
            label,
            store_id,
            user_id,
            product_id,
            add_product,
            add_user,
            add_labels
        } = request.qs();
        const user = await auth.authenticate();
        let query = db.from(Favorite.table).select('*');

        if (label) {
            query = query.where('label', label);
        }
        if (favorite_id) {
            query = query.where('id', favorite_id);
        }
        if (store_id) {
            query = query.where('store_id', store_id);
        }
        let isManager = false;
        if (user_id || product_id) {
            isManager = true;
            if (!await UserStore.isStoreManagerOrMore(user.id)) throw new Error("Permission Required");

            if (user_id) {
                query = query.where('user_id', user_id);
            }
            if (product_id) {
                query = query.where('product_id', product_id);
            }
        } else {
            query = query.where('user_id', user.id);
        }

        const l = await limitation(query, page, limit, order_by);

        const p = (await l.query).map(f => new Promise(async (rev) => {
            let user: User | null = null;
            if (isManager && add_user) {
                user = await User.find(f.user_id);
            }
            let product:any;
            if(add_product ){
                const p = await ProductsController._get_products({product_id:f.product_id, add_cart:true, store_id:f.store_id},auth);
                if(p?.list[0]){
                    product = p.list[0]; 
                }
            }
            rev({
                ...f,
                user: user && User.ParseUser(user),
                product: product && Product.clientProduct(product)
            })
        }));
        const list = (await Promise.allSettled(p)).map(f => (f as any).value)
        let labels : string[]|undefined;
        if(add_labels && store_id){
            const a = (await db.query().from(Favorite.table).select('label').where('user_id', user.id).where('store_id', store_id).groupBy('label'));
            labels = a.map(e=>e.label)   
        }
        
         return {
            ...l.paging,
            list,
            labels
        }

    }
    async delete_favorite({ request, auth }: HttpContext) {
        const favorite_id = request.param('id');
        const user = await auth.authenticate();

        const favorite = await Favorite.find(favorite_id);

        if (!favorite) throw new Error("Favorite Not Found");
        if (user.id != favorite.user_id) throw new Error("Permission Required");

        await favorite.delete();
        return {
            deleted: favorite.$isDeleted
        }
    }

}