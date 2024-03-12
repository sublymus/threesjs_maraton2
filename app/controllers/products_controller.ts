import Product from '#models/product';
import type { HttpContext } from '@adonisjs/core/http'
import { v4 } from "uuid";
import { createFiles } from './Tools/FileManager/CreateFiles.js';
import { updateFiles } from './Tools/FileManager/UpdateFiles.js';
import { unZipDir } from './Tools/ZipManager/unZipDir.js';
import { deleteFiles } from './Tools/FileManager/DeleteFiles.js';

export default class ProductsController {
    async create_product({ request }: HttpContext) {
        const { title, description, features, price, stock, category_id, is_dynamic_price } = request.body();
        console.log(request.body());

        const product_id = v4()
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
                extname: ["jpg", "jpeg", "webp", 'png'],
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
                extname: ["jpg", "jpeg", "webp", 'png'],
                maxSize: 12 * 1024 * 1024,
            },
        });

        const product = await Product.create({
            id:product_id,
            title,
            description,
            features,
            images: JSON.stringify(imagesUrl),
            model_images: JSON.stringify(modelImagesUrl),
            status: Product.STATUS['0'],
            is_dynamic_price,
            stock,
            category_id,
            price,
            collaborator_id: v4(),
            store_id: v4(),
            // action:`{${new Date().toISOString()},name:'creation','message'}`
        })
        product.id = product_id;
        return product
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
        const attributes = [
            'title',
            'description',
            'features',
            'status',
            'is_dynamic_price',
            'stock',
            'category',
            'price'
        ] as const;

        const filesAttributes = ['images', 'model_images'] as const;
        let urls = [];

        const product = await Product.findBy("id", body.product_id);

        if (!product) {
            return "ERROR Product not found";
        }
        // if (product.account_id !== access.auth_table_id) {
        //   return "ERROR Permission denied";
        // }


        attributes.forEach((attribute) => {
            //@ts-ignore
            if (body[attribute]) product[attribute] = body[attribute];
        });

        for (const filesAttribute of filesAttributes) {
            if (!body[filesAttribute]) continue;
            urls = await updateFiles({
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
                    extname: ["jpg", "jpeg", "webp"],
                    maxSize: 12 * 1024 * 1024,
                },
            });
            product[filesAttribute] = JSON.stringify(urls);
        }
        await product.save();
        return product;
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
        let url = await unZipDir({
            file: request.file('scene_dir'),
            table_name: "products",
            table_id: product.id,
            column_name: "scene_dir",
        });
        product.scene_dir = url;
        product.save();
        return product; 
    }
    async get_product({ request }: HttpContext) {
        const id: string = request.param('id');
        const product = await Product.find(id);
        return product;
    }

    async detail_product({ request }: HttpContext) {
        const id: string = request.param('id');
        const product = await Product.find(id);
        return product;
    }

    async get_products({ request }: HttpContext) {
        const qs = request.qs();

        return qs;
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
          isDeleted:true,
        };
    }
}