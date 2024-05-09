import AuthController from '#controllers/auth_controller';
import ProductsController from '#controllers/products_controller';
import router from '@adonisjs/core/services/router'
import env from './env.js';
import CatalogsController from '#controllers/catalogs_controller';
import CategoriesController from '#controllers/categories_controller';
import FeaturesController from '#controllers/features_controller';
import FValueController from '#controllers/f_values_controller';
import StoresController from '#controllers/stores_controller';
import RolesController from '#controllers/roles_controller';
import DiscussionController from '#controllers/discussions_controller';

//Auth
router.get('/google_connexion',[AuthController,'google_connexion']);
router.get('/gl_push_info',[AuthController,'google_push_info']);
router.get('me', [AuthController,'me']);
router.get('get_users/', [AuthController,'get_users']);
router.put('edit_me/', [AuthController,'edit_me']);
router.get('/disconnection',[AuthController,'disconnection']);
router.get('/global_disconnection',[AuthController,'global_disconnection']);

//Product
router.post('/create_product', [ProductsController,'create_product']);
router.get('/get_products', [ProductsController,'get_products']);
router.put('/update_product', [ProductsController,'update_product']);
router.put('/update_view_product', [ProductsController,'update_view_product']);
router.delete('/delete_product/:id', [ProductsController,'delete_product']);
//Catlog
router.post('/create_catalog', [CatalogsController,'create_catalog']);
router.get('/get_catalogs', [CatalogsController,'get_catalogs']);
router.put('/update_catalog', [CatalogsController,'update_catalog']);
router.put('/update_view_catalog', [CatalogsController,'update_view_catalog']);
router.delete('/delete_catalog/:id', [CatalogsController,'delete_catalog']);
//Category
router.post('/create_category', [CategoriesController,'create_category']);
router.get('/get_categories', [CategoriesController,'get_categories']);
router.put('/update_category', [CategoriesController,'update_category']);
router.put('/update_view_category', [CategoriesController,'update_view_category']);
router.delete('/delete_category/:id', [CategoriesController,'delete_category']);
//Features
router.post('/create_feature', [FeaturesController,'create_feature']);
router.get('/get_feature/:id', [FeaturesController,'get_feature']);
router.get('/get_features', [FeaturesController,'get_features']);
router.put('/update_feature', [FeaturesController,'update_feature']);
router.delete('/delete_feature/:id', [FeaturesController,'delete_feature']);
router.post('/add_features_to_product', [FeaturesController,'add_features_to_product']);
router.delete('/remove_features_to_product', [FeaturesController,'remove_features_to_product']);
router.get('/get_features_of_product', [FeaturesController,'get_features_of_product']);
router.get('/get_products_of_feature', [FeaturesController,'get_products_of_feature']);
//FValue
router.post('/create_f_value', [FValueController,'create_f_value']);
router.get('/get_f_value/:id', [FValueController,'get_f_value']);
router.get('/get_f_values', [FValueController,'get_f_values']);
router.put('/update_f_value', [FValueController,'update_f_value']);
router.delete('/delete_f_value/:id', [FValueController,'delete_f_value']);
//Store
router.post('/create_store', [StoresController,'create_store']);
router.post('/add_collaborator',[StoresController,'add_collaborator'])
router.get('/get_store_var', [StoresController,'get_store_var']);
router.get('/get_users_var', [StoresController,'get_users_var']);
router.get('/get_stores',[StoresController,'get_stores'])
router.get('/owner_stores',[StoresController,'owner_stores'])
router.get('/get_store_by_name/:name',[StoresController,'get_store_by_name'])
router.get('/get_store_clients',[StoresController,'get_store_clients'])
router.get('/get_store_collaborators',[StoresController,'get_store_collaborators'])
router.get('/can_manage_store/:att',[StoresController,'can_manage_store'])
router.get('/can_use_store/:att',[StoresController,'can_use_store'])
router.put('/update_store',[StoresController,'update_store'])
router.delete('/delete_store/:id',[StoresController,'delete_store'])
router.delete('/remove_collaborator',[StoresController,'remove_collaborator'])
//Role
router.post('/create_collaborator_role', [RolesController,'create_collaborator_role']);
router.put('/change_collaborator_role', [RolesController,'change_collaborator_role']);
router.get('/get_store_roles', [RolesController,'get_store_roles']);
router.get('/get_roles_json', [RolesController,'get_roles_json']);
router.put('/update_role', [RolesController,'update_role']);
router.delete('/delete_role',[RolesController,'delete_role'])
//Discussion
router.post('/create_discussion',[DiscussionController,'create_discussion'])
router.get('/get_discussions',[DiscussionController,'get_discussions'])
router.delete('/delete_discussion/:id',[DiscussionController,'delete_discussion'])
router.put('/block_discussion/:id',[DiscussionController,'block_discussion'])
router.put('/unblock_discussion/:id',[DiscussionController,'unblock_discussion'])
router.post('/send_message',[DiscussionController,'send_message'])
router.get('/get_messages',[DiscussionController,'get_messages'])
router.put('/edit_message',[DiscussionController,'edit_message'])
router.delete('/delete_message/:id',[DiscussionController,'delete_message'])

router.get(`${env.get("FILE_STORAGE_URL")}/*`,({params,response})=>{
    const fileName = `/${(params['*'] as string[]).join('/')}`
    response.download(`${env.get("FILE_STORAGE_PATH")}${fileName}`);
});
router.get('/public/*',({params,response})=>{
    const fileName = `/${(params['*'] as string[]).join('/')}`
    response.download(`${env.get("PUBLIC_PATH")}${fileName}`);
});
