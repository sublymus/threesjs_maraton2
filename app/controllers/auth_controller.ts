import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
    connexion({auth}:HttpContext){
        return{
            good:'connexion'
        }
    }
    try_token({}:HttpContext){

        return{
            good:'connexion'
        }
    }
}