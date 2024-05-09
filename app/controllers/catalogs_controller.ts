import Catalog from '#models/catalog';
import type { HttpContext } from '@adonisjs/core/http'
import { v4 } from 'uuid';
import { unZipDir } from './Tools/ZipManager/unZipDir.js';
import { deleteFiles } from './Tools/FileManager/DeleteFiles.js';
import db from '@adonisjs/lucid/services/db'
import { limitation, paginate } from './Tools/Utils.js';
import Product from '#models/product';
import UserStore from '#models/user_store';
import User from '#models/user';
export default class CatalogsController {

    async create_catalog({ request, auth }: HttpContext) {
        const { label, index, description, store_id } = request.body();
        
        const user = await auth.authenticate()
        if (!await UserStore.isStoreManagerOrMore(user.id, store_id)) throw new Error('Permison Required')

        const existCatalog = (await db.from(Catalog.table).where('label', label).andWhere('store_id', store_id).limit(1))[0];
        if (existCatalog) throw new Error('Catalog Exist on Your Store, with the same name');

        const catalog_id = v4();
        const catalog = await Catalog.create({
            id: catalog_id,
            label,
            index,
            description,
            store_id,
            status: Product.STATUS.PAUSE,
        })
        catalog.id = catalog_id;

        return catalog.$attributes
    }

    async update_catalog({ request, auth }: HttpContext) {
        const body = request.body();

        const catalog = await Catalog.find(body.catalog_id);
        if (!catalog) throw new Error('Catalog not found');

        const user = await auth.authenticate()
        if (!await UserStore.isStoreManagerOrMore(user.id, catalog.store_id)) throw new Error('Permison Required')

        //V
        if (body.status && !Object.values(Product.STATUS).includes(body.status)) {
            delete body.status;
        }


        (['label', 'status', 'index', 'description']).forEach((a) => {
            if (body[a]) (catalog as any)[a] = body[a];
        });
        await catalog.save();

        return catalog.$attributes
    }

    async update_view_catalog({ request, auth }: HttpContext) {
        const { catalog_id } = request.body();

        const catalog = await Catalog.findBy("id", catalog_id);
        if (!catalog) throw new Error("ERROR catalog not found");

        const user = await auth.authenticate()
        if (!await UserStore.isStoreManagerOrMore(user.id, catalog.store_id)) throw new Error('Permison Required')

        const file = request.file('scene_dir');
        if (!file) throw new Error("scene_dir file not found");

        let url = await unZipDir({
            file: file,
            table_name: Catalog.table,
            table_id: catalog.id,
            column_name: "scene_dir",
        });
        catalog.scene_dir = url;

        catalog.save();
        return catalog.$attributes;
    }

    async get_catalogs({ request, auth }: HttpContext) {
        let { page, limit, text, index, order_by, is_category_required, all_status, store_id } = paginate(request.qs() as { page: number | undefined, limit: number | undefined } & { [k: string]: any });

        let query =
            db.query()
                .from(db.from('categories')
                    .select('catalog_id')
                    .count('products.id as nbr_product')
                    .leftJoin('products', 'products.category_id', 'categories.id')
                    .groupBy('categories.id')
                ).rightJoin(Catalog.table, (query) => {
                    query.on('catalog_id', 'catalogs.id')
                })
                .select('catalogs.*')
                .sum('nbr_product as total_product')
                .groupBy('catalogs.id')
        let user: User | undefined;
        if (!store_id) {
            !user && (user = await auth.authenticate())
            if (!await UserStore.isSublymusManager(user.id)) throw new Error('Sublymus Permison Required')
        } else {
            query = query.where('store_id', store_id);
        }
        if (all_status) {
            !user && (user = await auth.authenticate());
            if (!await UserStore.isStoreManagerOrMore(user.id, store_id)) throw new Error('Sublymus Permison Required')
        } else {
            query.andWhere('catalogs.status', Product.STATUS.VISIBLE)
        }

        if (text) {
            const like = `%${(text as string).split('').join('%')}%`;
            if ((text as string).startsWith('#')) {
                query = query.andWhereLike('id', like.replace('#',''));
            } else {
                query = query.andWhere((q) => {
                    q.whereLike('id', like).orWhereLike('label', like).orWhereLike('description', like);
                });
            }
        }
        if (index) {
            query = query.andWhere('index', index);
        }

        const q_catalogs = await limitation(query, page, limit, order_by)
        const catalogs = await q_catalogs.query

        if (is_category_required) {
            const promises = catalogs.map((catalog) => new Promise(async (rev) => {
                try {
                    const categories = await db.query().from('categories').select('*').where('catalog_id', catalog.id);
                    rev({
                        ...catalog,
                        categories
                    })
                } catch (error) {
                    console.log(error.message);

                }
            }))
            const fullCatalog = (await Promise.allSettled(promises)).map(m => (m as any).value)
            return {
                ...q_catalogs.paging,
                list: fullCatalog
            }
        }
        return {
            ...q_catalogs.paging,
            list: catalogs,
        }
    }

    async delete_catalog({ request, auth }: HttpContext) {
        const catalog_id = request.param('id');

        const catalog = await Catalog.find(catalog_id);
        if (!catalog) throw new Error( 'Catalog not found');
        ;

        const user = await auth.authenticate()
        if (!await UserStore.isStoreManagerOrMore(user.id, catalog.store_id)) throw new Error('Permison Required')

        await deleteFiles(catalog_id);
        await catalog.delete();

        return {
            isDeleted: true,
        }
    }
}