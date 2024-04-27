import type { HttpContext } from '@adonisjs/core/http'
import User from "#models/user";
import env from "#start/env";
// import { create_user_validation } from "App/Validators/AuthValidator";
import { v4 } from "uuid";
import { updateFiles } from './Tools/FileManager/UpdateFiles.js';
import { limitation, paginate } from './Tools/Utils.js';
import db from '@adonisjs/lucid/services/db';
export default class AuthController {

    public async google_connexion({ ally }: HttpContext) {
        return ally.use("google").redirect();
    }

    public async disconnection({ auth }: HttpContext) {
        const user = await auth.authenticate();
        await User.accessTokens.delete(user, user.currentAccessToken.identifier);
        return {
            disconnection: true
        };
    }
    public async global_disconnection({ request, auth }: HttpContext) {

        const { user_id } = request.qs()
        const user = await auth.authenticate();
        if (user_id /*&& admin / moderator*/) {
            const tagetUser = await User.find(user_id);
            if (!tagetUser) return 'user not found';
            const tokens = await User.accessTokens.all(tagetUser);
            for (const token of tokens) {
                await User.accessTokens.delete(tagetUser, token.identifier);
            }
        } else {
            const tokens = await User.accessTokens.all(user);
            for (const token of tokens) {
                await User.accessTokens.delete(user, token.identifier);
            }
        }
        return {
            disconnection: true,
        }
    }

    public async google_push_info({ ally, response }: HttpContext) {
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
                .toPath(`${env.get('FRONT_ORIGINE')}/auth#=${JSON.stringify({
                    token: (await User.accessTokens.create(user)).value?.release(),
                    ...User.ParseUser(user)
                })
                    }`);
        } else {
            const user_id = v4();
            const newUser = await User.create({
                id: user_id,
                email,
                name,
                password: id,
                photos: JSON.stringify([avatarUrl]),
            })
            newUser.id = user_id;
            newUser.$attributes.id = user_id;
            //await _create_client( {name, email, password}, auth )
            response.redirect().toPath(`${env.get('FRONT_ORIGINE')}/auth#=${JSON.stringify({
                token: (await User.accessTokens.create(newUser)).value?.release(),
                ...JSON.parse(JSON.stringify({
                    ...newUser.$attributes,
                    photos: JSON.parse(newUser.photos || '[]'),
                }))
            })
                }`);
        }
    }


    async me({ auth }: HttpContext) {
        const user = await auth.authenticate()
        const userAtt = User.ParseUser(user);

        return {
            ...userAtt,
            token: user.currentAccessToken.value
        };
    }
    async edit_me({ request, auth }: HttpContext) {
        const body = request.body();
        let urls: Record<string, string[]> = {};

        const user = await auth.authenticate();

        (['name', 'phone'] as const).forEach((attribute) => {
            if (body[attribute]) user[attribute] = body[attribute];
        });

        for (const f of (['photos'] as const)) {
            if (body[f]) {
                urls[f] = await updateFiles({
                    request,
                    table_name: "users",
                    table_id: user.id,
                    column_name: f,
                    lastUrls: user[f] || '[]',
                    newPseudoUrls: body[f],
                    options: {
                        throwError: true,
                        min: 1,
                        max: 7,
                        compress: 'img',
                        extname: ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'avif', 'apng', 'gif', "jpg", "png", "jpeg", "webp"],
                        maxSize: 12 * 1024 * 1024,
                    },
                });
                user[f] = JSON.stringify(urls[f]);
            }
        }
        await user.save();
        return {
            ...user.$attributes,
            ...urls
        }
    }

    async get_users({ request }: HttpContext) {
        // moderator // admin
        const { page, limit, name, email, phone, user_id, order_by } = paginate(request.qs() as { page: number | undefined, limit: number | undefined } & { [k: string]: any });


        let query = db.query().from(User.table).select('*');
        if (user_id) {
            query = query.whereLike('id', `%${user_id}%`);
        } else {

            if (email) {
                query = query.andWhereLike('phone', `%${email.split('').join('%')}%`);
            }
            if (phone) {
                query = query.andWhereLike('phone', `%${phone.split('').join('%')}%`);
            }
            if (name) {
                query = query.andWhereLike('phone', `%${name.split('').join('%')}%`);
            }
        }

        const users = await limitation(query, page, limit, order_by);

        return users.map(u => User.ParseUser(u));
    }
}


