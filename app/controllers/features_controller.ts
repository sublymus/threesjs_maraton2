import type { HttpContext } from '@adonisjs/core/http'

import Feature from "#models/feature";
import { v4 } from 'uuid';
import { limitation, paginate } from './Tools/Utils.js';
import db from '@adonisjs/lucid/services/db';
import { deleteFiles } from './Tools/FileManager/DeleteFiles.js';
import { createFiles } from './Tools/FileManager/CreateFiles.js';
import PivotProductsFeature from '#models/pivot_products_feature';
import Product from '#models/product';
import { updateFiles } from './Tools/FileManager/UpdateFiles.js';
import UserStore from '#models/user_store';
import ProductFeatureComponent from '#models/product_feature_component';
import Component from '#models/component';

export default class FeaturesController {
    async create_feature({ request, auth }: HttpContext) {
        const { store_id, collect_type, name, _enum, default_value, required, placeholder, capitalize, uppercase, lowercase, trim, match, max_length, min_length, max_size, max, min, mime, values } = request.body();

        const user = await auth.authenticate();
        if (!UserStore.isStoreManagerOrMore(user.id, store_id)) throw new Error("PREMISSION REQUIRED");

        const feature_id = v4();

        const existingFeature = (await db.from(Feature.table).select('id').where('store_id', store_id).andWhere('name', name).limit(1))[0];
        if (existingFeature) throw new Error("FEATURE :'" + name + "' already existin this store ");

        const icon_url = await createFiles({
            request,
            column_name: "icon",
            table_id: feature_id,
            table_name: Feature.table,
            options: {
                throwError: true,
                // compress: 'img',
                min: 0,
                max: 1,
                // extname:  ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'avif', 'apng', 'gif', "jpg", "png", "jpeg", "webp"],
                maxSize: 12 * 1024 * 1024,
            },
        });
        const feature = await Feature.create({
            id: feature_id,
            name,
            collect_type,
            required,
            placeholder,
            default_value,
            icon: JSON.stringify(icon_url),
            lowercase,
            capitalize,
            uppercase,
            trim,
            match,
            min_length,
            max_length,
            max_size,
            max,
            min,
            store_id,
            // mime,
            // ext,
            enum: _enum,
            // is_f_alue
        })
        feature.id = feature_id;
        return Feature.parseFeature(feature)
    }

    async update_feature({ request, auth }: HttpContext) {
        const body = request.body();
        const user = await auth.authenticate();
        if (!UserStore.isStoreManagerOrMore(user.id, body.store_id)) throw new Error("PREMISSION REQUIRED");

        const feature = await Feature.find(body.feature_id);
        if (!feature) return 'feature not found';

        (['collect_type', 'name', 'default_value_id', 'required', 'placeholder', 'capitalize', 'uppercase', 'lowercase', 'trim', 'match', 'max_length', 'min_length', 'max_size', 'max', 'min', 'mime', 'enum']).forEach((a) => {
            if (body[a]) (feature as any)[a] = body[a];
        });

        const urls: any = {};

        for (const a of ['icon'] as const) {
            if (!body[a]) continue;
            urls[a] = await updateFiles({
                request,
                table_name: "features",
                table_id: feature.id,
                column_name: a,
                lastUrls: feature[a] || '[]',
                newPseudoUrls: body[a],
                options: {
                    throwError: true,
                    min: 1,
                    max: 7,
                    compress: 'img',
                    extname: ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'avif', 'apng', 'gif', "jpg", "png", "jpeg", "webp"],
                    maxSize: 12 * 1024 * 1024,
                },
            });
            feature[a] = JSON.stringify(urls[a]);
        }

        await feature.save();

        return Feature.parseFeature(feature)
    }

    async get_features({ request }: HttpContext) {
        let { page, limit, order_by, text, feature_id, store_id } = paginate(request.qs() as { page: number | undefined, limit: number | undefined, catalog_id: string } & { [k: string]: any });
        console.log( page, limit, order_by, text, feature_id, store_id);
        
        let query = db.query().from(Feature.table).select('*').where('store_id', store_id);
        if (text) {
            const t = text as string
            const v = `%${t.split('').join('%')}%`;
            if ((t).startsWith('#')) {
                query = query.whereLike('id', `%${t.replaceAll('#', '')}%`);
            } else {
                query = query.andWhere((q) => {
                    q.whereLike('name', v)
                });
            }

        }
        if (feature_id) {
            query = query.andWhere('id', feature_id);
        }
        const a = await limitation(query, page, limit, order_by)
        return {
            ...a.paging,
            list: (await query).map(v => Feature.parseFeature(v))
        }
    }

    async delete_feature({ request, auth }: HttpContext) {
        const user = await auth.authenticate();
        const feature_id = request.param('id');
        const feature = await Feature.find(feature_id);
        if (!feature) throw new Error("Feature not found");
        if (!UserStore.isStoreManagerOrMore(user.id, feature.store_id)) throw new Error("PREMISSION REQUIRED");

        await deleteFiles(feature_id);
        await db.rawQuery('delete from `features` where `id` = :id;', { id: feature_id });
        return {
            isDeleted: true,
        }
    }

    ///////////////////////////////////////////

    async add_feature_to_product({ request, auth }: HttpContext) {
        const { product_id, feature_id ,no_list } = request.body();
        const product = await Product.find(product_id);
        if (!product) throw new Error('Product not found');
        const user = await auth.authenticate();
        if (!UserStore.isStoreManagerOrMore(user.id, product.store_id)) throw new Error("PREMISSION REQUIRED");

        const existingPivot = (await PivotProductsFeature.query().where('product_id', product_id).andWhere('feature_id', feature_id || '').limit(1))[0]

        if (existingPivot) throw new Error("This Feature is already binded to this product");

        await PivotProductsFeature.create({
            feature_id,
            product_id
        });

        let features
        if(!no_list)features = await FeaturesController._get_features_of_product({ product_id })
        return {
            ...Product.clientProduct(product),
            features
        }
    }
    async remove_features_to_product({ request, auth }: HttpContext) {
        const { product_id, feature_id } = request.body();
        const product = await Product.find(product_id);
        if (!product) throw new Error('Product not found');
        const user = await auth.authenticate();
        if (!UserStore.isStoreManagerOrMore(user.id, product.store_id)) throw new Error("PREMISSION REQUIRED");

        await db.rawQuery(`delete from ${PivotProductsFeature.table} where product_id = ? and feature_id = ?`, [
            product_id,
            feature_id
        ]);
        return {
            isDeleted: true
        }
    }

    async get_features_of_product({ request }: HttpContext) {
        const { product_id, page, limit } = request.qs();
        return FeaturesController._get_features_of_product({ product_id, page, limit })
    }

    public static async _get_features_of_product({ product_id, page, limit }: { product_id: any, page?: any, limit?: any, }) {
        if (!product_id) throw new Error("product_id is undefined");

        let query = db.query().from(PivotProductsFeature.table).select("*")
            .innerJoin('features', 'features.id', 'feature_id').where('product_id', product_id);
        const l = await limitation(query, page, limit);
        let features = await l.query;
        const promises = features.map((feature) => new Promise(async (rev) => {
            const productFeatureComponents = await db.query().from(ProductFeatureComponent.table).select('*').join(Component.table, 'components.id', 'component_id').where('feature_id', feature.id).andWhere('product_id', product_id);
            rev({
                ...Feature.parseFeature(feature),
                components: productFeatureComponents.map(c=>Component.parseComponent(c))
            })
        }))
        return {
            ...l.paging,
            list: (await Promise.allSettled(promises)).map(m => (m as any).value)
        }
    }

    async get_products_of_feature({ request }: HttpContext) {
        const { feature_id, page, limit, order_by } = request.qs();
        if (!feature_id) throw new Error("eature_id is undefined");
        
        let query = db.query().from(PivotProductsFeature.table).select("*")
            .innerJoin('products', 'products.id', 'product_id').where('feature_id', feature_id);

        let l = await limitation(query, page, limit); 
        return {
            ...l.paging,
            list : await l.query
        }
    }

}

