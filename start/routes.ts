import AuthController from '#controllers/auth_controller';
import ProductsController from '#controllers/products_controller';
import router from '@adonisjs/core/services/router'
import env from './env.js';
import CatalogsController from '#controllers/catalogs_controller';
import CategoriesController from '#controllers/categories_controller';
import FeaturesController from '#controllers/features_controller';
import StoresController from '#controllers/stores_controller';
import RolesController from '#controllers/roles_controller';
import DiscussionController from '#controllers/discussions_controller';
import MessagesController from '#controllers/messages_controller';
import SessionController from '#controllers/session_controller';
import CommandsController from '#controllers/commands_controller';
import User, { AdminEmails, USER_STATUS, USER_TYPE } from '#models/user';

import { v4 } from 'uuid';
import UserStore from '#models/user_store';
import webpush from "web-push";
import PostsController from '#controllers/posts_controller';
import SubjectsController from '#controllers/subjects_controller';
import UserBrowsersController from '#controllers/user_browsers_controller';
import UserNotifContextsController from '#controllers/user_notif_contexts_controller';
import ProductCommentsController from '#controllers/product_comments_controller';
import FavoritesController from '#controllers/favorites_controller';
import DetailProductsController from '#controllers/detail_products_controller';

//Auth
router.get('/google_connexion', [AuthController, 'google_connexion']);
router.get('/gl_push_info', [AuthController, 'google_push_info']);
router.get('me', [AuthController, 'me']);
router.put('edit_me/', [AuthController, 'edit_me']);
router.get('/disconnection', [AuthController, 'disconnection']);
router.get('/global_disconnection', [AuthController, 'global_disconnection']);
//Admin
router.get('get_users/', [AuthController, 'get_users']);
router.post('/add_moderator', [AuthController, 'add_moderator'])
router.get('get_moderators/', [AuthController, 'get_moderators']);
router.get('/can_manage_sublymus', [AuthController, 'can_manage_sublymus'])
router.delete('/remove_moderator', [AuthController, 'remove_moderator'])
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
router.get('/check_store', [StoresController, 'check_store'])
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
router.post('/add_command', [CommandsController, 'add_command'])
router.get('/get_commands', [CommandsController, 'get_commands'])
router.put('/client_confirm_command', [CommandsController, 'client_confirm_command'])
router.delete('/delete_command/:id', [CommandsController, 'delete_command'])
// Post
router.post('/create_post', [PostsController, 'create_post'])
router.get('/get_posts', [PostsController, 'get_posts'])
// router.put('/update_command', [PostsController, ''])
router.delete('/delete_post/:id', [PostsController, 'delete_post'])
// Subject
router.post('/create_subject', [SubjectsController, 'create_subject'])
router.get('/get_subjects', [SubjectsController, 'get_subjects'])
router.delete('/delete_subject/:id', [SubjectsController, 'delete_subject'])
// User Browsers
router.get('/get_user_browsers', [UserBrowsersController, 'get_user_browsers'])
router.put('/disable_notifications', [UserBrowsersController, 'disable_notifications'])
router.put('/enable_notifications', [UserBrowsersController, 'enable_notifications'])
router.put('/set_notification_data', [UserBrowsersController, 'set_notification_data'])
router.delete('/remove_user_browser/:id', [UserBrowsersController, 'remove_user_browser'])
// UserNotif Contexts
router.post('/add_notif_context', [UserNotifContextsController, 'add_notif_context'])
router.get('/get_notif_contexts', [UserNotifContextsController, 'get_notif_contexts'])
router.delete('/remove_notif_context/:id', [UserNotifContextsController, 'remove_notif_context'])
// Product Comments
router.post('/create_product_comment', [ProductCommentsController, 'create_product_comment'])
router.get('/get_product_comments', [ProductCommentsController, 'get_product_comments'])
router.get('/get_comment_index', [ProductCommentsController, 'get_comment_index'])
router.put('/set_product_comment_response', [ProductCommentsController, 'set_product_comment_response'])
router.put('/edit_product_comment_text', [ProductCommentsController, 'edit_product_comment_text'])
router.delete('/delete_product_comment/:id', [ProductCommentsController, 'delete_product_comment'])
// Favorites
router.post('/add_favorite', [FavoritesController, 'add_favorite'])
router.get('/get_favorites', [FavoritesController, 'get_favorites'])
router.delete('/delete_favorite/:id', [FavoritesController, 'delete_favorite'])
// Deatils
router.post('/create_detail', [DetailProductsController, 'create_detail'])
router.get('/get_details', [DetailProductsController, 'get_details'])
router.delete('/delete_detail/:id', [DetailProductsController, 'delete_detail'])

router.get(`${env.get("FILE_STORAGE_URL")}/*`, ({ params, response }) => {
    const fileName = `/${(params['*'] as string[]).join('/')}` 
    response.download(`${env.get("FILE_STORAGE_PATH")}${fileName}`);
});
router.get('/public/*', ({ params, response }) => {
    const fileName = `/${(params['*'] as string[]).join('/')}`
    response.download(`${env.get("PUBLIC_PATH")}${fileName}`);
});

router.get('/', ({ response }) => {
    response.download(`${env.get("PUBLIC_PATH")}/index.html`); 
})
router.get('/*', ({ params, response }) => {
    const fileName = `/${(params['*'] as string[]).join('/')}`
    // console.log(request.original, request.url);

    if (
        params['*'][0] == 'assets' ||
        params['*'][0] == 'src' || 
        params['*'][0] == 'world_config.js'|| 
        params['*'][0] == 'logo.png'||
        params['*'][0] == 'worker.js'
        ) {
        response.download(`${env.get("PUBLIC_PATH")}${fileName}`);
    } else {
        response.download(`${env.get("PUBLIC_PATH")}/index.html`);
    }
})

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
            console.log('*********** NEW ADMIN ', admin.email,  (await User.findBy('email',email))?.$attributes);
        }else{
            console.log(us.$attributes); 
        }
    }
}, 5000);


const publicVapidKey = 'BDwYyNLBYIyNOBFX3M27uTAUXLrUxgHVyBJPjxJj3aQR7ghxC_MetHpzgTspdk4e4Iq9E0LCzeAtbCPOcdclxCk';
const privateVapidKey = 'rOHBJ0AGjSf37QW-mPRScGNr_0Bqn6Ouk-1nQPUUPpI';

webpush.setVapidDetails('mailto:sublymus@gmail.com', publicVapidKey, privateVapidKey);

const list:any[] = [];
router.post('/add_context_notifier', ({request, response}) => {
    // Get pushSubscription object
    const subscription = request.body();
    list.push(subscription);
    // Send 201 - resource created
    response.status(201).json({});
    // Create payload
    // webpush.sendNotification(subscription as any, payload).catch(err => console.error(err));
    // Pass object into sendNotification
    setTimeout(()=>{
        list.forEach(s=>{
            // console.log('Push ==>> ', {
                
            // });
            
            const payload = JSON.stringify({title:'new Message', content: "Push Content"});
            webpush.sendNotification(s as any,payload ).catch(err => console.error(err));
        })
    }, 1000)
}); 