import type { HttpContext } from '@adonisjs/core/http'
import { createFiles } from './Tools/FileManager/CreateFiles.js';
import { v4 } from 'uuid';
import DetailProduct from '#models/detail_product';
import db from '@adonisjs/lucid/services/db';
import Product from '#models/product';
import User from '#models/user';
import UserStore from '#models/user_store';

export default class DetailProductsController {
    public static async _create_detail(request: HttpContext['request'], { distinct, title, detail, index }: { distinct?: string, images: string, title: string, detail: string, index: number }) {

        const deatil_id = v4();
        const images = await createFiles({
            request,
            column_name: "images",
            table_id: deatil_id,
            table_name: "detail_products",
            distinct: distinct,
            options: {
                throwError: true,
                compress: 'img',
                min: 0,
                max: 7,
                extname: ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'avif', 'apng', 'gif', "jpg", "png", "jpeg", "webp"],
                maxSize: 12 * 1024 * 1024,
            },
        });

        const detailProduct = await DetailProduct.create({
            detail,
            id: deatil_id,
            images: JSON.stringify(images),
            title,
            index
        })
        return {
            ...detailProduct.$attributes,
            images:images,
            id: deatil_id,
        }
    }
    async create_detail({ request }: HttpContext) {
        const { images, title, detail, index } = request.body();
        return DetailProductsController._create_detail(request, { images, title, detail, index: parseInt(index || '0') })
    }

    public static async _get_details({product_id, detail_id}:{product_id:string , detail_id:string}){
        if(!product_id) throw new Error("product_id is Required");
        
        let query = db.query().from(DetailProduct.table).select('*');
        if (detail_id) {
            query.andWhere('detail_id', detail_id).limit(1);
        }
        const details = await query;
        return details.map(d=> DetailProduct.parseDetail(d)); 
    }
    async get_details({request}:HttpContext){
        const {product_id, detail_id} = request.qs();
        return DetailProductsController._get_details({product_id , detail_id})
    }
    public static async _delete_detail({user,detail_id}:{ user:User , detail_id:string}){
        if(!detail_id) throw new Error("deatil_id is Required");
        const detail = await DetailProduct.find(detail_id);
        if(!detail) throw new Error("Detail not found");
        
        const product = await Product.find(detail.product_id);
        if(!product) throw new Error("Product not found");
        
        if(!await UserStore.isStoreManagerOrMore(user.id,product.store_id)) throw new Error("Permission is Required");
        
        if(!product){
            await detail.delete();
        }
         
        return { 
            deleted: detail?.$isDeleted
        }
    }
    async delete_detail({request, auth}:HttpContext){
        const detail_id = request.param('id');
        const user = await auth.authenticate();
        return DetailProductsController._delete_detail({user, detail_id})
    }
}