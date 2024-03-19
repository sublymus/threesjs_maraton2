import fs  from "fs/promises";
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