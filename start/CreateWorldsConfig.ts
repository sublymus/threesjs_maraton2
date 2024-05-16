import fs from "fs/promises";
import env from "./env.js";


fs.writeFile(
    `${env.get('PUBLIC_PATH')}/world_config.js`,
    `
    export const world_config = {
        base:"${env.get('HOST')}:${env.get('PORT')}",
        service:"Sublymus"
    }
    `
);

// import transmit from '@adonisjs/transmit/services/main'
// import type { HttpContext } from '@adonisjs/core/http'

// transmit.authorizeChannel<{ id: string }>('users/:id', (ctx: HttpContext, { id }) => {
//   return ctx.auth.user!.id === id
// })