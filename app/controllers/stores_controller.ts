import Catalog from '#models/catalog';
import Category from '#models/category';
import Feature from '#models/feature';
import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class StoresController {
    async create_store ({}:HttpContext){
        
    }
    async update_store ({}:HttpContext){
        
    }
    async get_store ({}:HttpContext){
        
    }
    async get_stores ({}:HttpContext){
        
    }
    async delete_store ({}:HttpContext){
        
    }
    async get_store_var ({}:HttpContext){
        
        const products =(await db.from(Product.table).count('id as count'))[0]?.count;
        const catalogs =(await db.from(Catalog.table).count('id as count'))[0]?.count;
        const categories =(await db.from(Category.table).count('id as count'))[0]?.count;
        const features =(await db.from(Feature.table).count('id as count'))[0]?.count;

        console.log({
            products,
            categories,
            catalogs,
            features
        });
        
        return {
            products,
            categories,
            catalogs,
            features
        }
    }
}