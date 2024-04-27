import Product from '#models/product';
import type { HttpContext } from '@adonisjs/core/http'
import { v4 } from "uuid";
import { createFiles } from './Tools/FileManager/CreateFiles.js';
import { updateFiles } from './Tools/FileManager/UpdateFiles.js';
import { unZipDir } from './Tools/ZipManager/unZipDir.js';
import { deleteFiles } from './Tools/FileManager/DeleteFiles.js';
import { paginate } from './Tools/Utils.js';
import db from '@adonisjs/lucid/services/db';
import PivotProductsFeature from '#models/pivot_products_feature';
import FeaturesController from './features_controller.js';

let i = 0;
export default class ProductsController {
    async create_product({ request }: HttpContext) {
        const { title, description, features_id, price, stock, category_id, is_dynamic_price } = request.body();
        const product_id = v4();
        const imagesUrl = await createFiles({
            request,
            column_name: "images",
            table_id: product_id,
            table_name: "products",
            options: {
                throwError: true,
                compress: 'img',
                min: 1,
                max: 25,
                extname: ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'avif', 'apng', 'gif', "jpg", "png", "jpeg", "webp"],
                maxSize: 12 * 1024 * 1024,
            },
        });
        const modelImagesUrl = await createFiles({
            request,
            column_name: "model_images",
            table_id: product_id,
            table_name: "products",
            options: {
                throwError: true,
                compress: 'img',
                min: 1,
                max: 25,
                extname: ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'avif', 'apng', 'gif', "jpg", "png", "jpeg", "webp"],
                maxSize: 12 * 1024 * 1024,
            },
        });

        (features_id as string[])?.forEach(async (feature_id) => {
            try {
                await PivotProductsFeature.create({
                    feature_id,
                    product_id
                })
            } catch (error) { }
        })

        try {
            const product = await Product.create({
                id: product_id,
                title,
                description,
                images: JSON.stringify(imagesUrl),
                model_images: JSON.stringify(modelImagesUrl),
                status: Product.STATUS.PAUSE,
                is_dynamic_price,
                stock,
                category_id,
                price,
                collaborator_id: v4(),
                store_id: v4(),
                // action:`{${new Date().toISOString()},name:'creation','message'}`
            })
            product.id = product_id;
            const features = await FeaturesController._get_features_of_product({ product_id });
            return Product.clientProduct(product, { features });
        } catch (error) {
            await deleteFiles(product_id);
        }
    }
    /*
    UserAction{
        date:yyyy-mm-ddThh-mm-ss
        name:string
        message:string
    }
    
    */


    async update_product({ request }: HttpContext) {
        const body = request.body();
        const product = await Product.findBy("id", body.product_id);

        if (!product) {
            return "ERROR Product not found";
        }
        if( body.status &&  !Object.values(Product.STATUS).includes(body.status)) {
          delete body.status;
        }
        
        ([
            'title',
            'description',
            'status',
            'is_dynamic_price',
            'stock',
            'category_id',
            'price'
        ] as const).forEach((attribute: any) => {
            //@ts-ignore
            if (body[attribute]) product[attribute] = body[attribute];
        });

        let urls = [];

        for (const filesAttribute of ['images', 'model_images'] as const) {
            if (!body[filesAttribute]) continue;

            urls = await updateFiles({ // non synchrone
                request,
                table_name: "products",
                table_id: product.id,
                column_name: filesAttribute,
                lastUrls: product[filesAttribute],
                newPseudoUrls: body[filesAttribute],
                options: {
                    throwError: true,
                    min: 1,
                    max: 7,
                    compress: 'img',
                    extname: ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'avif', 'apng', 'gif', "jpg", "png", "jpeg", "webp"],
                    maxSize: 12 * 1024 * 1024,
                },
            });
            product[filesAttribute] = JSON.stringify(urls);
        }

        await product.save()
        console.log(product.$attributes);

        return product.$attributes;
    }


    async update_view_product({ request }: HttpContext) {
        const body = request.body();
        const product = await Product.findBy("id", body.product_id);

        if (!product) {
            return "ERROR Product not found";
        }
        // if (product.account_id !== access.auth_table_id) {
        //   return "ERROR Permission denied";
        // }
        const file = request.file('scene_dir');
        if (!file) return "scene_dir file not found";

        let url = await unZipDir({
            file: file,
            table_name: "products",
            table_id: product.id,
            column_name: "scene_dir",
            configure(data) {
                return data
            },
        });

        product.scene_dir = url;
        await product.save();
        const rest = product.$attributes
        return rest
    }
    async get_product({ request }: HttpContext) {
        const id: string = request.param('id');
        const product = await Product.find(id);
        if (!product) return "ERROR Product not found";

        return product.$attributes;
    }

    async detail_product({ request }: HttpContext) {
        const id: string = request.param('id');
        const product = await Product.find(id);
        if (!product) return "ERROR Product not found";
        return product.$attributes;
    }

    async get_products({ request }: HttpContext) {                               // price_desc price_asc date_desc date_asc
        console.log(request.qs());

        let { page, limit, category_id, catalog_id, price_min, price_max, text, order_by, stock_min, stock_max, is_features_required } = paginate(request.qs() as { page: number | undefined, limit: number | undefined } & { [k: string]: any });
        let query = db.query().from(Product.table).select('*');
        if (category_id) {
            query = query.where('category_id', category_id);
        }
        if (catalog_id) {
            query = query.whereIn('category_id', (s) => {
                s.from('categories').select('id').where('catalog_id', catalog_id);
            });
        }
        if (text) {
            const like = `%${(text as string).split('').join('%')}%`;
            if ((text as string).startsWith('#')) {
                query = query.andWhereLike('id', like.replaceAll('#',''));
            } else {
                query = query.andWhere((q) => {
                    q.whereLike('id', like).orWhereLike('title', like).orWhereLike('description', like);
                });
            }
        }
        if (price_max || price_min) {
            query = query.andWhere((q) => {
                q.whereBetween('price', [price_min || 0, price_max || Number.MAX_VALUE])
            });
        }
        if (stock_max || stock_min) {
            query = query.andWhere((q) => {
                q.whereBetween('stock', [stock_min || 0, stock_max || Number.MAX_VALUE]);
            });
        }
        const total = Math.max((await query).length, 1);
        let pages = Math.ceil(total / limit);
        page = pages < page ? pages : page;
        query = query.limit(limit).offset((page - 1) * limit);

        if (order_by) {
            if (order_by == 'date_asc') query = query.orderBy("products.created_at", "asc");
            else if (order_by == 'date_desc') query = query.orderBy("products.created_at", "desc");
            else {
                const o = (order_by as string)
                const c = o.substring(0, o.lastIndexOf('_'));
                const m = o.substring(o.lastIndexOf('_') + 1, o.length) as any;
                query = query.orderBy(c, m);
            }
        }
        const products = await query;
        if (is_features_required) {
            const promises = products.map((product) => new Promise(async (rev) => {
                try {
                    const features = await FeaturesController._get_features_of_product({ product_id: product.id });
                    rev(Product.clientProduct(product, { features }))
                } catch (error) {
                    console.log('is_features_required', error.message)
                }
            }))
            const fullProduct = (await Promise.allSettled(promises)).map(m => (m as any).value);
            return {
                page,
                limit,
                total,
                list: fullProduct,
            };
        }


        return {
            page,
            limit,
            total,
            list: products.map(p => Product.clientProduct(p))
        };
    }

    async detail_products({ request }: HttpContext) {
        const qs = request.qs();

        return qs;
    }

    async delete_product({ request }: HttpContext) {
        const product_id: string = request.param('id');
        //const filesAttributes = ['images', 'model_images'] as const;
        //const dirAttributes = ['scen_dir'];

        await deleteFiles(product_id);
        await (await Product.find(product_id))?.delete();
        return {
            isDeleted: true,
        };
    }
}