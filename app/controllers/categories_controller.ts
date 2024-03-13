import Category from '#models/category';
import type { HttpContext } from '@adonisjs/core/http'
import { v4 } from 'uuid';
import { unZipDir } from './Tools/ZipManager/unZipDir.js';
import { deleteFiles } from './Tools/FileManager/DeleteFiles.js';
import { paginate } from './Tools/Utils.js';
import db from '@adonisjs/lucid/services/db';

export default class CategoriesController {

    async create_category({ request }: HttpContext) {
        const { label, index , description , features , catalog_id } = request.body();
        const category_id = v4();
        const category = await Category.create({
            id: category_id,
            label,
            index,
            catalog_id,
            description, 
            status:"PAUSE",
            features : JSON.stringify(features),
        })
        category.id = category_id;
        return category.$attributes
    }

    async update_category({ request }: HttpContext) {
        const body = request.body();
        const attributes = ['label', 'index', 'catalog_id' , 'description'] as const;
        const category = await Category.find(body.category_id);
        if (!category) return 'category not found';
        attributes.forEach((attribute) => {
            //@ts-ignore
            if (body[attribute]) category[attribute] = body[attribute];
        });
        await category.save();
        return category.$attributes
    }

    async update_view_category({ request }: HttpContext) {
        const {category_id} = request.body();
        console.log(category_id);
        
        const category = await Category.find(category_id);

        if (!category)  return "ERROR category not found";
        
        // if (category.account_id !== access.auth_table_id) {
        //   return "ERROR Permission denied";
        // }
        const file  = request.file('scene_dir');
        if(!file) return "scene_dir file not found";
        
        let url = await unZipDir({
            file: file,
            table_name: "categories",
            table_id: category.id,
            column_name: "scene_dir",
        });

        category.scene_dir = url;
        await category.save();
        return category.$attributes; 
    }

    async get_category({ request }: HttpContext) {
        const category_id = request.param('id');
        const category = await Category.find(category_id);
        if(!category) return "ERROR category not found";
        return category.$attributes
    }

    async get_categories({ request }: HttpContext) {
        const {page , limit , catalog_id, index , text} = paginate(request.qs() as  {page:number|undefined,limit:number|undefined,catalog_id:string}&{[k:string]:any});
        let query = db.query().from(Category.table).select('*')
        if(catalog_id){
            query = query.where('catalog_id',catalog_id);
        }
        if(text){
            const like = `%${(text as string).split('').join('%')}%`;
            query = query.andWhere((q)=>{
                q.whereLike('label',like).orWhereLike('description',like)
            })
        }
        if(index){
            query = query.andWhere('index',index);
        }
        query =query.limit(limit).offset((page - 1) * limit).orderBy('index','asc');
        return await query
    }

    async delete_category({ request }: HttpContext) {
        const category_id = request.param('id');
        await deleteFiles(category_id);
        await  (await Category.find(category_id))?.delete();
        return {
            isDeleted: true,
        }
    }
}