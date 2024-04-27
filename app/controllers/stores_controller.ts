import Catalog from '#models/catalog';
import Category from '#models/category';
import Feature from '#models/feature';
import Product from '#models/product'
import Store from '#models/store';
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { v4 } from 'uuid';
import { limitation, paginate } from './Tools/Utils.js';
import { createFiles } from './Tools/FileManager/CreateFiles.js';
import { deleteFiles } from './Tools/FileManager/DeleteFiles.js';
import { updateFiles } from './Tools/FileManager/UpdateFiles.js';

export default class StoresController {
    async create_store({ request, auth }: HttpContext) {
        const { name, description, phone, website, store_email } = request.body();
        const existingStore = await Store.findBy('name', name);

        console.log( { name, description, phone, website, store_email } );
        
        if (existingStore) {
            return 'This Name is not Avalaible to use'
        }

        const id = v4()

        const user = await auth.authenticate();

        try {

            const imagesUrl = await createFiles({
                request,
                column_name: "banners",
                table_id: id,
                table_name: "stores",
                options: {
                    throwError: true,
                    compress: 'img',
                    min: 1,
                    max: 1,
                    extname: ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'avif', 'apng', 'gif', "jpg", "png", "jpeg", "webp"],
                    maxSize: 12 * 1024 * 1024,
                },
            });
            const store = await Store.create({
                description,
                id,
                name,
                owner_id: user.id,
                banners: JSON.stringify(imagesUrl),
                phone,
                website,
                store_email
                // address_id
                // interface_id
            })
            return {
                ...Store.ParseStore(store),
                id
            }
        } catch (error) {
            deleteFiles(id);
            console.log(error);
            
            return error.message
        }
    }
    async update_store({request, auth }: HttpContext) {
        const body = request.body();
        
        const user = await auth.authenticate();
        const store = await Store.find(body.store_id);
        
        if(store?.owner_id != user.id) return 'Permission deined';

        ['name','description','phone','website','store_email'].forEach((a => (store as any)[a]= body[a]));
        let urls:any = []
        for (const f of ['banners'] as const) {
            if (!body[f]) continue;

            console.log('$$$$$$$$$$',{
                table_id: store.id,
                column_name: f,
                lastUrls: store[f],
                newPseudoUrls: body[f],
            });
            
            urls = await updateFiles({
                request,
                table_name: "stores",
                table_id: store.id,
                column_name: f,
                lastUrls: store[f],
                newPseudoUrls: body[f],
                options: {
                    throwError: false,
                    min: 1,
                    max: 7,
                    compress: 'img',
                    extname: ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'avif', 'apng', 'gif', "jpg", "png", "jpeg", "webp"],
                    maxSize: 12 * 1024 * 1024,
                },
            });
            store[f] = JSON.stringify(urls);
        }
        await store.save();
        
        return Store.ParseStore(store);
    }
    async get_store({ }: HttpContext) {

    }
    async get_stores({ request, auth }: HttpContext) {
        let { page, limit, name, email, description, owner_id, phone, order_by } = paginate(request.qs() as { page: number | undefined, limit: number | undefined } & { [k: string]: any });
        // const user = await auth.authenticate();
        // if(user.type !=  USER_TYPE.MODERATOR) return;
        let query = db.query().from(Store.table).select('*').select('users.created_at as user_created_at').leftJoin('users', 'users.id', 'owner_id');

        if (owner_id) {
            query = query.where('owner_id', owner_id);
        }
        if (phone) {
            const like = `%${(phone as string).split('').join('%')}%`;
            query = query.andWhereLike('stores.phone', like);
        }
        if (name) {
            const like = `%${(name as string).split('').join('%')}%`;
            query = query.andWhereLike('stores.name', like);
        }
        if (email) {
            const like = `%${(email as string).split('').join('%')}%`;
            query = query.andWhereLike('users.email', like);
        }
        if (description) {
            const like = `%${(description as string).split('').join('%')}%`;
            query = query.andWhereLike('stores.description', like);
        }
        const stores = await limitation(query, page, limit, order_by)
        return  stores.map(s=>Store.ParseStore(s))
    }
    async owner_stores({ request, auth }: HttpContext) {
        const user = await auth.authenticate()
        const stores = await db.query().from('stores').select('stores.*').where('owner_id', user.id)
        return stores.map(s=>Store.ParseStore(s))
    }
    async delete_store({ request , auth}: HttpContext) {
        const user = await auth.authenticate();
        const store = await Store.findOrFail(request.param('id'));
        if(store.owner_id !== user.id) return 'Permision denied'
        await store.delete();
        return {
            deleted:true,
        }
    }
    async get_store_var({ }: HttpContext) {

        const products = (await db.from(Product.table).count('id as count'))[0]?.count;
        const catalogs = (await db.from(Catalog.table).count('id as count'))[0]?.count;
        const categories = (await db.from(Category.table).count('id as count'))[0]?.count;
        const features = (await db.from(Feature.table).count('id as count'))[0]?.count;
        return {
            products,
            categories,
            catalogs,
            features
        }
    }
}