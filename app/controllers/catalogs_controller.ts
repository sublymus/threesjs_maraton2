import Catalog from '#models/catalog';
import type { HttpContext } from '@adonisjs/core/http'
import { v4 } from 'uuid';
import { unZipDir } from './Tools/ZipManager/unZipDir.js';
import { deleteFiles } from './Tools/FileManager/DeleteFiles.js';
import db from '@adonisjs/lucid/services/db'
import { paginate } from './Tools/Utils.js';
import Product from '#models/product';

export default class CatalogsController {

    async create_catalog({ request }: HttpContext) {
        const { label, index, description } = request.body();

        const catalog_id = v4();
        const catalog = await Catalog.create({
            id: catalog_id,
            label,
            index,
            description,
            status: Product.STATUS.PAUSE,
        })
        catalog.id = catalog_id;
        console.log('new', catalog.$attributes);

        return catalog.$attributes
    }

    async update_catalog({ request }: HttpContext) {
        const body = request.body();
        console.log(body);
        
        const attributes = ['label', 'status', 'index', 'description'] as const;

        if (body.status && !Object.values(Product.STATUS).includes(body.status)) {
            delete body.status;
        }

        const catalog = await Catalog.find(body.catalog_id);
        if (!catalog) return 'Catalog not found';
        attributes.forEach((attribute) => {
            //@ts-ignore
            if (body[attribute]) catalog[attribute] = body[attribute];
        });
        await catalog.save();
        console.log(catalog);

        return catalog.$attributes
    }

    async update_view_catalog({ request }: HttpContext) {
        const { catalog_id } = request.body();
        console.log({ catalog_id });

        const catalog = await Catalog.findBy("id", catalog_id);

        if (!catalog) {
            return "ERROR catalog not found";
        }
        // if (catalog.account_id !== access.auth_table_id) {
        //   return "ERROR Permission denied";
        // }

        const file = request.file('scene_dir');
        if (!file) return "scene_dir file not found";

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

    async get_catalog({ request }: HttpContext) {
        const catalog_id = request.param('id');
        const catalog = await Catalog.find(catalog_id);
        if (!catalog) return 'Catalog not found';
        return catalog.$attributes
    }

    async get_catalog_products({ request }: HttpContext) {
        let { catalog_id, page, limit } = paginate(request.qs() as { page: number | undefined, limit: number | undefined } & { [k: string]: any });
        if (!catalog_id) return 'Catalog not found'
        let query = db.query().from(Product.table).whereIn('category_id', (query) => {
            query.from('categories').select('id').where('catalog_id', catalog_id);
        })
        let total = (await query).length;
        let pages = Math.ceil(total / limit);
        page = Math.max(pages < page ? pages : page, 1);

        query = query.limit(limit).offset((page - 1) * limit);
        const products = await query;
        console.log({ catalog_id, total, products });

        return {
            page,
            limit,
            total,
            list: products.map(p => Product.clientProduct(p)),
        }
    }
    async get_catalog_categories({ request }: HttpContext) {
        let { catalog_id, page, limit } = paginate(request.qs() as { page: number | undefined, limit: number | undefined } & { [k: string]: any });
        if (!catalog_id) return 'Catalog not found'

        console.log('categories ==', catalog_id);
        let query = db.from('categories').select('*').where('catalog_id', catalog_id);
        let total = (await query).length;
        let pages = Math.ceil(total / limit);
        page = Math.max(pages < page ? pages : page, 1);
        query = query.limit(limit).offset((page - 1) * limit);
        console.log(total, limit, page);

        const categories = await query;
        console.log('categories ==', categories);

        return {
            page,
            limit,
            total,
            list: categories,
        }
    }
    //
    async get_catalogs({ request }: HttpContext) {
        let { page, limit, catalog_id, text, index, order_by, is_category_required } = paginate(request.qs() as { page: number | undefined, limit: number | undefined } & { [k: string]: any });
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
        /*
         .from(Catalog.table).from(
            db.from('categories')
            .select('catalog_id')
            .count('products.id as nbr_product')
            .leftJoin('products','products.category_id','categories.id')
            .groupBy('categories.id')
        )
        .select('*')
        .sum('nbr_product as total_product')
        .whereColumn('catalog_id','catalogs.id')
        .groupBy('catalogs.id')
        */
        if (catalog_id) {
            query = query.where('id', catalog_id);
        }
        if (text) {
            const like = `%${(text as string).split('').join('%')}%`;
            if ((text as string).startsWith('#')) {
                query = query.andWhereLike('id', like);
            } else {
                query = query.andWhere((q) => {
                    q.whereLike('id', like).orWhereLike('label', like).orWhereLike('description', like);
                });
            }
        }
        if (index) {
            query = query.andWhere('index', index);
        }
        if (order_by) {
            const o = (order_by as string)
            const c = o.substring(0, o.lastIndexOf('_'));
            const m = o.substring(o.lastIndexOf('_') + 1, o.length) as any;
            query = query.orderBy(c, m);
        }
        let total = Math.max((await query).length, 1);
        let pages = Math.ceil(total / limit);
        page = pages < page ? pages : page;
        query = query.limit(limit).offset((page - 1) * limit)
        const catalogs = await query

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
                page,
                limit,
                total,
                list: fullCatalog
            }
        }
        return {
            page,
            limit,
            total,
            list: catalogs,
        }
    }

    async delete_catalog({ request }: HttpContext) {
        const catalog_id = request.param('id');
        const catalog = await Catalog.find(catalog_id);
        await deleteFiles(catalog_id);
        if (!catalog) return 'Catalog not found';
        await catalog.delete();
        return {
            isDeleted: true,
        }
    }
}