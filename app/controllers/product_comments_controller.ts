import Product from '#models/product';
import ProductComment from '#models/product_comment'
import type { HttpContext } from '@adonisjs/core/http'
import { createFiles } from './Tools/FileManager/CreateFiles.js';
import db from '@adonisjs/lucid/services/db';
import { limitation } from './Tools/Utils.js';
import UserStore from '#models/user_store';
import User from '#models/user';

export default class ProductCommentsController {

    async create_product_comment({ request, auth }: HttpContext) {
        const { product_id, text, note } = request.body()

        const user = await auth.authenticate();

        const product = await Product.find(product_id);
        if (!product) throw new Error("Product not Found");

        // const existComment =( await ProductComment.query().where('user_id', user.id).andWhere('product_id', product.id).limit(1))[0];
        // if(existComment) throw new Error('You have already commented on this product');

        // const command = (await Command.query().where('user_id',user.id).andWhere('product_id',product.id).limit(1))[0]
        // if(!command?.payment_id)  throw new Error('Comments are allowed after purchasing the product');

        const photos = await createFiles({
            request,
            column_name: "photos",
            table_id: product_id,
            table_name: "product_comments",
            options: {
                throwError: true,
                min: 0,
                max: 5,
                extname: ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'avif', 'apng', 'gif', "jpg", "png", "jpeg", "webp"],
                maxSize: 12 * 1024 * 1024,
            },
        });
        const videos = await createFiles({
            request,
            column_name: "videos",
            table_id: product_id,
            table_name: "product_comments",
            options: {
                throwError: true,
                min: 0,
                max: 2,
                maxSize: 12 * 1024 * 1024,
            },
        });

        console.log({
            videos,
            photos
        });


        const newComment = await ProductComment.create({
            note,
            photos: JSON.stringify(photos),
            photos_count: photos.length || 0,
            product_id,
            // response,
            user_id: user.id,
            videos: JSON.stringify(videos),
            videos_count: videos.length || 0,
            text
        })

        return ProductComment.parseComment(newComment)

    }
    async get_product_comments_files({ request }: HttpContext) {
        const { product_id, page, limit } = request.qs()
        let query = db.query().from(ProductComment.table)
        if (product_id) {
            query = query.andWhere('product_id', product_id)
        }
        const l = await limitation(query, page, limit);
        const parsedComments = (await l.query).map((p) => ProductComment.parseComment(p));
        for (const comment of parsedComments as any[]) {
            try {
                const u = await User.find(comment.user_id);
                u && (comment.user = User.ParseUser(u.$attributes))
            } catch (error) { }
        }
        return {
            ...l.paging,
            list: parsedComments,
        }
    }
    async get_comment_index({ request }: HttpContext) {
        let { comment_id, product_id, move } = request.qs()
        const all = (await db.query()
            .where('product_id', product_id)
            .from(ProductComment.table)
            .where(q => {
                q.where('photos_count', '>', 0).orWhere('videos_count', '>', 0)
            }).sum('photos_count', 'photos').sum('videos_count', 'videos'))[0];
        let befor;
        let comment;
        if(!comment_id){
            comment_id  = (await db.query()
            .from(ProductComment.table)
            .where('product_id', product_id)
            .where(q => {
                q.where('photos_count', '>', 0).orWhere('videos_count', '>', 0)
            }).orderBy('created_at', 'desc').limit(1))[0]?.id||0;
        }
        if (move == 'back') {

            comment = (await db.query()
                .from(ProductComment.table)
                .where('product_id', product_id)
                .where('id', '>', comment_id)
                .where(q => {
                    q.where('photos_count', '>', 0).orWhere('videos_count', '>', 0)
                }).orderBy('created_at', 'asc').limit(1))[0];
            if (comment) {

                befor = (await db.query()
                    .from(ProductComment.table)
                    .where('product_id', product_id)
                    .where('id', '>', comment.id)
                    .where(q => {
                        q.where('photos_count', '>', 0).orWhere('videos_count', '>', 0)
                    }).sum('photos_count', 'photos').sum('videos_count', 'videos'))[0];

                const u = await User.find(comment.user_id);
                u && (comment.user = User.ParseUser(u.$attributes))
            }
        } else if (move == 'next') {
            comment = (await db.query()
                .from(ProductComment.table)
                .where('product_id', product_id)
                .where('id', '<', comment_id)
                .where(q => {
                    q.where('photos_count', '>', 0).orWhere('videos_count', '>', 0)
                }).orderBy('created_at', 'desc').limit(1))[0];
            if (comment) {
                befor = (await db.query()
                    .from(ProductComment.table)
                    .where('product_id', product_id)
                    .where('id', '>', comment.id)
                    .where(q => {
                        q.where('photos_count', '>', 0).orWhere('videos_count', '>', 0)
                    }).sum('photos_count', 'photos').sum('videos_count', 'videos'))[0];


                const u = await User.find(comment.user_id);
                u && (comment.user = User.ParseUser(u.$attributes))
            }
        } else {
            comment = (await db.query()
            .from(ProductComment.table)
            .where('product_id', product_id)
            .andWhere('id',comment_id??0).limit(1))[0];
            if (comment) {
                befor = (await db.query()
                    .from(ProductComment.table)
                    .where('product_id', product_id)
                    .where('id', '>', comment_id)
                    .where(q => {
                        q.where('photos_count', '>', 0).orWhere('videos_count', '>', 0)
                    }).sum('photos_count', 'photos').sum('videos_count', 'videos'))[0];

                const u = await User.find(comment.user_id);
                u && (comment.user = User.ParseUser(u.$attributes))
            }

        }

        return {
            total: all ? ((all.photos || 0) + (all.videos || 0)):0,
            befor: befor ? ((befor.photos || 0) + (befor.videos || 0)):0,
            comment: comment && ProductComment.parseComment(comment)
        }



    }
    async get_product_comments({ request, auth }: HttpContext) {
        const { order_by, first_index, comment_id, with_photo_or_video, with_photo, with_video, user_id, product_id, page, limit } = request.qs()

        let query = db.query().from(ProductComment.table)
        if (comment_id) {
            query = query.andWhere('id', comment_id)
        }
        if (with_photo == 'true' || with_photo == true) {
            query = query.andWhere('photos_count', '>', 0)
        }
        if (with_video == 'true' || with_video == true) {
            query = query.andWhere('videos_count', '>', 0)
        }
        if (with_photo_or_video) {
            query = query.andWhere('photos_count', '>', 0).orWhere('videos_count', '>', 0)
        }
        if (user_id) {
            const user = await auth.authenticate()
            if (await UserStore.isSublymusManager(user.id)) {
                query = query.andWhere('user_id', user_id)
            }
        }
        if (product_id) {
            query = query.andWhere('product_id', product_id)
        }
        const l = await limitation(query, page, limit, order_by);
        const parsedComments = (await l.query).map((p) => ProductComment.parseComment(p));
        for (const comment of parsedComments as any[]) {
            try {
                const u = await User.find(comment.user_id);
                u && (comment.user = User.ParseUser(u.$attributes))
            } catch (error) { }
        }
        let d
        if (product_id && (first_index == 'true' || first_index == true) && parsedComments[0].id) {

            const a = (await db.query()
                .from(ProductComment.table).where('product_id', product_id)
                .where('id', '>', parsedComments[0].id).where(q => {
                    q.where('photos_count', '>', 0).orWhere('videos_count', '>', 0)
                }).sum('photos_count', 'photos').sum('videos_count', 'videos').count('id', 'count').orderBy('created_at', 'desc'))[0];
            const b = (await db.query().where('product_id', product_id)
                .from(ProductComment.table).where('photos_count', '>', 0).orWhere('videos_count', '>', 0).sum('photos_count', 'photos').sum('videos_count', 'videos').count('id', 'count'))[0];
            d = {
                all: {
                    sum: (b.photos || 0) + (b.videos || 0),
                    count: (b.count || 0),
                    photos: (b.photos || 0),
                    videos: (b.videos || 0),
                },
                befor: {
                    sum: (a.photos || 0) + (a.videos || 0),
                    count: (a.count || 0),
                    photos: (a.photos || 0),
                    videos: (a.videos || 0),
                },
            }
            console.log(parsedComments[0].id, d);

        }
        return {
            ...l.paging,
            index: d,
            list: parsedComments,
        }
    }
    async edit_product_comment_text({ request, auth }: HttpContext) {
        const { product_comment_id, text } = request.body();
        if (!text.trim()) throw new Error("Text is required");

        const comment = await ProductComment.find(product_comment_id || '')
        if (!comment) throw new Error("Product Comment Not Found");
        const user = await auth.authenticate();
        if (user.id != comment.user_id) throw new Error("Permission Required");
        comment.text = text.trim();
        await comment.save()
        const comment_user = await User.find(comment.user_id);
        return {
            ...ProductComment.parseComment(comment),
            user: comment_user && User.ParseUser(comment_user)
        }
    }
    async set_product_comment_response({ request, auth }: HttpContext) {
        const { product_comment_id, response } = request.body();
        const comment = await ProductComment.find(product_comment_id || '')
        if (!comment) throw new Error("Product Comment Not Found");
        const user = await auth.authenticate();
        const product = await Product.find(comment.product_id);
        if (!product) throw new Error("Product not found for comment");
        if (! await UserStore.isStoreManagerOrMore(user.id, product.store_id)) throw new Error("Permission Required");
        comment.response = response.trim() || '';
        await comment.save()
        const comment_user = await User.find(comment.user_id)
        return {
            ...ProductComment.parseComment(comment),
            user: comment_user && User.ParseUser(comment_user)
        }
    }
    async delete_product_comment({ request, auth }: HttpContext) {
        const comment_id = request.param('id');
        const comment = await ProductComment.find(comment_id || '')
        if (!comment) throw new Error("Product Comment Not Found");
        const user = await auth.authenticate();
        if (user.id != comment.user_id) {
            const product = await Product.find(comment.product_id);
            if (!product) throw new Error("Product not found for comment");
            if (! await UserStore.isStoreManagerOrMore(user.id, product.store_id)) throw new Error("Permission Required");
        }
        await comment.delete();
        return {
            deleted: comment.$isDeleted
        }
    }
}