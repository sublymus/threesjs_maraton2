import type { HttpContext } from '@adonisjs/core/http'
import User, { USER_STATUS, USER_TYPE } from "#models/user";
// import { create_user_validation } from "App/Validators/AuthValidator";
import { v4 } from "uuid";
import { updateFiles } from './Tools/FileManager/UpdateFiles.js';
import { limitation, paginate } from './Tools/Utils.js';
import db from '@adonisjs/lucid/services/db';
import UserStore from '#models/user_store';
import { setBrowser } from './user_browsers_controller.js';
export default class AuthController {

    public async google_connexion({ ally }: HttpContext) {
        return ally.use("google").redirect();
    }

    public async disconnection({ auth }: HttpContext) {
        const user = await auth.authenticate();
        await User.accessTokens.delete(user, user.currentAccessToken.identifier);
        return {
            disconnection: true
        };
    }
    public async global_disconnection({ request, auth }: HttpContext) {

        const { user_id } = request.qs()
        const user = await auth.authenticate();
        if (user_id /*&& admin / moderator*/) {
            const tagetUser = await User.find(user_id);
            if (!tagetUser) return 'user not found';
            const tokens = await User.accessTokens.all(tagetUser);
            for (const token of tokens) {
                await User.accessTokens.delete(tagetUser, token.identifier);
            }
        } else {
            const tokens = await User.accessTokens.all(user);
            for (const token of tokens) {
                await User.accessTokens.delete(user, token.identifier);
            }
        }
        return {
            disconnection: true,
        }
    }

    public async google_push_info({ ally, response }: HttpContext) {
        const provider = ally.use('google');
        console.log({ google: 'google_push_info' });

        if (provider.accessDenied()) {
            return "google access was denied";
        }
        if (provider.stateMisMatch()) {
            return "google request expired. Retry again";
        }
        if (provider.hasError()) {
            return provider.getError();
        }
        const { id, email, avatarUrl, name } = await provider.user();

        if (!email) {
            return "google request user email";
        }

        let user = await User.findBy("email", email);
        let token: string | undefined;
        let data :any;
        if (user) {

            if (user.status == USER_STATUS.NEW) {
                user.password = id;
                user.photos = JSON.stringify([avatarUrl]);
                user.name = name;
                user.status = USER_STATUS.VISIBLE
                await user.save();
            }
            token = (await User.accessTokens.create(user)).value?.release();
            data = {
                token,
                ...User.ParseUser(user)
            }
            // response
            //     .redirect()
            //     .toPath(`${env.get('FRONT_ORIGINE')}/auth#=${JSON.stringify()
            //         }`);
        } else {
            const user_id = v4();
            user = await User.create({
                id: user_id,
                email,
                name,
                password: id,
                status: USER_STATUS.VISIBLE,
                photos: JSON.stringify([avatarUrl]),
            })
            user.id = user_id;
            user.$attributes.id = user_id;
            //await _create_client( {name, email, password}, auth )
            token = (await User.accessTokens.create(user)).value?.release();
            data = {
                token,
                ...JSON.parse(JSON.stringify({
                    ...user.$attributes,
                    photos: JSON.parse(user.photos || '[]'),
                }))
            }
            // response.redirect().toPath(`${env.get('FRONT_ORIGINE')}/auth#=${JSON.stringify()
            //     }`);
        }

        response.send(`
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        
        <body>
        
            <script type="module">
                const user = ${JSON.stringify(data)}
        
                window.addEventListener('DOMContentLoaded', () => {
                    const u =  JSON.stringify(user);
                    localStorage.setItem('user',u)
                    window.close();
                })
            </script>
        
        </body>
        
        </html>
        `)
    }


    async me({ auth, request }: HttpContext) {
        const user = await auth.authenticate()
        setBrowser(user, request) 
        return {
            ...User.ParseUser(user),
            // token:  request.headers().authorization?.split(' ')[1]
        };
    } 
    async edit_me({ request, auth }: HttpContext) {
        const body = request.body();
        let urls: Record<string, string[]> = {};

        const user = await auth.authenticate();

        (['name', 'phone'] as const).forEach((attribute) => {
            if (body[attribute]) user[attribute] = body[attribute];
        });

        for (const f of (['photos'] as const)) {
            if (body[f]) {
                urls[f] = await updateFiles({
                    request,
                    table_name: "users",
                    table_id: user.id,
                    column_name: f,
                    lastUrls: user[f] || '[]',
                    newPseudoUrls: body[f],
                    options: {
                        throwError: true,
                        min: 1,
                        max: 7,
                        compress: 'img',
                        extname: ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'avif', 'apng', 'gif', "jpg", "png", "jpeg", "webp"],
                        maxSize: 12 * 1024 * 1024,
                    },
                });
                user[f] = JSON.stringify(urls[f]);
            }
        }
        await user.save();
        return {
            ...user.$attributes,
            ...urls
        }
    }

    async get_users({ request, auth }: HttpContext) {
        const user = await auth.authenticate();
        if (!await UserStore.isSublymusManager(user.id)) throw new Error('Permission Required');

        const { page, limit, name, email, phone, user_id, order_by, text } = paginate(request.qs() as { page: number | undefined, limit: number | undefined } & { [k: string]: any });


        let query = db.query().from(User.table).select('*');
        if (user_id) {
            query = query.whereLike('id', `%${user_id}%`);
        } else {
            if (text) {
                if ((text).startsWith('#')) {
                    query = query.whereLike('users.id', `%${text.replaceAll('#', '')}%`);
                } else {
                    query = query.andWhere((q) => {
                        const v = `%${text.split('').join('%')}%`;
                        q.whereLike('email', v).orWhereLike('name', v)
                    });
                }
            } else {
                if (email) {
                    query = query.andWhereLike('email', `%${email.split('').join('%')}%`);
                }
                if (phone) {
                    query = query.andWhereLike('phone', `%${phone.split('').join('%')}%`);
                }
                if (name) {
                    query = query.andWhereLike('name', `%${name.split('').join('%')}%`);
                }
            }
        }

        const users = await limitation(query, page, limit, order_by);

        return {
            ...(users.paging),
            list: (await users.query).map(u => User.ParseUser(u))
        }
    }
    async get_moderators({ request /*, auth*/ }: HttpContext) {
        let { page, limit, name, email, user_id, phone, order_by, text } = paginate(request.qs() as { page: number | undefined, limit: number | undefined } & { [k: string]: any });
        // const user = await auth.authenticate();
        // if (!await UserStore.isSublymusManager(user.id)) throw new Error('Permission Required');

        let query = db.query()
            .from(UserStore.table)
            .select('*')
            .select('user_stores.id as user_store_id')
            .select('user_stores.type as s_type')
            .select('users.created_at as  created_at')
            .select('user_stores.created_at as  join_at')
            .innerJoin(User.table, 'user_id', 'users.id')
            .whereNull('user_stores.store_id')
            .andWhere((p) => {
                p.where('user_stores.type', USER_TYPE.MODERATOR).orWhere('user_stores.type', USER_TYPE.ADMIN)
            });
        if (user_id) {
            query = query.whereLike('users.id', user_id);
        } else {
            if (text) {
                const t = text as string
                const v = `%${t.split('').join('%')}%`;
                if ((t).startsWith('#')) {
                    query = query.whereLike('users.id', `%${t.replaceAll('#', '')}%`);
                } else {
                    query = query.andWhere((q) => {
                        q.whereLike('email', v).orWhereLike('name', v)
                    });
                }
            } else {
                if (email) {
                    query = query.andWhereLike('email', `%${email.split('').join('%')}%`);
                }
                if (phone) {
                    query = query.andWhereLike('phone', `%${phone.split('').join('%')}%`);
                }
                if (name) {
                    query = query.andWhereLike('name', `%${name.split('').join('%')}%`);
                }
            }

        }
        const users = await limitation(query, page, limit, order_by)
        return {
            list: ((await users.query).map(u => User.ParseUser(u))),
            ...users.paging
        };
    }
    async add_moderator({ request, auth }: HttpContext) {
        const { email, role_id } = request.body();

        const user = await auth.authenticate();
        if (!await UserStore.isSublymusManager(user.id)) return 'Permission Required';

        let moderator = await User.findBy('email', email);

        let cid = '';
        if (!moderator) {
            const moderator_id = v4()
            cid = moderator_id;
            moderator = await User.create({
                email,
                id: moderator_id,
                name: 'new Moderator',
                password: moderator_id,
                photos: JSON.stringify(['/public/_user_img.png']),
                status: USER_STATUS.NEW
            });
        } else {
            cid = moderator.id;
            const c_store = (await db.query().from(UserStore.table).select('*').where('user_id', cid).andWhereNull('store_id').andWhere('type', USER_TYPE.MODERATOR).limit(1))[0] as UserStore;
            if (c_store) throw new Error('Moderator is always here');
        }
        // const us = (await UserStore.query().where('email',email).andWhere('type',USER_TYPE.MODERATOR).limit(1))[0];
        // if(us){
        //     return us;
        // }
        const id = v4()
        const userStore = await UserStore.create({
            id,
            roleId: role_id,
            user_id: cid,
            type: USER_TYPE.MODERATOR,
        });

        return {
            ...userStore.$attributes,
            ...User.ParseUser(moderator),
            join_at: userStore.createdAt,
            s_type: userStore.type,
            id: cid
        }
    }
    async remove_moderator({ request, auth }: HttpContext) {
        const { moderator_id } = request.body();
        const user = await auth.authenticate();
        if (!await UserStore.isSublymusManager(user.id)) return 'Permission Required';


        const moderator_store = (await UserStore.query().where('user_id', moderator_id).andWhereNull('store_id').andWhere('type', USER_TYPE.MODERATOR))[0];
        if (!moderator_store) throw new Error('moderator_store');
        await moderator_store.delete();
        return {
            deleted: true
        }
    }
    async can_manage_sublymus({ auth }: HttpContext) {
        const user = await auth.authenticate()
        const userStore = await UserStore.isStoreManagerOrMore(user.id)
        // if (!userStore) throw new Error('Permission Required');
        return userStore && {
            userStore: UserStore.parseUserStore(userStore),
            user: {
                ...User.ParseUser(user),
                token: user.currentAccessToken.value,
            }
        }
    }
}


