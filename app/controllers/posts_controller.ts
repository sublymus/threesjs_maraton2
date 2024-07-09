import Post from '#models/post';
import type { HttpContext } from '@adonisjs/core/http'
import transmit from '@adonisjs/transmit/services/main';
import { v4 } from 'uuid';
import { createFiles } from './Tools/FileManager/CreateFiles.js';
import UserStore from '#models/user_store';
import db from '@adonisjs/lucid/services/db';
import { limitation } from './Tools/Utils.js';

export default class PostsController {
    async create_post({ request, auth }: HttpContext) {
        const { context_name, context_id, reply_id, reply_name, title, subject,message, type, close } = request.body();
        const user = await auth.authenticate();
        const id = v4();
        const files = await createFiles({
            request,
            column_name: 'files',
            table_id: id,
            table_name: 'posts',
            options: {
                throwError: true
            }
        });
        const post = await Post.create({
            id,
            close: close && Number(close),
            context_id,
            context_name,
            files: JSON.stringify(files),
            reply_id,
            reply_name,
            message,
            title,
            subject,
            type:type && Number(type),
            user_id: user.id,
        });
        const newPost = {
            ...Post.parsePost(post),
            // files,
            id
        }

        transmit.broadcast(`${context_name + (context_id || '')}`, { newPost })

        return newPost
    }
    async get_posts({ request }: HttpContext) {
        const {page, limit, order_by, context_id, context_name, reply_id, reply_name, post_id, title, message/* , user_name, user_email */, type, subject, close } = request.qs();
        let query = db.query()
            .from(Post.table)
            .select('*');
        if (post_id) {
            return (await query.where('id', post_id)).map(p => Post.parsePost(p));
        }

        if (context_id) {
            query = query.andWhere('context_id', context_id)
        }
        if (context_name) {
            query = query.andWhere('context_name', context_name)
        }
        if (reply_id) {
            query = query.andWhere('reply_id', reply_id)
        }
        if (reply_name) {
            query = query.andWhere('reply_name', reply_name)
        } if (title) {
            query = query.andWhere('title', `%${title}%`)
        }
        if (message) {
            query = query.andWhere('message', `%${message}%`)
        }
        // if (user_name) {
        //     query = query.andWhere('user_name', `%${user_name}%`)
        // }
        // if (user_email) {
        //     query = query.andWhere('user_email', `%${user_email}%`)
        // }
        if (type) {
            query = query.andWhere('type', `%${type}%`)
        }
        if (subject != undefined) {
            query = query.andWhere('subject', `%${subject}%`)
        }
        if (type) {
            query = query.andWhere('type', type)
        }
        if (close) {
            query = query.andWhere('close', close)
        }
        const l = await limitation(query,page,limit, order_by)
        return {
            ...l.paging,
            list:(await l.query).map(p=>Post.parsePost(p)),
        }
    }
    async delete_post({ request, auth }: HttpContext) {
        const post_id = request.param('id');
        const user = await auth.authenticate();

        const post = await Post.findOrFail(post_id);

        if ((user.id == post.user_id) || await UserStore.isSublymusManager(user.id)) {
            await post.delete();
        }

        return {
            delete: post.$isDeleted
        }
    }
}