import Category from '#models/category';
import type { HttpContext } from '@adonisjs/core/http'
import { v4 } from 'uuid';
import { unZipDir } from './Tools/ZipManager/unZipDir.js';
import { deleteFiles } from './Tools/FileManager/DeleteFiles.js';
import { paginate } from './Tools/Utils.js';
import db from '@adonisjs/lucid/services/db';
import Product from '#models/product';

export default class CategoriesController {

    async create_category({ request }: HttpContext) {
        const { label, index, description, catalog_id } = request.body();
        const category_id = v4();
        const category = await Category.create({
            id: category_id,
            label,
            index,
            catalog_id,
            description,
            status:Product.STATUS.PAUSE,
        })
        category.id = category_id;
        return category.$attributes
    }

    async update_category({ request }: HttpContext) {
        const body = request.body();
        console.log(body.category_id);

        const category = await Category.find(body.category_id);
        if (!category) return 'category not found';

        ['label', 'index', 'status', 'catalog_id', 'description'].forEach((attribute) => {
            //@ts-ignore
            if (body[attribute]) category[attribute] = body[attribute];
        });

        if (body.status && !Object.values(Product.STATUS).includes(body.status)) {
            delete body.status;
        }
        await category.save();
        console.log(category.$attributes);

        return category.$attributes
    }

    async update_view_category({ request }: HttpContext) {
        const { category_id, scene_dir } = request.body();

        const category = await Category.find(category_id);

        if (!category) return "ERROR category not found";

        // if (category.account_id !== access.auth_table_id) {
        //   return "ERROR Permission denied";
        // }
        const file = request.file('scene_dir');
        let url;
        if (file) {
            url = await unZipDir({
                file: file,
                table_name: "categories",
                table_id: category.id,
                column_name: "scene_dir",
                configure(data) {
                    return data
                },
            });
        } else if (scene_dir) {
            url = scene_dir;
        } else {
            return "scene_dir file not found";
        }

        category.scene_dir = url;
        await category.save();
        return category.$attributes;
    }

    async get_category({ request }: HttpContext) {
        const category_id = request.param('id');
        const category = await Category.find(category_id);
        if (!category) return "ERROR category not found";
        return category.$attributes
    }

    async get_category_products({ request }: HttpContext) {
        let { page, limit, category_id, order_by } = paginate(request.qs() as { page: number | undefined, limit: number | undefined, catalog_id: string } & { [k: string]: any });
        let query = db.query().from(Product.table).select('products.*').where('category_id', category_id || '');
        if (order_by) {
            const o = (order_by as string)
            const c = o.substring(0, o.lastIndexOf('_'));
            const m = o.substring(o.lastIndexOf('_') + 1, o.length) as any;
            query = query.orderBy(c, m);
        }
        let total = (await query).length;
        let pages = Math.ceil(total / limit);
        page = Math.max(pages < page ? pages : page, 1);

        query = query.limit(limit).offset((page - 1) * limit);
        const products = await query;
        return {
            page,
            limit,
            total,
            list: products.map(p => Product.clientProduct(p)),
        }
    }
    async get_categories({ request }: HttpContext) {
        let { page, limit, catalog_id, index, text, order_by } = paginate(request.qs() as { page: number | undefined, limit: number | undefined, catalog_id: string } & { [k: string]: any });
        let query = db.query().from(Category.table).select('categories.*').count('products.id', 'total_products').leftJoin('products', 'products.category_id', 'categories.id').groupBy('categories.id');
        if (catalog_id) {
            query = query.where('catalog_id', catalog_id);
        }
        if (text) {
            const like = `%${(text as string).split('').join('%')}%`;
            if ((text as string).startsWith('#')) {
                query = query.andWhereLike('id', like);
            } else {
                query = query.andWhere((q) => {
                    q.whereLike('id', like).orWhereLike('label', like).orWhereLike('categories.description', like);
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
        query = query.limit(limit).offset((page - 1) * limit);
        return {
            page,
            limit,
            total,
            list: await query
        }
    }

    async delete_category({ request }: HttpContext) {
        const category_id = request.param('id');
        await deleteFiles(category_id);
        await db.rawQuery('delete from `categories` where `id` = :id;', { id: category_id });
        return {
            isDeleted: true,
        }
    }
}