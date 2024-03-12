import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {

    
    me({}:HttpContext){
        
        return{
            good:'connexion'
        }
    }
    edit_me({}:HttpContext){

        return{
            good:'connexion'
        }
    }
    
    detail_all_user({}:HttpContext){

        return{
            good:'connexion'
        }
    }
    user({}:HttpContext){

        return{
            good:'connexion'
        }
    }
}