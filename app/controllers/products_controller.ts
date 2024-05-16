import Product from '#models/product';
import type { HttpContext } from '@adonisjs/core/http'
import { v4 } from "uuid";
import { createFiles } from './Tools/FileManager/CreateFiles.js';
import { updateFiles } from './Tools/FileManager/UpdateFiles.js';
import { unZipDir } from './Tools/ZipManager/unZipDir.js';
import { deleteFiles } from './Tools/FileManager/DeleteFiles.js';
import { limitation, paginate } from './Tools/Utils.js';
import db from '@adonisjs/lucid/services/db';
import PivotProductsFeature from '#models/pivot_products_feature';
import FeaturesController from './features_controller.js';
import UserStore from '#models/user_store';
import Category from '#models/category';
import User from '#models/user';

export default class ProductsController {
    async create_product({ request , auth}: HttpContext) {
        const { title, description, features_id, price, stock, category_id, is_dynamic_price } = request.body();
        
        const category =  await Category.find(category_id);
        if(!category) throw new Error("Category not found");
        
        const user = await auth.authenticate()
        if (!await UserStore.isStoreManagerOrMore(user.id, category.store_id)) throw new Error('Permison Required')

        const existProduct = (await db.from(Product.table).where('title', title).andWhere('store_id', category.store_id).limit(1))[0];
        if (existProduct) throw new Error('Product Exist on Your Store, with the same name');

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
                store_id: category.store_id,
                keywords:'noga'
            })
            product.id = product_id;
            const features = await FeaturesController._get_features_of_product({ product_id });
            return Product.clientProduct(product, { features });
        } catch (error) {
            console.log(error);
            
            await deleteFiles(product_id);
        }
    }

    async update_product({ request, auth }: HttpContext) {
        const body = request.body();
        
        const product = await Product.findBy("id", body.product_id);
        if (!product) {
            return "ERROR Product not found";
        }

        const user = await auth.authenticate()
        if (!await UserStore.isStoreManagerOrMore(user.id, product.store_id)) throw new Error('Permison Required');

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

        return Product.clientProduct(product);
    }


    async update_view_product({ request, auth }: HttpContext) {
        const body = request.body();
        const product = await Product.findBy("id", body.product_id);
        if (!product) {
            return "ERROR Product not found";
        }
        const user = await auth.authenticate()
        if (!await UserStore.isStoreManagerOrMore(user.id, product.store_id)) throw new Error('Permison Required');

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
        return Product.clientProduct(product);
    }


    async get_products({ request , auth}: HttpContext) {                               // price_desc price_asc date_desc date_asc
    
        let { page, limit, category_id, catalog_id, price_min, price_max, text, order_by, stock_min, stock_max, is_features_required , all_status, store_id, product_id  } = paginate(request.qs() as { page: number | undefined, limit: number | undefined } & { [k: string]: any });
        let query = db.query().from(Product.table).select('*');
        
        let user: User | undefined;
        if (!store_id) {
            !user && (user = await auth.authenticate())
            if (!await UserStore.isSublymusManager(user.id)) throw new Error('Sublymus Permison Required')
        } else {
            query = query.where('store_id', store_id);
        }
        if(product_id){
            query = query.andWhere('id', product_id);
        }
        if (all_status) {
            !user && (user = await auth.authenticate());
            if (!await UserStore.isStoreManagerOrMore(user.id, store_id)) throw new Error('Sublymus Permison Required')
        } else {
            query.andWhere('products.status', Product.STATUS.VISIBLE)
        }
         
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
    
        const p = await limitation(query, page, limit, order_by)
        const products = await p.query;
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
            console.log({fullProduct});
            
            return {
                ...p.paging,
                list: fullProduct,
            };
        }
        
        return {
            ...p.paging,
            list: products.map(p => Product.clientProduct(p))
        };
    }

    async delete_product({ request, auth }: HttpContext) {
        const product_id: string = request.param('id');
        
        console.log({product_id});
        
        const product = await Product.find(product_id);
        if(!product) throw new Error('Produt Not Found');
        
        const user = await auth.authenticate();
        if (!await UserStore.isStoreManagerOrMore(user.id, product.store_id)) throw new Error('Permison Required')

        await deleteFiles(product_id);
        await (await Product.find(product_id))?.delete();
        return {
            isDeleted: true,
        };
    }
}