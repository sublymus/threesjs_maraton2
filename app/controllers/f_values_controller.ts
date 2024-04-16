import FValue from '#models/f_value';
import type { HttpContext } from '@adonisjs/core/http'
import { v4 } from 'uuid';
import { paginate } from './Tools/Utils.js';
import db from '@adonisjs/lucid/services/db';
import { deleteFiles } from './Tools/FileManager/DeleteFiles.js';
import { createFiles } from './Tools/FileManager/CreateFiles.js';
import { updateFiles } from './Tools/FileManager/UpdateFiles.js';

export default class FValueController {
    async create_f_value({ request }: HttpContext) {
        const { label, key_word, price, url, value , feature_id} = request.body();
        const f_value_id = v4();
        const file_url = await createFiles({
            request,
            column_name: "file",
            table_id: f_value_id,
            table_name: FValue.table,
            options: {
                throwError: true,
                // compress: 'img',
                min: 0,
                max: 1,
                // extname: ["jpg", "jpeg", "webp", 'png'],
                maxSize: 12 * 1024 * 1024,
            },
        });
        const icon_url = await createFiles({
            request,
            column_name: "icon",
            table_id: f_value_id,
            table_name: FValue.table,
            options: {
                throwError: true,
                // compress: 'img',
                min: 0,
                max: 1,
                // extname: ["jpg", "jpeg", "webp", 'png'],
                maxSize: 12 * 1024 * 1024,
            },
        });
        const f_value = await FValue.create({
            id: f_value_id,
            label,
            icon:JSON.stringify(icon_url),
            key_word,
            feature_id,
            price,
            url,
            file:JSON.stringify(file_url),
            value
        })
        f_value.id = f_value_id;
        return f_value.$attributes
    }

    async update_f_value({ request }: HttpContext) {
        const body = request.body();
        const attributes = ['label', 'icon', 'key_word' , 'price','url','value'] as const;
        const filesAttributes = ['file','icon'] as const;
        const f_value = await FValue.find(body.f_value_id);
        if (!f_value) return 'f_value not found';
        attributes.forEach((attribute) => {
            if (body[attribute]) f_value[attribute] = body[attribute];
        });
        for (const filesAttribute of filesAttributes) {
            if (!body[filesAttribute]) continue;
            const urls = await updateFiles({
                request,
                table_name: FValue.table,
                table_id: f_value.id,
                column_name: filesAttribute,
                lastUrls: f_value[filesAttribute],
                newPseudoUrls: body[filesAttribute],
                options: {
                    throwError: true,
                    min: 0,
                    max: 1,
                    // compress: 'img',
                    // extname: ["jpg", "jpeg", "webp"],
                    maxSize: 12 * 1024 * 1024,
                },
            });
            f_value[filesAttribute] = JSON.stringify(urls);
        }
        await f_value.save();
        return f_value.$attributes
    }


    async get_f_value({ request }: HttpContext) {
        const f_value_id = request.param('id');
        const f_value = await FValue.find(f_value_id);
        if(!f_value) return "ERROR f_value not found";
        return f_value.$attributes
    }

    async get_f_values({ request }: HttpContext) {
        const {page , limit , feature_id} = paginate(request.qs() as  {page:number|undefined,limit:number|undefined,catalog_id:string}&{[k:string]:any});
        let query = db.query().from(FValue.table).select('*');
        if(feature_id){
            query = query.where('feature_id',feature_id);
        }
        query =query.limit(limit).offset((page - 1) * limit);
        const total = await db.query().from(FValue.table).select('id');
        return {
            page,
            limit,
            total:total.length,
            list:await query
        }
    }

    async delete_f_value({ request }: HttpContext) {
        const f_value_id = request.param('id');
        await deleteFiles(f_value_id);
        await  (await FValue.find(f_value_id))?.delete();
        return {
            isDeleted: true,
        }
    }
}