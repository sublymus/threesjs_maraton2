import type { HttpContext } from '@adonisjs/core/http'

import Feature from "#models/feature";
import { v4 } from 'uuid';
import { paginate } from './Tools/Utils.js';
import db from '@adonisjs/lucid/services/db';
import { deleteFiles } from './Tools/FileManager/DeleteFiles.js';
import { createFiles } from './Tools/FileManager/CreateFiles.js';
import PivotProductsFeature from '#models/pivot_products_feature';

export default class FeaturesController {
    async create_feature({ request }: HttpContext) {
        const { collect_type,name,view,default_value,required,placeholder,capitalize,uppercase,lowercase,trim,match,max_length,min_length,max_size,max,min,mime, } = request.body();
        const feature_id = v4();
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
                // extname: ["jpg", "jpeg", "webp", 'png'],
                maxSize: 12 * 1024 * 1024,
            },
        });
        const feature = await Feature.create({
            id: feature_id,
            collect_type,
            name,
            view,
            default_value,
            icon : JSON.stringify(icon_url),
            required,
            placeholder,
            capitalize,
            uppercase,
            lowercase,
            trim,
            match,
            max_length,
            min_length,
            max_size,
            max,
            min,
            mime,
        })
        feature.id = feature_id;
        return feature.$attributes
    }

    async update_feature({ request }: HttpContext) {
        const body = request.body();
        const attributes = ['collect_type', 'name', 'view', 'default_value_id', 'icon', 'required', 'placeholder', 'capitalize', 'uppercase', 'lowercase', 'trim', 'match', 'max_length', 'min_length', 'max_size', 'max', 'min', 'mime'] as const;
        const feature = await Feature.find(body.feature_id);
        if (!feature) return 'feature not found';
        attributes.forEach((attribute) => {
            //@ts-ignore
            if (body[attribute]) feature[attribute] = body[attribute];
        });
        await feature.save();
        return feature.$attributes
    }

    async get_feature({ request }: HttpContext) {
        const feature_id = request.param('id');
        const feature = await Feature.find(feature_id);
        if(!feature) return "ERROR feature not found";
        return feature.$attributes
    }

    async get_features({ request }: HttpContext) {
        const {page , limit} = paginate(request.qs() as  {page:number|undefined,limit:number|undefined,catalog_id:string}&{[k:string]:any});
        let query = db.query().from(Feature.table).select('*')
        query =query.limit(limit).offset((page - 1) * limit);
        return await query
    }

    async delete_feature({ request }: HttpContext) {
        const feature_id = request.param('id');
        await deleteFiles(feature_id);
        await  (await Feature.find(feature_id))?.delete();
        return {
            isDeleted: true,
        }
    }


    ///////////////////////////////////////////


    async add_features_to_product({ request }: HttpContext) {
        const { product_id, features_id } = request.body();
        (features_id as string[]).forEach(async (feature_id) => {
            try {
                await PivotProductsFeature.create({
                    feature_id,
                    product_id
                })
            } catch (error) { }
        })
    }
    async remove_features_to_product({ request }: HttpContext) {
        const { product_id, features_id } = request.body();
        (features_id as string[]).forEach(async (feature_id) => {

            await db.rawQuery(`delete from ${PivotProductsFeature} where product_id = ? and feature_id = ?`, [
                product_id,
                feature_id
            ]);
        })
    }
    async get_features_of_product({ request }: HttpContext) {
        const { product_id } = request.body();
        const features = await db.query().from(PivotProductsFeature.table).select("*")
            .innerJoin('features', 'features.id', 'feature_id').where('feature_id', product_id);

        const promises = features.map((feature) => new Promise(async (rev, rej) => {
            const values = db.query().from('f_values').select('*').where('feature_id', feature.id);
            rev(values)
        }))
        return (await Promise.allSettled(promises)).map(m => (m as any).value)
    }
    
    async get_products_of_feature({ request }: HttpContext) {
        const { feature_id } = request.body();
        const products = await db.query().from(PivotProductsFeature.table).select("*")
            .innerJoin('products', 'products.id', 'product_id').where('feature_id', feature_id);

        return products
    }
    
}

