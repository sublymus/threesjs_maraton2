import AuthController from '#controllers/auth_controller';
import ProductsController from '#controllers/products_controller';
import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'
import env from './env.js';

// router.get('/', [UsersController,'connexion']);

router.get('connexion/', [AuthController,'connexion']);
router.get('/try_token', [AuthController,'try_token']);

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


router.get('/fs/:fileName',({params,response})=>{
    response.download(`${env.get("FILE_STORAGE")}/${params.fileName}`)
    
});