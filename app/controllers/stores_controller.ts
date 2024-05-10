import Catalog from '#models/catalog';
import Category from '#models/category';
import Feature from '#models/feature';
import Product from '#models/product'
import Store from '#models/store';
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { v4 } from 'uuid';
import { limitation, paginate } from './Tools/Utils.js';
import { createFiles } from './Tools/FileManager/CreateFiles.js';
import { deleteFiles } from './Tools/FileManager/DeleteFiles.js';
import { updateFiles } from './Tools/FileManager/UpdateFiles.js';
import UserStore from '#models/user_store';
import User, { USER_STATUS, USER_TYPE } from '#models/user';
import Role from '#models/role';




export default class StoresController {
    async create_store({ request, auth }: HttpContext) {
        const { name, description, phone, website, store_email } = request.body();
        const existingStore = await Store.findBy('name', name);

        if (existingStore) {
            return 'This Name is not Avalaible to use'
        }

        const id = v4()

        const user = await auth.authenticate();

        try {

            const imagesUrl = await createFiles({
                request,
                column_name: "banners",
                table_id: id,
                table_name: "stores",
                options: {
                    throwError: true,
                    compress: 'img',
                    min: 1,
                    max: 1,
                    extname: ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'avif', 'apng', 'gif', "jpg", "png", "jpeg", "webp"],
                    maxSize: 12 * 1024 * 1024,
                },
            });
            const store = await Store.create({
                description,
                id,
                name,
                owner_id: user.id,
                banners: JSON.stringify(imagesUrl),
                phone,
                website,
                store_email
                // address_id
                // interface_id
            })
            const user_store_id = v4();
            await UserStore.create({
                id: user_store_id,
                user_id: user.id,
                store_id: id,
                type: USER_TYPE.OWNER
            })

            return {
                ...Store.ParseStore(store),
                id,
            }
        } catch (error) {
            deleteFiles(id);
            console.log(error);

            return error.message
        }
    }
    async update_store({ request, auth }: HttpContext) {
        const body = request.body();

        const user = await auth.authenticate();
        const store = await Store.find(body.store_id);

        if (store?.owner_id != user.id) return 'Permission deined';

        ['name', 'description', 'phone', 'website', 'store_email'].forEach((a => (store as any)[a] = body[a]));
        let urls: any = []
        for (const f of ['banners'] as const) {
            if (!body[f]) continue;

            urls = await updateFiles({
                request,
                table_name: "stores",
                table_id: store.id,
                column_name: f,
                lastUrls: store[f],
                newPseudoUrls: body[f],
                options: {
                    throwError: false,
                    min: 1,
                    max: 7,
                    compress: 'img',
                    extname: ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'avif', 'apng', 'gif', "jpg", "png", "jpeg", "webp"],
                    maxSize: 12 * 1024 * 1024,
                },
            });
            store[f] = JSON.stringify(urls);
        }
        await store.save();

        return Store.ParseStore(store);
    }

    async get_stores({ request, auth }: HttpContext) {
        let { page, limit, name, email, description, owner_id, phone, order_by } = paginate(request.qs() as { page: number | undefined, limit: number | undefined } & { [k: string]: any });
        const user = await auth.authenticate();
        // if(user.type !=  USER_TYPE.MODERATOR) return;
        let query = db.query().from(Store.table).select('*').select('users.created_at as user_created_at').leftJoin('users', 'users.id', 'owner_id');

        if (owner_id) {
            query = query.where('owner_id', owner_id);
        } else {
            const p = UserStore.isAdmin(user.id)
        }
        if (phone) {
            const like = `%${(phone as string).split('').join('%')}%`;
            query = query.andWhereLike('stores.phone', like);
        }
        if (name) {
            const like = `%${(name as string).split('').join('%')}%`;
            query = query.andWhereLike('stores.name', like);
        }
        if (email) {
            const like = `%${(email as string).split('').join('%')}%`;
            query = query.andWhereLike('users.email', like);
        }
        if (description) {
            const like = `%${(description as string).split('').join('%')}%`;
            query = query.andWhereLike('stores.description', like);
        }
        const stores = await limitation(query, page, limit, order_by)
        return {
            list: ((await stores.query).map(s => Store.ParseStore(s))),
            ...stores.paging
        }
    }

    async owner_stores({ auth }: HttpContext) {
        const user = await auth.authenticate();
        const stores = await db.query().from('stores').select('stores.*').where('owner_id', user.id)
        return stores.map(s => Store.ParseStore(s))
    }

    async get_store_collaborators({ request }: HttpContext) {
        let { page, limit, name, email, user_id, phone, order_by, store_id, text, } = paginate(request.qs() as { page: number | undefined, limit: number | undefined } & { [k: string]: any });
        // const user = await auth.authenticate();
        // permision store_owner | store_collaborator | moderator | admin 
        let query = db.query()
            .from(UserStore.table)
            .select('*')
            .select('user_stores.type as s_type')
            .select('users.created_at as  created_at')
            .select('user_stores.created_at as  join_at')
            .innerJoin(User.table, 'user_id', 'users.id')
            .where('store_id', store_id)
            .andWhere((p) => {
                p.where('user_stores.type', USER_TYPE.COLLABORATOR).orWhere('user_stores.type', USER_TYPE.OWNER)
            });

        if (user_id) {
            query = query.whereLike('id', `%${user_id}%`);
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
        }
    }

    async get_store_by_name({ request }: HttpContext) {
        return await Store.findBy('name', request.param('name'))
    }

    async get_store_clients({ request, auth }: HttpContext) {
        let { page, limit, name, email, user_id, phone, order_by, store_id, text, } = paginate(request.qs() as { page: number | undefined, limit: number | undefined } & { [k: string]: any });
        // const user = await auth.authenticate();
        // permision store_owner | store_collaborator | moderator | admin 
        let query = db.query()
            .from(UserStore.table)
            .select('*')
            .select('users.type as u_type')
            .innerJoin(User.table, 'user_id', 'users.id')
            .where('store_id', store_id)
            .where('user_stores.type', USER_TYPE.CLIENT);

        if (user_id) {
            query = query.whereLike('id', `%${user_id}%`);
        } else {
            if (text) {
                const v = `%${text.split('').join('%')}%`
                query = query.andWhere((q) => {
                    q.whereLike('phone', v).orWhereLike('phone', v).orWhereLike('name', v)
                });
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
        }
    }

    async add_collaborator({ request, auth }: HttpContext) {
        const { email, role_id, store_id } = request.body();

        console.log(request.body());

        const user = await auth.authenticate();
        const user_store = (await db.query().from(UserStore.table).select('*').where('user_id', user.id).andWhere('store_id', store_id).whereNot((p) => p.where('type', 'CLIENT')))[0] as UserStore;
        if (!user_store) return;

        let collaborator = await User.findBy('email', email);

        let cid = '';
        if (!collaborator) {
            const collaborator_id = v4()
            cid = collaborator_id;
            collaborator = await User.create({
                email,
                id: collaborator_id,
                name: 'new Collaborator',
                password: collaborator_id,
                photos: JSON.stringify(['/public/_user_img.png']),
                status: USER_STATUS.NEW
            });
        } else {
            cid = collaborator.id;
            const c_store = (await db.query().from(UserStore.table).select('*').where('user_id', cid).andWhere('store_id', store_id).andWhere('type', USER_TYPE.COLLABORATOR))[0] as UserStore;
            if (c_store) return console.log('Collaboratore is always here');

        }
        const id = v4()
        const userStore = await UserStore.create({
            id,
            roleId: role_id,
            store_id: store_id,
            user_id: cid,
            type: USER_TYPE.COLLABORATOR,
        });

        return {
            ...userStore.$attributes,
            id
        }
    }
    async remove_collaborator({ request, auth }: HttpContext) {
        const { store_id, collaborator_id } = request.body();
        console.log({ store_id, collaborator_id });

        const user = await auth.authenticate();
        const user_store = (await db.query().from(UserStore.table).select('*').where('user_id', user.id).andWhere('store_id', store_id).whereNot((p) => p.where('type', 'CLIENT')))[0] as UserStore;
        if (!user_store) return console.log('user_store');
        ;

        const collaborator_store = (await db.query().from(UserStore.table).select('*').where('user_id', collaborator_id).andWhere('store_id', store_id).andWhere('type', USER_TYPE.COLLABORATOR))[0];
        if (!collaborator_store) return console.log('collaborator_store');
        if (collaborator_store.type == USER_TYPE.OWNER) return console.log('Owner connot be removed');

        const clst = await UserStore.find(collaborator_store.id);
        await clst?.delete();
        console.log('delete');

        return {
            deleted: true
        }
    }
    async can_manage_store({ request, auth }: HttpContext) {
        const { att } = request.params();
        const user = await auth.authenticate()
        const store = (await db.query().from(Store.table).select('*').where('id', att).orWhere('name', att).limit(1))[0] as Store | undefined;
        if (!store) return 'Store not found';
        const userStore = (await db.query().from(UserStore.table).select('*').where('user_id', user.id).andWhere('store_id', store.id).andWhere((qr) => {
            qr.where('type', USER_TYPE.OWNER).orWhere('type', USER_TYPE.COLLABORATOR)
        }).limit(1))[0] as UserStore | undefined

        // user
        return userStore && {
            userStore,
            user: {
                ...User.ParseUser(user),
                token: user.currentAccessToken.value
            },
            store: Store.ParseStore(store)
        }
    }
    async can_use_store({ request, auth }: HttpContext) {
        const { att } = request.params();

        const user = await auth.authenticate()
        const store = (await db.query().from(Store.table).select('*').where('id', att).orWhere('name', att).limit(1))[0] as Store | undefined;
        if (!store) return 'Store not found';
        let userStore = (await db.query().from(UserStore.table).select('*').where('user_id', user.id).andWhere('store_id', store.id).andWhere((qr) => {
            qr.where('type', USER_TYPE.CLIENT).orWhere('type', USER_TYPE.COLLABORATOR)
        }).limit(1))[0] as UserStore | undefined

        if (!userStore) {
            console.log('EROORORORE ________');

            userStore = await UserStore.create({
                user_id: user.id,
                store_id: store.id,
                type: USER_TYPE.CLIENT
            })
        }

        return userStore && {
            userStore,
            user: {
                ...User.ParseUser(user),
                token: user.currentAccessToken.value
            },
            store: Store.ParseStore(store)
        }
    }
    async delete_store({ request, auth }: HttpContext) {
        try {
            const user = await auth.authenticate();

            // Find the store
            const s = await Store.find(request.param('id'));
            if (!s) {
                throw new Error('Store not found');
            }

            // Check if the authenticated user is the owner of the store
            if (s.owner_id !== user.id) {
                throw new Error('Permission denied');
            }

            // Delete the store
            await s.delete();

            // Delete associated user store record
            const userStore = await UserStore.query()
                .where('user_id', user.id)
                .where('store_id', s.id)
                .where('type', USER_TYPE.OWNER)
                .first();

            if (userStore) {
                await userStore.delete();
            }

            return { deleted: true };
        } catch (error) {
            console.log(error);

            return { error: error.message };
        }
    }

    async get_store_var({ }: HttpContext) {
        const products = (await db.from(Product.table).count('id as count'))[0]?.count;
        const catalogs = (await db.from(Catalog.table).count('id as count'))[0]?.count;
        const categories = (await db.from(Category.table).count('id as count'))[0]?.count;
        const features = (await db.from(Feature.table).count('id as count'))[0]?.count;
        return {
            products,
            categories,
            catalogs,
            features
        }
    }

    async get_users_var({ request }: HttpContext) {
        const { store_id } = request.qs();

        if (!store_id) return 'store_id is required';
        const roles = (await db.from(Role.table).where('store_id', store_id).count('id as count'))[0]?.count;
        const collaborators = (await db.from(UserStore.table).where('store_id', store_id).andWhere((qr) => {
            qr.where('type', USER_TYPE.OWNER).orWhere('type', USER_TYPE.COLLABORATOR)
        }).count('id as count'))[0]?.count;
        const clients = (await db.from(UserStore.table).where('store_id', store_id).andWhere('type', USER_TYPE.CLIENT).count('id as count'))[0]?.count;

        return {
            roles,
            collaborators,
            clients
        }
    }


}