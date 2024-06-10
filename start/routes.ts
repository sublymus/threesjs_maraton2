import AuthController from '#controllers/auth_controller';
import ProductsController from '#controllers/products_controller';
import router from '@adonisjs/core/services/router'
import env from './env.js';
import CatalogsController from '#controllers/catalogs_controller';
import CategoriesController from '#controllers/categories_controller';
import FeaturesController from '#controllers/features_controller';
import ComponentController from '#controllers/components_controller';
import StoresController from '#controllers/stores_controller';
import RolesController from '#controllers/roles_controller';
import DiscussionController from '#controllers/discussions_controller';
import MessagesController from '#controllers/messages_controller';
import SessionController from '#controllers/session_controller';
import CommandsController from '#controllers/commands_controller';
import User, { AdminEmails, USER_STATUS, USER_TYPE } from '#models/user';
import { v4 } from 'uuid';
import UserStore from '#models/user_store';

//Auth
router.get('/google_connexion', [AuthController, 'google_connexion']);
router.get('/gl_push_info', [AuthController, 'google_push_info']);
router.get('me', [AuthController, 'me']);
router.get('/can_manage_sublymus', [AuthController, 'can_manage_sublymus'])
router.get('get_users/', [AuthController, 'get_users']);
router.get('get_moderators/', [AuthController, 'get_moderators']);
router.post('/add_moderator', [AuthController, 'add_moderator'])
router.put('edit_me/', [AuthController, 'edit_me']);
router.get('/disconnection', [AuthController, 'disconnection']);
router.get('/global_disconnection', [AuthController, 'global_disconnection']);
//Product
router.post('/create_product', [ProductsController, 'create_product']);
router.get('/get_products', [ProductsController, 'get_products']);
router.get('/get_client_visited', [ProductsController, 'get_client_visited']);
router.put('/update_product', [ProductsController, 'update_product']);
router.put('/update_view_product', [ProductsController, 'update_view_product']);
router.put('/set_client_visited', [ProductsController, 'set_client_visited']);
router.delete('/delete_product/:id', [ProductsController, 'delete_product']);
//Catlog
router.post('/create_catalog', [CatalogsController, 'create_catalog']);
router.get('/get_catalogs', [CatalogsController, 'get_catalogs']);
router.put('/update_catalog', [CatalogsController, 'update_catalog']);
router.put('/update_view_catalog', [CatalogsController, 'update_view_catalog']);
router.delete('/delete_catalog/:id', [CatalogsController, 'delete_catalog']);
//Category
router.post('/create_category', [CategoriesController, 'create_category']);
router.get('/get_categories', [CategoriesController, 'get_categories']);
router.put('/update_category', [CategoriesController, 'update_category']);
router.put('/update_view_category', [CategoriesController, 'update_view_category']);
router.delete('/delete_category/:id', [CategoriesController, 'delete_category']);
//Features
router.post('/create_feature', [FeaturesController, 'create_feature']);
router.get('/get_features', [FeaturesController, 'get_features']);
router.put('/update_feature', [FeaturesController, 'update_feature']);
router.delete('/delete_feature/:id', [FeaturesController, 'delete_feature']);
router.post('/add_features_to_product', [FeaturesController, 'add_feature_to_product']);
router.delete('/remove_features_to_product', [FeaturesController, 'remove_features_to_product']);
router.get('/get_features_of_product', [FeaturesController, 'get_features_of_product']);
router.get('/get_products_of_feature', [FeaturesController, 'get_products_of_feature']);
//Component
router.post('/create_component', [ComponentController, 'create_component']);
router.get('/get_components', [ComponentController, 'get_components']);
router.put('/update_component', [ComponentController, 'update_component']);
router.delete('/delete_component/:id', [ComponentController, 'delete_component']);
//get_product_feature_components
router.post('/set_product_feature_component', [ComponentController, 'set_product_feature_component']);
router.get('get_product_feature_components', [ComponentController, 'get_product_feature_components'])
router.put('/update_product_feature_component', [ComponentController, 'update_product_feature_component']);
router.delete('/detete_product_feature_component/:id', [ComponentController, 'detete_product_feature_component']);
//Store
router.post('/create_store', [StoresController, 'create_store']);
router.post('/add_collaborator', [StoresController, 'add_collaborator'])
router.get('/get_store_var', [StoresController, 'get_store_var']);
router.get('/get_users_var', [StoresController, 'get_users_var']);
router.get('/get_stores', [StoresController, 'get_stores'])
router.get('/owner_stores', [StoresController, 'owner_stores'])
router.get('/get_store_by_name/:name', [StoresController, 'get_store_by_name'])
router.get('/get_store_clients', [StoresController, 'get_store_clients'])
router.get('/get_store_collaborators', [StoresController, 'get_store_collaborators'])
router.get('/can_manage_store/:att', [StoresController, 'can_manage_store'])
router.get('/can_use_store/:att', [StoresController, 'can_use_store'])
router.put('/update_store', [StoresController, 'update_store'])
router.delete('/delete_store/:id', [StoresController, 'delete_store'])
router.delete('/remove_collaborator', [StoresController, 'remove_collaborator'])
//Role
router.post('/create_collaborator_role', [RolesController, 'create_collaborator_role']);
router.put('/change_collaborator_role', [RolesController, 'change_collaborator_role']);
router.post('/create_moderator_role', [RolesController, 'create_moderator_role']);
router.put('/change_moderator_role', [RolesController, 'change_moderator_role']);
router.get('/get_store_roles', [RolesController, 'get_store_roles']);
router.get('/get_roles_json', [RolesController, 'get_roles_json']);
router.put('/update_role', [RolesController, 'update_role']);
router.delete('/delete_role', [RolesController, 'delete_role'])
//Discussion
router.post('/create_discussion', [DiscussionController, 'create_discussion'])
router.get('/get_discussions', [DiscussionController, 'get_discussions'])
router.put('/block_discussion/:id', [DiscussionController, 'block_discussion'])
router.put('/unblock_discussion/:id', [DiscussionController, 'unblock_discussion'])
router.delete('/delete_discussion/:id', [DiscussionController, 'delete_discussion'])
//Session
router.post('/create_session', [SessionController, 'create_session'])
router.get('/get_sessions', [SessionController, 'get_sessions'])
router.put('/close_session/:id', [SessionController, 'close_session'])
router.put('/open_session/:id', [SessionController, 'open_session'])
router.delete('/delete_session/:id', [SessionController, 'delete_session'])
//Message
router.post('/send_message', [MessagesController, 'send_message'])
router.get('/get_messages', [MessagesController, 'get_messages'])
router.put('/edit_message', [MessagesController, 'edit_message'])
router.delete('/delete_message/:id', [MessagesController, 'delete_message'])
//Command
router.post('/create_command', [CommandsController, 'create_command'])
router.get('/get_commands', [CommandsController, 'get_commands'])
router.put('/update_command', [CommandsController, 'update_command'])
router.put('/client_confirm_command', [CommandsController, 'client_confirm_command'])
router.delete('/delete_command/:id', [CommandsController, 'delete_command'])

// router.get(`${env.get("FILE_STORAGE_URL")}/*`, ({ params, response }) => {
//     const fileName = `/${(params['*'] as string[]).join('/')}`
//     response.download(`${env.get("FILE_STORAGE_PATH")}${fileName}`);
// });
// router.get('/public/*', ({ params, response }) => {
//     const fileName = `/${(params['*'] as string[]).join('/')}`
//     response.download(`${env.get("PUBLIC_PATH")}${fileName}`);
// });

// router.get('/', ({ response }) => {
//     response.download(`${env.get("PUBLIC_PATH")}/index.html`);
// })
// router.get('/*', ({ params, response }) => {
//     const fileName = `/${(params['*'] as string[]).join('/')}`
//     console.log(params['*'][0]);

//     if (params['*'][0] == 'assets' || params['*'][0] == 'src' || params['*'][0] == 'vite.svg') {
//         response.download(`${env.get("PUBLIC_PATH")}${fileName}`);
//     } else {
//         response.download(`${env.get("PUBLIC_PATH")}/index.html`);
//     }
// })


setTimeout(async () => {
    for (const email of AdminEmails) {
        let admin = await User.findBy('email',email);
        const admin_id = v4()
        if(!admin){
            admin = await User.create({
                email,
                id: admin_id,
                name: 'new Collaborator',
                password: admin_id,
                photos: JSON.stringify(['/public/_user_img.png']),
                status: USER_STATUS.NEW
            });
        }else{
            console.log('Admin exist');
            
        }
        const us = (await UserStore.query().join('users','user_id', 'users.id').select('*').select('users.type as u_type').where('email',email).andWhere('user_stores.type',USER_TYPE.ADMIN).limit(1))[0];
        if(!us){
            const id = v4()
            await UserStore.create({
                id,
                user_id: admin.id,
                type: USER_TYPE.ADMIN,
            });
            console.log('*********** NEW ADMIN ', admin.email);
        }else{
            console.log(us.$attributes); 
        }
    }
}, 5000);