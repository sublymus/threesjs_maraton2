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
import Discussion from '#models/discussion';
import { DateTime } from 'luxon';
import Message from '#models/message';

export default class StoresController {
    async create_store({ request, auth }: HttpContext) {
        const { name, description, phone, website, store_email } = request.body();
        const existingStore = await Store.findBy('name', name);

        if (existingStore) {
            return 'This Name is not Avalaible to use'
        }

        const id = v4()

        const user = await auth.authenticate();
        let store: Store | null = null;
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
            const logo = await createFiles({
                request,
                column_name: "logo",
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
            store = await Store.create({
                description,
                id,
                name: name.trim().toLocaleLowerCase().replaceAll(' ', '_'),
                owner_id: user.id,
                banners: JSON.stringify(imagesUrl),
                phone,
                website,
                logo: JSON.stringify(logo),
                store_email
                // address_id
                // interface_id
            })
            const user_store_id = v4();
            const user_store = await UserStore.create({
                id: user_store_id,
                user_id: user.id,
                store_id: id,
                type: USER_TYPE.OWNER
            })
            await populateStore({ ...store.$attributes, id } as Store, user);
            return {
                ...Store.ParseStore(store),
                user_store,
                id,
            }
        } catch (error) {
            deleteFiles(id);
            console.log(error);
            await store?.delete();
            return error.message;
        }
    }

    async update_store({ request, auth }: HttpContext) {
        const body = request.body();

        const user = await auth.authenticate();
        const store = await Store.find(body.store_id);

        if (store?.owner_id != user.id) return 'Permission deined';
        if (body.name) body.name = body.name.trim().toLocaleLowerCase().replaceAll(' ', '_');
        ['name', 'description', 'phone', 'website', 'store_email'].forEach((a => (store as any)[a] = body[a]));
        let urls: any = []
        for (const f of ['banners', 'logo'] as const) {
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
                    max: 1,
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
        let { page, limit, text, name, email, description, owner_id, phone, order_by } = paginate(request.qs() as { page: number | undefined, limit: number | undefined } & { [k: string]: any });
        const user = await auth.authenticate();

        let query = db.query()
            .from(Store.table)
            .select('*')
            .select('stores.id as id')
            .select('stores.name as name')
            .select('users.name as owner_name')
            .select('users.id as owner_id')
            .select('users.email as owner_email')
            .select('users.created_at as user_created_at')
            .leftJoin('users', 'users.id', 'owner_id');

        if (owner_id) {
            query = query.where('owner_id', owner_id);
        } else {
            const p = await UserStore.isSublymusManager(user.id)
            if (!p) throw new Error('Permission Required');
            ;
        }
        if (text) {
            const like = `%${(text as string).trim()}%`;
            if ((text as string).trim().startsWith('#')) {
                query = query.andWhereLike('stores.id', like.replaceAll('#', ''));
            } else {
                query = query.andWhere((q) => {
                    q.whereLike('stores.name', like.toLocaleLowerCase().replaceAll(' ', '_'))
                        .orWhereLike('users.name', like)
                        .orWhereLike('users.email', like)
                        .orWhereLike('stores.store_email', like);
                });
            }
        }
        if (phone) {
            const like = `%${(phone as string).trim().split('').join('%')}%`;
            query = query.andWhereLike('stores.phone', like);
        }
        if (name) {
            const like = `%${(name as string).trim().split('').join('%')}%`;
            query = query.andWhereLike('stores.name', like.toLocaleLowerCase().replaceAll(' ', '_'));
        }
        if (email) {
            const like = `%${(email as string).trim().split('').join('%')}%`;
            query = query.andWhereLike('users.email', like);
        }
        if (description) {
            const like = `%${(description as string).trim().split('').join('%')}%`;
            query = query.andWhereLike('stores.description', like);
        }
        const stores = await limitation(query, page, limit, order_by)
        const l = ((await stores.query).map(s => Store.ParseStore(s)));

        return {
            list: l,
            ...stores.paging
        }
    }

    async owner_stores({ auth }: HttpContext) {
        const user = await auth.authenticate();
        const stores = await db.query().from('stores').select('stores.*').where('owner_id', user.id)
        return stores.map(s => Store.ParseStore(s))
    }

    async get_store_collaborators({ request, auth }: HttpContext) {
        let { page, limit, name, email, user_id, phone, order_by, store_id, text, } = paginate(request.qs() as { page: number | undefined, limit: number | undefined } & { [k: string]: any });
        const user = await auth.authenticate();
        if (!await UserStore.isStoreManagerOrMore(user.id, store_id)) throw new Error('Permission Required');
        let query = db.query()
            .from(UserStore.table)
            .select('*')
            .select('user_stores.id as user_store_id')
            .select('user_stores.type as s_type')
            .select('users.created_at as  created_at')
            .select('user_stores.created_at as  join_at')
            .innerJoin(User.table, 'user_id', 'users.id')
            .where('store_id', store_id)
            .andWhere((p) => {
                p.where('user_stores.type', USER_TYPE.COLLABORATOR).orWhere('user_stores.type', USER_TYPE.OWNER)
            });

        if (user_id) {
            query = query.whereLike('users.id', `%${user_id}%`);
        } else {
            if (text) {
                const t = text as string
                const v = `%${t.trim().split('').join('%')}%`;
                if ((t).startsWith('#')) {
                    query = query.whereLike('users.id', `%${t.replaceAll('#', '')}%`);
                } else {
                    query = query.andWhere((q) => {
                        q.whereLike('email', v).orWhereLike('name', v)
                    });
                }
            } else {
                if (email) {
                    query = query.andWhereLike('email', `%${email.trim().split('').join('%')}%`);
                }
                if (phone) {
                    query = query.andWhereLike('phone', `%${phone.trim().split('').join('%')}%`);
                }
                if (name) {
                    query = query.andWhereLike('name', `%${name.trim().split('').join('%')}%`);
                }
            }

        }

        const users = await limitation(query, page, limit, order_by)
        return {
            list: ((await users.query).map(u => User.ParseUser(u))),
            ...users.paging
        };
    }

    async get_store_by_name({ request }: HttpContext) {
        const s = await Store.findBy('name', request.param('name'));
        if(!s) return null
        return Store.ParseStore(s)
    }

    async get_store_clients({ request, auth }: HttpContext) {
        let { page, limit, name, email, user_id, phone, order_by, store_id, text, } = paginate(request.qs() as { page: number | undefined, limit: number | undefined } & { [k: string]: any });
        const user = await auth.authenticate();
        if (!await UserStore.isStoreManagerOrMore(user.id, store_id)) return 'Permission Required';
        let query = db.query()
            .from(UserStore.table)
            .select('*')
            .select('user_stores.id as user_store_id')
            .select('user_stores.type as s_type')
            .select('users.created_at as  created_at')
            .select('user_stores.created_at as  join_at')
            .innerJoin(User.table, 'user_id', 'users.id')
            .where('store_id', store_id)
            .where('user_stores.type', USER_TYPE.CLIENT);

        if (user_id) {
            query = query.whereLike('users.id', `%${user_id}%`);
        } else {
            if (text) {
                const v = `%${text.split('').join('%')}%`
                query = query.andWhere((q) => {
                    q.whereLike('email', v).orWhereLike('name', v)
                });
            } else {
                if (email) {
                    query = query.andWhereLike('email', `%${email.split('').join('%')}%`);
                }
                if (phone) {
                    // query = query.andWhereLike('phone', `%${phone.split('').join('%')}%`);
                }
                if (name) {
                    query = query.andWhereLike('name', `%${name.split('').join('%')}%`);
                }
            }

        }

        const users = await limitation(query, page, limit, order_by)

        return {
            ...users.paging,
            list: ((await users.query).map(u => User.ParseUser(u))),
        }
    }

    async add_collaborator({ request, auth }: HttpContext) {
        const { email, role_id, store_id } = request.body();

        const user = await auth.authenticate();
        if (!await UserStore.isStoreManagerOrMore(user.id, store_id)) return 'Permission Required';

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
        const us = (await UserStore.query().join(User.table, 'user_id', 'users.id').where('email', email).andWhere('user_stores.type', USER_TYPE.COLLABORATOR).limit(1))[0];
        if (us) {
            return us;
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
        const user = await auth.authenticate();
        if (!await UserStore.isStoreManagerOrMore(user.id, store_id)) return 'Permission Required';


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
        if (!store) throw new Error('Store not found');

        const userStore = await UserStore.isStoreManagerOrMore(user.id, store.id)
        // user
        return userStore && {
            userStore: UserStore.parseUserStore(userStore),
            user: {
                ...User.ParseUser(user),
                token: user.currentAccessToken.value,
            },
            store: Store.ParseStore(store)
        }
    }
    async can_use_store({ request, auth }: HttpContext) {
        const { att } = request.params();

        const user = await auth.authenticate()
        const store = (await db.query().from(Store.table).select('*').where('id', att).orWhere('name', att).limit(1))[0] as Store | undefined;
        if (!store) return 'Store not found';
        let userStore = (await db.query().from(UserStore.table).select('*').where('user_id', user.id).andWhere('store_id', store.id).andWhere('type', USER_TYPE.CLIENT).limit(1))[0] as UserStore | undefined

        if (!userStore) {
            userStore = await UserStore.create({
                user_id: user.id,
                store_id: store.id,
                type: USER_TYPE.CLIENT
            })
        }

        return userStore && {
            userStoree: UserStore.parseUserStore(userStore),
            user: {
                ...User.ParseUser(user),
                token: user.currentAccessToken.value,
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

    async get_store_var({ request, auth }: HttpContext) {

        const { store_id } = request.qs();
        if (!store_id) return 'store_id is required';

        const user = await auth.authenticate();
        if (!await UserStore.isStoreManagerOrMore(user.id, store_id)) return 'Permission Required';

        const products = (await db.from(Product.table).where('store_id', store_id).count('id as count'))[0]?.count;
        const catalogs = (await db.from(Catalog.table).where('store_id', store_id).count('id as count'))[0]?.count;
        const categories = (await db.from(Category.table).where('store_id', store_id).count('id as count'))[0]?.count;
        const features = (await db.from(Feature.table).where('store_id', store_id).count('id as count'))[0]?.count;
        return {
            products,
            categories,
            catalogs,
            features
        }
    }
    async check_store({ request }: HttpContext) {

        const { store_name } = request.qs();
        const s = store_name.trim().toLocaleLowerCase();
        if (!s) return;
        if (s.length < 3) return;
        const deja_pris = !!(await db.query().from(Store.table).select('id').where('name', s).limit(1))[0]
        console.log({ s, deja_pris });
        return {
            exist: deja_pris
        }
    }

    async get_users_var({ request, auth }: HttpContext) {

        const { store_id } = request.qs();
        if (!store_id) return 'store_id is required';

        const user = await auth.authenticate();
        if (!await UserStore.isStoreManagerOrMore(user.id, store_id)) return 'Permission Required';

        const roles = (await db.from(Role.table).where('store_id', store_id).count('id as count'))[0]?.count;
        const collaborators = (await db.from(UserStore.table).where('store_id', store_id).andWhere((qr) => {
            qr.where('type', USER_TYPE.OWNER).orWhere('type', USER_TYPE.COLLABORATOR)
        }).count('id as count'))[0]?.count;
        const moderators = (await db.from(UserStore.table).whereNull('store_id').andWhere((qr) => {
            qr.where('type', USER_TYPE.ADMIN).orWhere('type', USER_TYPE.MODERATOR)
        }).count('id as count'))[0]?.count;
        const clients = (await db.from(UserStore.table).where('store_id', store_id).andWhere('type', USER_TYPE.CLIENT).count('id as count'))[0]?.count;

        return {
            roles,
            collaborators,
            moderators,
            clients
        }
    }
}


async function populateStore(store: Store, user: User) {
    /** ROLE */
    await Role.create({
        chat_client: true,
        filter_client: true,
        filter_collaborator: true,
        filter_command: true,
        filter_product: true,
        manage_command: true,
        name: 'Customer service',
        store_id: store.id,
    })
    await Role.create({
        edit_product: true,
        filter_collaborator: true,
        filter_product: true,
        manage_scene_product: true,
        name: '3D Engineer',
        store_id: store.id,
    })
    await Role.create({
        ban_client: true,
        chat_client: true,
        filter_client: true,
        ban_collaborator: true,
        create_delete_collaborator: true,
        create_delete_product: true,
        edit_product: true,
        filter_collaborator: true,
        filter_command: true,
        filter_product: true,
        manage_command: true,
        manage_interface: true,
        manage_scene_product: true,
        name: 'Collaborator',
        store_id: store.id,

    })
    /** CATALOG */
    const catalog1_id = v4();
    await Catalog.create({
        id: catalog1_id,
        label: 'My First Catalog',
        description: 'My First Catalog Description',
        status: Product.STATUS.VISIBLE,
        store_id: store.id,
        index: 1,
    })
    const catalog2_id = v4();
    await Catalog.create({
        id: catalog2_id,
        label: 'My Second Catalog',
        description: 'My Second Catalog Description',
        status: Product.STATUS.VISIBLE,
        store_id: store.id,
        index: 1,
    })
    /** Category */
    const category1_1_id = v4();
    await Category.create({
        id: category1_1_id,
        catalog_id: catalog1_id,
        label: 'My First Category',
        description: 'My First Category Description',
        status: Product.STATUS.VISIBLE,
        store_id: store.id,
        scene_dir: '/fs/categories_scene_dir_0673a1ec-5005-4783-bebe-f59b5582ac9e/Category_ring_a',
        index: 1
    })
    const category2_1_id = v4();
    await Category.create({
        id: category2_1_id,
        catalog_id: catalog1_id,
        label: 'My First Category',
        description: 'My First Category Description',
        status: Product.STATUS.VISIBLE,
        store_id: store.id,
        scene_dir: '/fs/categories_scene_dir_0673a1ec-5005-4783-bebe-f59b5582ac9e/Category_ring_a',
        index: 1
    })
    const category3_1_id = v4();
    await Category.create({
        id: category3_1_id,
        catalog_id: catalog1_id,
        label: 'My First Category',
        description: 'My First Category Description',
        status: Product.STATUS.VISIBLE,
        store_id: store.id,
        scene_dir: '/fs/categories_scene_dir_0673a1ec-5005-4783-bebe-f59b5582ac9e/Category_ring_a',
        index: 1
    })

    const category1_2_id = v4();
    await Category.create({
        id: category1_2_id,
        catalog_id: catalog2_id,
        label: 'My First Category',
        description: 'My First Category Description',
        status: Product.STATUS.VISIBLE,
        store_id: store.id,
        scene_dir: '/fs/categories_scene_dir_0673a1ec-5005-4783-bebe-f59b5582ac9e/Category_ring_a',
        index: 1
    })
    const category2_2_id = v4();
    await Category.create({
        id: category2_2_id,
        catalog_id: catalog2_id,
        label: 'My First Category',
        description: 'My First Category Description',
        status: Product.STATUS.VISIBLE,
        store_id: store.id,
        scene_dir: '/fs/categories_scene_dir_0673a1ec-5005-4783-bebe-f59b5582ac9e/Category_ring_a',
        index: 1
    })
    const category3_2_id = v4();
    await Category.create({
        id: category3_2_id,
        catalog_id: catalog2_id,
        label: 'My First Category',
        description: 'My First Category Description',
        status: Product.STATUS.VISIBLE,
        store_id: store.id,
        scene_dir: '/fs/categories_scene_dir_0673a1ec-5005-4783-bebe-f59b5582ac9e/Category_ring_a',
        index: 1
    })
    /* Products  */
    await Product.create({
        title: "Ring 111",
        description: "The 1982 pepal ring by Jack Alderman",
        images: JSON.stringify([
            "/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg",
            "/fs/1hvrng7iv_29tvf0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        model_images: JSON.stringify([
            "/fs/1i0b788bk_47rim0_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.wbep",
            "/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        status: "VISIBLE",
        stock: 34,
        keywords: "noga",
        category_id: category1_1_id,
        price: 1243,
        is_dynamic_price: 0,
        store_id: store.id,
        scene_dir: "/fs/products_scene_dir_65b6e94b-b61b-4deb-aa70-dd4485d9b67f/Ring_1",
    })
    await Product.create({
        title: "Ring 211",
        description: "The 1983 pepal ring by Jack Alderman",
        images: JSON.stringify([
            "/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg",
            "/fs/1hvrng7iv_29tvf0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        model_images: JSON.stringify([
            "/fs/1i0b788bk_47rim0_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.wbep",
            "/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        status: "VISIBLE",
        stock: 34,
        keywords: "noga",
        category_id: category1_1_id,
        price: 356,
        is_dynamic_price: 0,
        store_id: store.id,
        scene_dir: "/fs/products_scene_dir_05e7dc8e-f409-46ae-91cc-6a125add8c5b/Ring_1",
    })
    await Product.create({
        title: "Ring 311",
        description: "The 1983 pepal ring by Jack Alderman",
        images: JSON.stringify([
            "/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg",
            "/fs/1hvrng7iv_29tvf0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        model_images: JSON.stringify([
            "/fs/1i0b788bk_47rim0_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.wbep",
            "/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        status: "VISIBLE",
        stock: 34,
        keywords: "noga",
        category_id: category1_1_id,
        price: 356,
        is_dynamic_price: 0,
        store_id: store.id,
        scene_dir: "/fs/products_scene_dir_05e7dc8e-f409-46ae-91cc-6a125add8c5b/Ring_1",
    })

    await Product.create({
        title: "Ring 121",
        description: "The 1982 pepal ring by Jack Alderman",
        images: JSON.stringify([
            "/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg",
            "/fs/1hvrng7iv_29tvf0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        model_images: JSON.stringify([
            "/fs/1i0b788bk_47rim0_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.wbep",
            "/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        status: "VISIBLE",
        stock: 34,
        keywords: "noga",
        category_id: category2_1_id,
        price: 1243,
        is_dynamic_price: 0,
        store_id: store.id,
        scene_dir: "/fs/products_scene_dir_65b6e94b-b61b-4deb-aa70-dd4485d9b67f/Ring_1",
    })
    await Product.create({
        title: "Ring 221",
        description: "The 1983 pepal ring by Jack Alderman",
        images: JSON.stringify([
            "/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg",
            "/fs/1hvrng7iv_29tvf0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        model_images: JSON.stringify([
            "/fs/1i0b788bk_47rim0_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.wbep",
            "/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        status: "VISIBLE",
        stock: 34,
        keywords: "noga",
        category_id: category2_1_id,
        price: 356,
        is_dynamic_price: 0,
        store_id: store.id,
        scene_dir: "/fs/products_scene_dir_05e7dc8e-f409-46ae-91cc-6a125add8c5b/Ring_1",
    })
    await Product.create({
        title: "Ring 321",
        description: "The 1983 pepal ring by Jack Alderman",
        images: JSON.stringify([
            "/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg",
            "/fs/1hvrng7iv_29tvf0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        model_images: JSON.stringify([
            "/fs/1i0b788bk_47rim0_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.wbep",
            "/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        status: "VISIBLE",
        stock: 34,
        keywords: "noga",
        category_id: category2_1_id,
        price: 356,
        is_dynamic_price: 0,
        store_id: store.id,
        scene_dir: "/fs/products_scene_dir_05e7dc8e-f409-46ae-91cc-6a125add8c5b/Ring_1",
    })

    await Product.create({
        title: "Ring 131",
        description: "The 1982 pepal ring by Jack Alderman",
        images: JSON.stringify([
            "/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg",
            "/fs/1hvrng7iv_29tvf0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        model_images: JSON.stringify([
            "/fs/1i0b788bk_47rim0_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.wbep",
            "/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        status: "VISIBLE",
        stock: 34,
        keywords: "noga",
        category_id: category3_1_id,
        price: 1243,
        is_dynamic_price: 0,
        store_id: store.id,
        scene_dir: "/fs/products_scene_dir_65b6e94b-b61b-4deb-aa70-dd4485d9b67f/Ring_1",
    })
    await Product.create({
        title: "Ring 231",
        description: "The 1983 pepal ring by Jack Alderman",
        images: JSON.stringify([
            "/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg",
            "/fs/1hvrng7iv_29tvf0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        model_images: JSON.stringify([
            "/fs/1i0b788bk_47rim0_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.wbep",
            "/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        status: "VISIBLE",
        stock: 34,
        keywords: "noga",
        category_id: category3_1_id,
        price: 356,
        is_dynamic_price: 0,
        store_id: store.id,
        scene_dir: "/fs/products_scene_dir_05e7dc8e-f409-46ae-91cc-6a125add8c5b/Ring_1",
    })
    await Product.create({
        title: "Ring 331",
        description: "The 1983 pepal ring by Jack Alderman",
        images: JSON.stringify([
            "/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg",
            "/fs/1hvrng7iv_29tvf0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        model_images: JSON.stringify([
            "/fs/1i0b788bk_47rim0_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.wbep",
            "/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        status: "VISIBLE",
        stock: 34,
        keywords: "noga",
        category_id: category3_1_id,
        price: 356,
        is_dynamic_price: 0,
        store_id: store.id,
        scene_dir: "/fs/products_scene_dir_05e7dc8e-f409-46ae-91cc-6a125add8c5b/Ring_1",
    })
    //
    await Product.create({
        title: "Ring 112",
        description: "The 1982 pepal ring by Jack Alderman",
        images: JSON.stringify([
            "/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg",
            "/fs/1hvrng7iv_29tvf0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        model_images: JSON.stringify([
            "/fs/1i0b788bk_47rim0_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.wbep",
            "/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        status: "VISIBLE",
        stock: 34,
        keywords: "noga",
        category_id: category1_2_id,
        price: 1243,
        is_dynamic_price: 0,
        store_id: store.id,
        scene_dir: "/fs/products_scene_dir_05e7dc8e-f409-46ae-91cc-6a125add8c5b/Ring_1",
    })
    await Product.create({
        title: "Ring 212",
        description: "The 1983 pepal ring by Jack Alderman",
        images: JSON.stringify([
            "/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg",
            "/fs/1hvrng7iv_29tvf0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        model_images: JSON.stringify([
            "/fs/1i0b788bk_47rim0_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.wbep",
            "/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        status: "VISIBLE",
        stock: 34,
        keywords: "noga",
        category_id: category1_2_id,
        price: 356,
        is_dynamic_price: 0,
        store_id: store.id,
        scene_dir: "/fs/products_scene_dir_05e7dc8e-f409-46ae-91cc-6a125add8c5b/Ring_1",
    })
    await Product.create({
        title: "Ring 312",
        description: "The 1983 pepal ring by Jack Alderman",
        images: JSON.stringify([
            "/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg",
            "/fs/1hvrng7iv_29tvf0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        model_images: JSON.stringify([
            "/fs/1i0b788bk_47rim0_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.wbep",
            "/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        status: "VISIBLE",
        stock: 34,
        keywords: "noga",
        category_id: category1_2_id,
        price: 356,
        is_dynamic_price: 0,
        store_id: store.id,
        scene_dir: "/fs/products_scene_dir_05e7dc8e-f409-46ae-91cc-6a125add8c5b/Ring_1",
    })

    await Product.create({
        title: "Ring 122",
        description: "The 1982 pepal ring by Jack Alderman",
        images: JSON.stringify([
            "/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg",
            "/fs/1hvrng7iv_29tvf0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        model_images: JSON.stringify([
            "/fs/1i0b788bk_47rim0_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.wbep",
            "/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        status: "VISIBLE",
        stock: 34,
        keywords: "noga",
        category_id: category2_2_id,
        price: 1243,
        is_dynamic_price: 0,
        store_id: store.id,
        scene_dir: "/fs/products_scene_dir_05e7dc8e-f409-46ae-91cc-6a125add8c5b/Ring_1",
    })
    await Product.create({
        title: "Ring 222",
        description: "The 1983 pepal ring by Jack Alderman",
        images: JSON.stringify([
            "/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg",
            "/fs/1hvrng7iv_29tvf0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        model_images: JSON.stringify([
            "/fs/1i0b788bk_47rim0_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.wbep",
            "/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        status: "VISIBLE",
        stock: 34,
        keywords: "noga",
        category_id: category2_2_id,
        price: 356,
        is_dynamic_price: 0,
        store_id: store.id,
        scene_dir: "/fs/products_scene_dir_05e7dc8e-f409-46ae-91cc-6a125add8c5b/Ring_1",
    })
    await Product.create({
        title: "Ring 322",
        description: "The 1983 pepal ring by Jack Alderman",
        images: JSON.stringify([
            "/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg",
            "/fs/1hvrng7iv_29tvf0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        model_images: JSON.stringify([
            "/fs/1i0b788bk_47rim0_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.wbep",
            "/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        status: "VISIBLE",
        stock: 34,
        keywords: "noga",
        category_id: category2_2_id,
        price: 356,
        is_dynamic_price: 0,
        store_id: store.id,
        scene_dir: "/fs/products_scene_dir_05e7dc8e-f409-46ae-91cc-6a125add8c5b/Ring_1",
    })

    await Product.create({
        title: "Ring 132",
        description: "The 1982 pepal ring by Jack Alderman",
        images: JSON.stringify([
            "/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg",
            "/fs/1hvrng7iv_29tvf0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        model_images: JSON.stringify([
            "/fs/1i0b788bk_47rim0_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.wbep",
            "/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        status: "VISIBLE",
        stock: 34,
        keywords: "noga",
        category_id: category3_2_id,
        price: 1243,
        is_dynamic_price: 0,
        store_id: store.id,
        scene_dir: "/fs/products_scene_dir_05e7dc8e-f409-46ae-91cc-6a125add8c5b/Ring_1",
    })
    await Product.create({
        title: "Ring 232",
        description: "The 1983 pepal ring by Jack Alderman",
        images: JSON.stringify([
            "/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg",
            "/fs/1hvrng7iv_29tvf0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        model_images: JSON.stringify([
            "/fs/1i0b788bk_47rim0_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.wbep",
            "/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        status: "VISIBLE",
        stock: 34,
        keywords: "noga",
        category_id: category3_2_id,
        price: 356,
        is_dynamic_price: 0,
        store_id: store.id,
        scene_dir: "/fs/products_scene_dir_05e7dc8e-f409-46ae-91cc-6a125add8c5b/Ring_1",
    })
    await Product.create({
        title: "Ring 332",
        description: "The 1983 pepal ring by Jack Alderman",
        images: JSON.stringify([
            "/fs/1hv1mieub_19ahe0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg",
            "/fs/1hvrng7iv_29tvf0_products_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        model_images: JSON.stringify([
            "/fs/1i0b788bk_47rim0_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.wbep",
            "/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"
        ]),
        status: "VISIBLE",
        stock: 34,
        keywords: "noga",
        category_id: category3_2_id,
        price: 356,
        is_dynamic_price: 0,
        store_id: store.id,
        scene_dir: "/fs/products_scene_dir_05e7dc8e-f409-46ae-91cc-6a125add8c5b/Ring_1",
    })
    const admin = (await db.from(UserStore.table).join('users', 'user_id', 'users.id').whereNull('store_id').limit(1))[0]
    const discussion_id = v4();
    console.log({ store });

    await Discussion.create({
        creator_id: admin.user_id,
        receiver_id: store.owner_id,
        creator_opened_at: DateTime.now(),
        to_id: store.id,
        id: discussion_id
    })

    await Message.create({
        table_id: discussion_id,
        table_name: Discussion.table,
        text:
            `
Bonjour ${user.name},

Je me permets de vous contacter suite à votre inscription à la démo de notre plateforme. Je suis [Votre nom], membre de l'équipe de [Nom de votre plateforme], et je tiens à vous souhaiter la bienvenue !

Nous avons développé cette plateforme en ligne avec pour objectif de vous offrir des outils performants pour gérer efficacement vos produits, interagir avec votre clientèle et booster vos ventes en ligne. Nous sommes ravis que vous ayez rejoint notre démo et nous espérons que vous apprécierez l'expérience que nous vous proposons.

Nous vous encourageons vivement à explorer toutes les fonctionnalités de notre plateforme et à nous remonter vos retours et suggestions. Votre avis est essentiel pour nous permettre d'améliorer constamment notre projet et répondre au mieux à vos besoins en tant que propriétaire de magasin ou boutique.

N'hésitez pas à nous faire part de vos impressions, des points positifs que vous avez identifiés et des axes d'amélioration que vous envisagez. Vos commentaires seront précieux pour nous aider à façonner une plateforme qui réponde parfaitement à vos attentes.

Si vous avez des questions ou besoin d'assistance pour explorer notre démo, n'hésitez pas à me contacter directement. Je me ferai un plaisir de vous guider et de vous accompagner dans la découverte de notre solution.

Votre retour est essentiel pour nous, et nous vous remercions par avance pour votre implication et votre contribution à l'amélioration de notre projet.

Bien cordialement,

${admin.name} de L'équipe Sublymus \(^_^)/
`,
        user_id: admin.user_id,
    });

}