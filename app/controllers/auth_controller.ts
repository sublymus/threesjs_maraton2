import type { HttpContext } from '@adonisjs/core/http'
import User from "#models/user";
import env from "#start/env";
// import { create_user_validation } from "App/Validators/AuthValidator";
import { v4 } from "uuid";
import { createFiles } from './Tools/FileManager/CreateFiles.js';
import { deleteFiles } from './Tools/FileManager/DeleteFiles.js';
import hash from '@adonisjs/core/services/hash'

export default class AuthController {

    public async google_connexion({ ally }: HttpContext) {
        return ally.use("google").redirect();
    }

    public async connexion({ request, auth }: HttpContext) {
        const { email, password } = request.qs();

        const user = await User.findBy('email', email);

        if (!user) {
            //? This is a security measure to prevent timing attacks.
            await hash.use('scrypt').make('password')
            return null
        }

        const hasValidPassword = await hash.verify(user.password, password)

        if (!hasValidPassword) {
            return null
        }
        
        return {
            ...user.$attributes,
            photos:JSON.parse(user.photos||'[]'),
            token: (await User.accessTokens.create(user)).value?.release(),
        }
    }

    public async disconnection({ auth }: HttpContext) {
        // const user  = auth.user;
        // const currentAccessToken = user?.currentAccessToken;
        const getUser = auth.user?.id
        const user = await User.findOrFail(getUser)
        await User.accessTokens.delete(user, user.id)
        return {
            disconnection: getUser,
        };
    }

    public async google_push_info({ ally, response, auth, request }: HttpContext) {
        const provider = ally.use('google');

        if (provider.accessDenied()) {
            return "google access was denied";
        }
        if (provider.stateMisMatch()) {
            return "google request expired. Retry again";
        }
        if (provider.hasError()) {
            return provider.getError();
        }
        const { id, email, avatarUrl, name } = await provider.user();

        if (!email) {
            return "google request user email";
        }

        const user = await User.findBy("email", email);

        if (user) {
            return response
                .redirect()
                .toPath(`${env.get('FRONT_ORIGINE')}/#${env.get('FRONT_END_HOME')}=${
                    JSON.stringify({
                        token: (await User.accessTokens.create(user)).value?.release(),
                    ...JSON.parse(JSON.stringify({
                        ...user.$attributes,
                        photos:JSON.parse(user.photos||'[]'),
                    }))
                    })
                }`);
        } else {
            const user_id = v4();
            const newUser = await User.create({
                id: user_id,
                email,
                full_name: name,
                password: id,
                photos: JSON.stringify([avatarUrl])
            })
            newUser.id = user_id;
            newUser.$attributes.id = user_id;
            //await _create_client( {name, email, password}, auth )
            response.redirect().toPath(`${env.get('FRONT_ORIGINE')}/#${env.get('FRONT_END_HOME')}=${
                    JSON.stringify({
                        token: (await User.accessTokens.create(newUser)).value?.release(),
                    ...JSON.parse(JSON.stringify({
                        ...newUser.$attributes,
                        photos:JSON.parse(newUser.photos||'[]'),
                    }))
                    })
                }`);
        }
    }

    public async create_client({ request, auth }: HttpContext) {
        const { full_name, email, password } = request.body();
        const id = v4();
        const existingUser = await User.findBy("email", email);
        if (existingUser) return "this email is already used ";
        try {
            const photos = await createFiles({
                request,
                column_name: "photos",
                table_id: id,
                table_name: "users",
                options: {
                    throwError: true,
                    compress: 'img',
                    min: 1,
                    max: 1,
                    extname: ["jpg", "jpeg", "webp", 'png'],
                    maxSize: 12 * 1024 * 1024,
                },
            });
            const user = await User.create({
                id,
                email,
                full_name,
                password,
                photos: JSON.stringify(photos)
            })
            //await _create_client( {name, email, password}, auth )
            user.id = id;
            user.$attributes.id = id;
            return {
                ...user.$attributes,
                photos:JSON.parse(user.photos||'[]'),
                token: (await User.accessTokens.create(user)).value?.release(),
            }

        } catch (error) {
            console.log(error);

            deleteFiles(id, 'photos');
        }
    }

    public async create_provider() {

    }
    public async create_collaborator() {

    }
    public async create_engineer() {

    }
    public async create_service() {

    }


    public async try_token() {

    }
}


