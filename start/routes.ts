import AuthController from '#controllers/auth_controller';
import ProductsController from '#controllers/products_controller';
import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'
import env from './env.js';
import CatalogsController from '#controllers/catalogs_controller';
import CategoriesController from '#controllers/categories_controller';
import FeaturesController from '#controllers/features_controller';
import FValueController from '#controllers/f_values_controller';

// router.get('/', [UsersController,'connexion']);

router.get('/google_connexion',[AuthController,'google_connexion']);
router.get('/gl_push_info',[AuthController,'google_push_info']);
router.post('/create_client',[AuthController,'create_client']);
router.get('/disconnection',[AuthController,'disconnection']);


router.get('me/', [UsersController,'me']);
router.get('edit_me/', [UsersController,'edit_me']);
router.get('detail_all_user/', [UsersController,'detail_all_user']);
router.get('/user', [UsersController,'user']);

router.post('/create_product', [ProductsController,'create_product']);
router.get('/get_product/:id', [ProductsController,'get_product']);
router.get('/detail_product/:id', [ProductsController,'detail_product']);
router.get('/get_products', [ProductsController,'get_products']);
router.get('/detail_products', [ProductsController,'detail_products']);
router.put('/update_product', [ProductsController,'update_product']);
router.put('/update_view_product', [ProductsController,'update_view_product']);
router.delete('/delete_product/:id', [ProductsController,'delete_product']);

router.post('/create_catalog', [CatalogsController,'create_catalog']);
router.get('/get_catalog/:id', [CatalogsController,'get_catalog']);
router.get('/get_catalogs', [CatalogsController,'get_catalogs']);
router.put('/update_catalog', [CatalogsController,'update_catalog']);
router.put('/update_view_catalog', [CatalogsController,'update_view_catalog']);
router.delete('/delete_catalog/:id', [CatalogsController,'delete_catalog']);

router.post('/create_category', [CategoriesController,'create_category']);
router.get('/get_category/:id', [CategoriesController,'get_category']);
router.get('/get_categories', [CategoriesController,'get_categories']);
router.put('/update_category', [CategoriesController,'update_category']);
router.put('/update_view_category', [CategoriesController,'update_view_category']);
router.delete('/delete_category/:id', [CategoriesController,'delete_category']);

router.post('/create_feature', [FeaturesController,'create_feature']);
router.get('/get_feature/:id', [FeaturesController,'get_feature']);
router.get('/get_features', [FeaturesController,'get_features']);
router.put('/update_feature', [FeaturesController,'update_feature']);
router.delete('/delete_feature/:id', [FeaturesController,'delete_feature']);
router.post('/add_features_to_product', [FeaturesController,'add_features_to_product']);
router.delete('/remove_features_to_product', [FeaturesController,'remove_features_to_product']);
router.get('/get_features_of_product', [FeaturesController,'get_features_of_product']);
router.get('/get_products_of_feature', [FeaturesController,'get_products_of_feature']);

router.post('/create_f_value', [FValueController,'create_f_value']);
router.get('/get_f_value/:id', [FValueController,'get_f_value']);
router.get('/get_f_values', [FValueController,'get_f_values']);
router.put('/update_f_value', [FValueController,'update_f_value']);
router.delete('/delete_f_value/:id', [FValueController,'delete_f_value']);

router.get(`${env.get("FILE_STORAGE_URL")}/*`,({params,response})=>{
    const fileName = `/${(params['*'] as string[]).join('/')}`
    response.download(`${env.get("FILE_STORAGE_PATH")}${fileName}`);
});
router.get('/public/*',({params,response})=>{
    const fileName = `/${(params['*'] as string[]).join('/')}`
    response.download(`${env.get("PUBLIC_PATH")}${fileName}`);
});