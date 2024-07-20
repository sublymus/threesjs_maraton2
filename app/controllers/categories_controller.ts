import Category from '#models/category';
import type { HttpContext } from '@adonisjs/core/http'
import { v4 } from 'uuid';
import { unZipDir } from './Tools/ZipManager/unZipDir.js';
import { deleteFiles } from './Tools/FileManager/DeleteFiles.js';
import { limitation, paginate } from './Tools/Utils.js';
import db from '@adonisjs/lucid/services/db';
import Product from '#models/product';
import UserStore from '#models/user_store';
import Catalog from '#models/catalog';
import User from '#models/user';

export default class CategoriesController {

    async create_category({ request, auth }: HttpContext) {
        const { label, index, description, catalog_id } = request.body();

        const user = await auth.authenticate()
        const catalog = await Catalog.find(catalog_id);

        if (!catalog) throw new Error("Catalog Not Found");

        if (!await UserStore.isStoreManagerOrMore(user.id, catalog.store_id)) throw new Error('Permison Required')

        const existCategoryg = (await db.from(Category.table).where('label', label).andWhere('store_id', catalog.store_id).limit(1))[0];
        if (existCategoryg) throw new Error('Category Exist on Your Store, with the same name');

        const category_id = v4();
        const category = await Category.create({
            id: category_id,
            label,
            index,
            catalog_id,
            description,
            store_id: catalog.store_id,
            status: Product.STATUS.PAUSE,
        })
        category.id = category_id;
        return category.$attributes
    }

    async update_category({ request, auth }: HttpContext) {
        const body = request.body();

        const category = await Category.find(body.category_id);
        if (!category) return 'category not found';

        const user = await auth.authenticate()
        if (!await UserStore.isStoreManagerOrMore(user.id, category.store_id)) throw new Error('Permison Required');

        ['label', 'index', 'status', 'catalog_id', 'description'].forEach((attribute) => {
            //@ts-ignore
            if (body[attribute]) category[attribute] = body[attribute];
        });

        if (body.status && !Object.values(Product.STATUS).includes(body.status)) {
            delete body.status;
        }
        await category.save();

        return category.$attributes
    }

    async update_view_category({ request, auth }: HttpContext) {
        const { category_id, scene_dir } = request.body();

        const category = await Category.find(category_id);

        if (!category) throw new Error("ERROR category not found");

        const user = await auth.authenticate()
        if (!await UserStore.isStoreManagerOrMore(user.id, category.store_id)) throw new Error('Permison Required')

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

    async get_categories({ request, auth }: HttpContext) {
        let { page, limit, catalog_id, index, text, order_by, all_status, store_id } = paginate(request.qs() as { page: number | undefined, limit: number | undefined, catalog_id: string } & { [k: string]: any });
        let query = db.query().from(Category.table).select('categories.*').count('products.id', 'total_products').leftJoin('products', 'products.category_id', 'categories.id').groupBy('categories.id');
        console.log({ page, limit, catalog_id, index, text, order_by, all_status, store_id } );
        
        let user: User | undefined;
        if (!store_id) {
            !user && (user = await auth.authenticate())
            if (!await UserStore.isSublymusManager(user.id)) throw new Error('Sublymus Permison Required')
        } else {
            query = query.where('categories.store_id', store_id);
        }
        if (all_status) {
            !user && (user = await auth.authenticate());
            if (!await UserStore.isStoreManagerOrMore(user.id, store_id)) throw new Error('Sublymus Permison Required')
        } else {
            query.andWhere('categories.status', Product.STATUS.VISIBLE)
        }
        
        if (catalog_id) {
            query = query.andWhere('catalog_id', catalog_id);
        }

        if (text) {
            const like = `%${(text as string).split('').join('%')}%`;
            if ((text as string).startsWith('#')) {
                query = query.andWhereLike('categories.id', like.replace('#', ''));
            } else {
                query = query.andWhere((q) => {
                    q.whereLike('categories.id', like).orWhereLike('categories.label', like).orWhereLike('categories.description', like);
                });
            }
        }
        if (index) {
            query = query.andWhere('index', index);
        }

        const c = await limitation(query, page, limit, order_by)

        return {
            ...c.paging,
            list: await c.query
        }
    }

    async delete_category({ request, auth }: HttpContext) {
        const category_id = request.param('id');

        const category = await Category.find(category_id);
        if (!category) return 'Category not found';

        const user = await auth.authenticate()
        if (!await UserStore.isStoreManagerOrMore(user.id, category.store_id)) throw new Error('Permison Required')

        await deleteFiles(category_id);
        await db.rawQuery('delete from `categories` where `id` = :id;', { id: category_id });

        return {
            isDeleted: true,
        }
    }
}