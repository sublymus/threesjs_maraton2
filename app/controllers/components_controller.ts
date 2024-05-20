import Component from '#models/component';
import type { HttpContext } from '@adonisjs/core/http'
import { v4 } from 'uuid';
import { paginate } from './Tools/Utils.js';
import db from '@adonisjs/lucid/services/db';
import { deleteFiles } from './Tools/FileManager/DeleteFiles.js';
import { createFiles } from './Tools/FileManager/CreateFiles.js';
import { updateFiles } from './Tools/FileManager/UpdateFiles.js';
import UserStore from '#models/user_store';
import ProductFeatureComponent from '#models/product_feature_component';
import Product from '#models/product';

export default class ComponentController {
    async create_component({ request, auth }: HttpContext) {
        const { name, description, scene, code, key, store_id } = request.body();

        const user = await auth.authenticate();
        if (!UserStore.isStoreManagerOrMore(user.id, store_id)) throw new Error("PREMISSION REQUIRED");

        const existingFeature = (await db.from(Component.table).select('id').where('store_id', store_id).andWhere('name', name).limit(1))[0];
        if (existingFeature) throw new Error("Component :'" + name + "' already existin this store ");

        const component_id = v4();
        const images = await createFiles({
            request,
            column_name: "images",
            table_id: component_id,
            table_name: Component.table,
            options: {
                throwError: true,
                // compress: 'img',
                min: 0,
                max: 1,
                // extname:  ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'avif', 'apng', 'gif', "jpg", "png", "jpeg", "webp"],
                maxSize: 12 * 1024 * 1024,
            },
        });
        const icon_url = await createFiles({
            request,
            column_name: "icon",
            table_id: component_id,
            table_name: Component.table,
            options: {
                throwError: true,
                // compress: 'img',
                min: 0,
                max: 1,
                // extname:  ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'avif', 'apng', 'gif', "jpg", "png", "jpeg", "webp"],
                maxSize: 12 * 1024 * 1024,
            },
        });
        const component = await Component.create({
            id: component_id,
            icon: JSON.stringify(icon_url),
            images: JSON.stringify(images),
            name,
            description,
            scene,
            code,
            key,
            store_id
        })
        component.id = component_id;
        return Component.parseComponent(component)
    }

    async update_component({ request, auth }: HttpContext) {
        const body = request.body();

        const component = await Component.find(body.component_id);
        if (!component) throw new Error('component not found');
        ;
        const user = await auth.authenticate();
        if (!UserStore.isStoreManagerOrMore(user.id, component.store_id)) throw new Error("PREMISSION REQUIRED");


        (['name', 'description', 'scene', 'code', 'key']).forEach((a) => {
            if (body[a]) (component as any)[a] = body[a];
        });
        for (const f of (['images', 'icon'] as const)) {
            if (!body[f]) continue;
            const urls = await updateFiles({
                request,
                table_name: Component.table,
                table_id: component.id,
                column_name: f,
                lastUrls: component[f],
                newPseudoUrls: body[f],
                options: {
                    throwError: true,
                    min: 0,
                    max: 1,
                    // compress: 'img',
                    // extname:  ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'avif', 'apng', 'gif', "jpg", "png", "jpeg", "webp"],
                    maxSize: 12 * 1024 * 1024,
                },
            });
            component[f] = JSON.stringify(urls);
        }
        await component.save();
        // console.log(component);

        return Component.parseComponent(component)
    }

    async get_components({ request }: HttpContext) {
        const { page, limit, component_id, text, store_id } = paginate(request.qs() as { page: number | undefined, limit: number | undefined, catalog_id: string } & { [k: string]: any });
        let query = db.query().from(Component.table).select('*').where('store_id', store_id);

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
        if (component_id) {
            query = query.andWhere('id', component_id);
        }
        query = query.limit(limit).offset((page - 1) * limit);
        const total = await db.query().from(Component.table).select('id');
        return {
            page,
            limit,
            total: total.length,
            list: await query
        }
    }

    async delete_component({ request, auth }: HttpContext) {
        const component_id = request.param('id');

        const component = await Component.find(component_id);
        if (!component) throw new Error("Component Not Found");

        const user = await auth.authenticate();
        if (!UserStore.isStoreManagerOrMore(user.id, component.store_id)) throw new Error("PREMISSION REQUIRED");

        await deleteFiles(component_id);
        await (await Component.find(component_id))?.delete();
        return {
            isDeleted: true,
        }
    }


    async set_product_feature_component({ request, auth }: HttpContext) {
        const { product_id, feature_id, component_id, price, unity, devise } = request.body();

        const product = await Product.find(product_id);
        if (!product) throw new Error("Product Not Found");

        const user = await auth.authenticate();
        if (!UserStore.isStoreManagerOrMore(user.id, product.store_id)) throw new Error("PREMISSION REQUIRED");

        const p = (await db.from(ProductFeatureComponent.table).select('*').where('product_id', product_id).andWhere('feature_id', feature_id).andWhere('component_id', component_id).limit(1))[0]
        if (p) throw new Error("Already exist " + p.id);

        const id = v4();
        const productFeatureComponent = await ProductFeatureComponent.create({
            id,
            product_id,
            feature_id,
            component_id,
            price,
            unity,
            devise,
            store_id: product.store_id
        });
        return {
            ...productFeatureComponent.$attributes,
            id
        }
    }

    async update_product_feature_component({ request, auth }: HttpContext) {
        const body = request.body();

        const productFeatureComponent = await ProductFeatureComponent.find(body.product_feature_component_id);
        if (!productFeatureComponent) throw new Error("Binder ");
        const product = await Product.find(productFeatureComponent.product_id);
        if (!product) throw new Error("Product Not Found");
        const user = await auth.authenticate();
        if (!UserStore.isStoreManagerOrMore(user.id, product.store_id)) throw new Error("PREMISSION REQUIRED");
        ['price', 'unity', 'devise'].filter((f) => {
            if (!body[f]) return;
            (productFeatureComponent as any)[f] = body[f]
        });
        await productFeatureComponent.save();
        return productFeatureComponent.$attributes
    }
    async get_product_feature_components({ request }: HttpContext) {
        const { product_id, feature_id, component_id, price_min, price_max, unity, devise, store_id } = request.param('id');
        let query = db.from(ProductFeatureComponent.table)
            .select('*')
        if (store_id) {
            query = query.where('store_id', store_id);
        }
        if (product_id) {
            query = query.where('product_id', product_id);
        }
        if (feature_id) {
            query = query.andWhere('feature_id', feature_id);
        }
        if (component_id) {
            query = query.andWhere('component_id', component_id);
        }
        if (price_max || price_min) {
            query = query.andWhere((q) => {
                q.whereBetween('price', [price_min || 0, price_max || Number.MAX_VALUE])
            });
        }
        if (unity) {
            query = query.andWhere('unity', unity);
        }
        if (devise) {
            query = query.andWhere('devise', devise);
        }

    }
    async detete_product_feature_component({ request, auth }: HttpContext) {
        const { product_id, feature_id, component_id, price, unity, devise } = request.param('id');
        const id = v4();
        const product = await Product.find(product_id);
        if (!product) throw new Error("Product Not Found");
        const user = await auth.authenticate();
        if (!UserStore.isStoreManagerOrMore(user.id, product.store_id)) throw new Error("PREMISSION REQUIRED");
        const productFeatureComponent = await ProductFeatureComponent.find({
            id,
            product_id,
            feature_id,
            component_id,
            price,
            unity,
            devise
        });
        return {
            ...productFeatureComponent,
            id
        }
    }


}