import type { HttpContext } from '@adonisjs/core/http'

import Feature from "#models/feature";
import { v4 } from 'uuid';
import { limitation, paginate } from './Tools/Utils.js';
import db from '@adonisjs/lucid/services/db';
import { deleteFiles } from './Tools/FileManager/DeleteFiles.js';
import { createFiles } from './Tools/FileManager/CreateFiles.js';
import Product from '#models/product';
import { updateFiles } from './Tools/FileManager/UpdateFiles.js';
import UserStore from '#models/user_store';
import Component from '#models/component';

export default class FeaturesController {
    async create_feature({ request, auth }: HttpContext) {
        const { product_id, view, name, icon, components ,required, placeholder, case: _case, match, max, min } = request.body();
        // 'components' |
        // 'number' |
        // 'text' |
        // 'email' |
        // 'website' |
        // 'date' |
        // 'time' |
        // 'phone'
        console.log({
            product_id,
            view,
            name,
            required,
            placeholder,
            match,
            icon,
            _case,
            // max_size,
            max,
            min
        });

        const user = await auth.authenticate();
        const product = await Product.find(product_id);
        if (!product) throw new Error("Product Not Found");

        if (!UserStore.isStoreManagerOrMore(user.id, product.store_id)) throw new Error("PREMISSION REQUIRED");

        const feature_id = v4();

        // const existingFeature = (await db.from(Feature.table).select('id').where('product_id', product.id).andWhere('name', name).limit(1))[0];
        // if (existingFeature) throw new Error("FEATURE :'" + name + "' already existin this store ");

        const icon_url = await createFiles({
            request,
            column_name: "icon",
            table_id: feature_id,
            table_name: Feature.table,
            options: {
                throwError: true,
                // compress: 'img',
                min: 1,
                max: 1,
                // extname:  ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'avif', 'apng', 'gif', "jpg", "png", "jpeg", "webp"],
                maxSize: 12 * 1024 * 1024,
            },
        });
        const feature = await Feature.create({
            id: feature_id,
            name,
            view,
            case: _case,
            required,
            placeholder,
            icon: JSON.stringify(icon_url),
            match,
            // max_size,
            max,
            min,
            product_id,
            // mime,
            // ext,
            // components,
            // is_f_alue
        })
        feature.id = feature_id;

        const newComponents: Component[] = [];

        if (view == 'components')
            try {
                const list = JSON.parse(components);
                console.log(list);
                if (Array.isArray(list)) {
                    for (const comp of list) {
                        console.log({comp});
                        
                        newComponents.push(Component.parseComponent(await FeaturesController._create_component(request, comp, feature_id)) as any)
                    }
                }

            } catch (error) {

            }
        return { ...Feature.parseFeature(feature), components: newComponents }
    }
    public static async _update_component(request: HttpContext['request'], newComp: any, lastComp:Component) {
        ['description','name','price','is_default','scene_code'].forEach(k=>{
            if (newComp[k]) (lastComp as any)[k] = newComp[k];
        })
       
        for (const a of ['images'] as const) {
            if (!newComp[a]) continue;
           try {
            const images = await updateFiles({
                request,
                table_name:  Component.table,
                table_id: lastComp.id,
                column_name: a,
                distinct:newComp.distinct,
                lastUrls: lastComp[a] || '[]',
                newPseudoUrls:newComp[a] ,
                options: {
                    throwError: true,
                    min: 0,
                    max: 1,
                    compress: 'img',
                    extname: ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'avif', 'apng', 'gif', "jpg", "png", "jpeg", "webp"],
                    maxSize: 12 * 1024 * 1024,
                },
            });
            lastComp[a] = JSON.stringify(images);
           } catch (error) {
            console.log(error);
            
           }
        }
        await lastComp.save()


    }
    public static async _create_component(request: HttpContext['request'], comp: any, feature_id: string) {
        const comp_id = v4();
        const comp_images = await createFiles({
            request,
            column_name: "images",
            distinct:comp.distinct,
            table_id: comp_id,
            table_name: Component.table,
            options: {
                throwError: true,
                compress: 'img',
                min: 0,
                max: 1,
                extname:  ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'avif', 'apng', 'gif', "jpg", "png", "jpeg", "webp"],
                maxSize: 12 * 1024 * 1024,
            },
        });
        const component = await Component.create({
            description: comp.description,
            id: comp_id,
            images: JSON.stringify(comp_images),
            name: comp.name,
            price: comp.price,
            is_default:!!comp.is_default,
            scene: comp.scene,
            scene_code: comp.scene_code,
            feature_id: feature_id,
        })

        component.id = comp_id
        component.$attributes.id = comp_id
        return component
    }
    async update_feature({ request, auth }: HttpContext) {
        const body = request.body();
        const user = await auth.authenticate();
        if (!UserStore.isStoreManagerOrMore(user.id, body.store_id)) throw new Error("PREMISSION REQUIRED");

        const feature = await Feature.find(body.feature_id);
        if (!feature) return 'feature not found';

        (['view', 'name', 'required', 'placeholder', 'case', 'match', 'max_size', 'max', 'min', 'mime']).forEach((a) => {
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
                    max: 1,
                    compress: 'img',
                    extname: ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'avif', 'apng', 'gif', "jpg", "png", "jpeg", "webp"],
                    maxSize: 12 * 1024 * 1024,
                },
            });
            feature[a] = JSON.stringify(urls[a]);
        }

        const lasComps = await Component.query().where('feature_id', feature.id);
        try {
            const newComps = JSON.parse(body.components) || []
            
        for (const comp of newComps) {
            const last = lasComps.find((f) => f.id == comp.id);
            console.log({last:last?.$attributes,comp});
            
            if (last) {
                try {
                    await FeaturesController._update_component(request, comp, last);
                } catch (error) {
                    console.log(error);
                    
                }
            } else {
                try {
                    await FeaturesController._create_component(request, comp, feature.id);
                } catch (error) {
                    console.log(error);
                }
            }
        }

        for (const comp of lasComps) {
            const newC = newComps.find((f:any) => f.id == comp.id);
            if (!newC) {
                try {
                    await comp.delete();
                } catch (error) {}
            }
        }
        } catch (error) {
            
        }

        await feature.save();
        const a = Feature.parseFeature(feature);
        const components = (await db.query().from(Component.table).where('feature_id', feature.id)).map(c => Component.parseComponent(c));
        return {
            ...a,
            components
        }
    }

    async get_features({ request }: HttpContext) {
        let qs = paginate(request.qs() as { page: number | undefined, limit: number | undefined, catalog_id: string } & { [k: string]: any });

        return FeaturesController._get_features(qs);
    }

    async delete_feature({ request, auth }: HttpContext) {
        const user = await auth.authenticate();
        const feature_id = request.param('id');
        const feature = await Feature.find(feature_id);
        if (!feature) throw new Error("Feature not found");
        const product = await Product.find(feature.product_id);
        if (!product) throw new Error("Product not found");
        if (!UserStore.isStoreManagerOrMore(user.id, product.store_id)) throw new Error("PREMISSION REQUIRED");

        const comps = await Component.query().where('feature_id', feature_id);
        const delete_promise = comps.map(c => new Promise(async (rev) => {
            deleteFiles(c.id);
            await c.delete();
            rev(null)
        }));
        await Promise.allSettled(delete_promise);
        await deleteFiles(feature_id);
        // await db.rawQuery('delete from `components` where `feature_id` = :id;', { id: feature_id });
        await feature.delete()
        // await db.rawQuery('delete from `features` where `id` = :id;', { id: feature_id });
        return {
            isDeleted: true,
        }
    }

    public static async _get_features({ page, limit, order_by, text, feature_id, store_id, product_id }: { page?:number, limit?:number, order_by?:string, text?:string, feature_id?:string, store_id?:string, product_id?:string }) {
        let query = db.query().from(Feature.table).select('features.*').leftJoin('products', 'products.id', 'product_id')
        if (store_id) {
            query = query.where('store_id', store_id);
        }
        if (product_id) {
            query = query.where('product_id', product_id);
        }
        if (text) {
            const t = text as string
            const v = `%${t.split('').join('%')}%`;

            if ((t).startsWith('#')) {
                query = query.whereLike('features.id', `%${t.replaceAll('#', '')}%`);
            } else {
                query = query.andWhere((q) => {
                    q.whereLike('features.name', v)
                });
            }
        }
        if (feature_id) {
            query = query.andWhere('features.id', feature_id);
        }
        const a = await limitation(query, page||1, limit||25, order_by);
        const features = (await query).map(v => Feature.parseFeature(v));
        const components_promise = features.map(f => new Promise(async (rev) => {
            const components = (await db.query().from(Component.table).where('feature_id', (f as any).id)).map(c => Component.parseComponent(c));
            (f as any).components = components;
            rev(null);
        }))
        await Promise.allSettled(components_promise);
        return {
            ...a.paging,
            list: features
        }
    }
}

