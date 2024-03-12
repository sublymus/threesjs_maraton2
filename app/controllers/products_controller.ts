import Product from '#models/product';
import type { HttpContext } from '@adonisjs/core/http'
import { v4 } from "uuid";

export default class ProductsController {
    async create_product({ request }: HttpContext) {
        const { title, description, features, images, model_images , price, stock , category , is_dynamic_price} = request.body();
        console.log(request.body());
        
        const id=v4()
        const product = await Product.create({
            id,
            title,
            description,
            features,
            images,
            model_images,
            status:Product.STATUS['0'],
            is_dynamic_price,
            stock,
            category,
            price,
            collaborator_id:v4(),
            store_id:v4(),
        })
        return product;
    }
}