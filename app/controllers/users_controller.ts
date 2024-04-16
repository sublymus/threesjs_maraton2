import User from '#models/user';
import type { HttpContext } from '@adonisjs/core/http'
import { updateFiles } from './Tools/FileManager/UpdateFiles.js';

export default class UsersController {

    
    me({}:HttpContext){
        
        return{
            good:'connexion'
        }
    }
    async edit_me({request}:HttpContext){
        const body = request.body();
       let urls :Record<string,string[]> ={};
        
        const user = await User.find(body.id);

        if (!user) {
            return "ERROR User not found";
        }
        (['full_name'] as const).forEach((attribute) => {
            if (body[attribute]) user[attribute] = body[attribute];
        });
        
        for (const f of (['photos'] as const)) {
            urls[f] = await updateFiles({
                request,
                table_name: "users",
                table_id: user.id,
                column_name: f,
                lastUrls: user[f]||'[]',
                newPseudoUrls: body[f],
                options: {
                    throwError: true,
                    min: 1,
                    max: 7,
                    compress: 'img',
                    extname: ['jpg','jpeg','jfif','pjpeg','pjp','avif','apng','gif',"jpg","png", "jpeg", "webp"],
                    maxSize: 12 * 1024 * 1024,
                },
            });
            user[f] = JSON.stringify(urls[f]);
        }
        await user.save();
        return {
            ...user.$attributes,
            ...urls
        }
    }
    
    detail_all_user({}:HttpContext){

        return{
            good:'connexion'
        }
    }
    user({}:HttpContext){

        return{
            good:'connexion'
        }
    }
}