import AuthController from '#controllers/auth_controller';
import ProductsController from '#controllers/products_controller';
import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'

// router.get('/', [UsersController,'connexion']);

router.get('connexion/', [AuthController,'connexion']);
router.get('/try_token', [AuthController,'try_token']);

router.get('me/', [UsersController,'me']);
router.get('edit_me/', [UsersController,'edit_me']);
router.get('detail_all_user/', [UsersController,'detail_all_user']);
router.get('/user', [UsersController,'user']);

router.post('/create_product', [ProductsController,'create_product']);


