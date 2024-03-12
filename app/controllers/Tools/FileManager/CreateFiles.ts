import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'
import sharp from "sharp";
import fs from 'fs/promises'
type FileType = ReturnType<HttpContext["request"]["file"]>;
type OptionsType = {
  maxSize?: number;
  min?: number;
  max?: number;
  extname?: string[];
  compress?: 'none' | 'img' | 'zip';
  throwError?: boolean;
};

let isDirExist = false;

export async function createFiles({
  request,
  table_id,
  table_name,
  column_name,
  options,
}: {
  request: HttpContext["request"];
  table_id: string;
  table_name: string;
  column_name: string;
  options?: OptionsType;
}): Promise<string[]> {
  let count = 0;
  const promises: Promise<any>[] = [];
  const filesList: FileType[] = [];
  const { extname, max, maxSize, min, throwError, compress } = options || {};
  while (true) {
    const file = request.file(`${column_name}_${count++}`);
    if (!file) {
      break;
    }
    filesList.push(file);
  }
  if (min && filesList.length < min) {
    if (throwError) throw new Error("number of Files must be >= " + min);
    else return [];
  }
  if (max && filesList.length > max) {
    if (throwError) throw new Error("number of Files must be <= " + min);
    else return [];
  }

  filesList.forEach((file, i) => {
    if (!file) return;
    if (extname && !extname.includes(file.extname || "")) {
      if (throwError) throw new Error("File bad Extension : " + file?.extname);
      else return;
    }
    if (maxSize && file.size > maxSize) {
      if (throwError)
        throw new Error("File  size must be < " + file.size + " byte");
      else return;
    }

    promises.push(
      moveFile({
        column_name,
        compress,
        count: i,
        file,
        table_id,
        table_name,
      })
    );
  });

  await createDir(env.get("FILE_STORAGE"))

  return (await Promise.allSettled(promises))
    .filter((f) => f.status == "fulfilled")
    .map((m) => (m as any).value); //urls
}

async function createDir(dir: string) {
  try {
    await fs.stat(dir);
  } catch (error) {
    await fs.mkdir(env.get("FILE_STORAGE"));
  }
}

export function moveFile({
  column_name,
  file,
  table_id,
  compress,
  table_name,
  count,
}: {
  file: FileType;
  compress?: 'none' | 'img' | 'zip';
  table_id: string;
  table_name: string;
  column_name: string;
  count: number;
}) {
  if (!file) return Promise.reject(null);
  return new Promise(async (rev, rej) => {

    //  console.log({state});

    // if()

    try {
      const fileName = `${Date.now().toString(32)}_${Math.round(
        Math.random() * 10e6
      ).toString(36)}${count}_${table_name}_${column_name}_${table_id}.webp`;
      const stat = await sharp(file.tmpPath).metadata();
      
      let sharpOBJ = sharp(file.tmpPath);

      if (compress && compress == 'img') {
        let iw = 0;
        let ih = 0;
        let a = 1;
        const c = 1280;
        let requiredResize = false;
        if (stat.height && stat.width) {
          requiredResize = (stat.width > 1920 || stat.height > 1920)
          a = stat.width / stat.height
          if (a > 1) {
            iw = c;
            ih = c / a;
          } else {
            ih = c;
            iw = a * c
          }
        }
        iw = Math.trunc(iw);
        ih = Math.trunc(ih);
        if (requiredResize) {
          sharpOBJ = sharpOBJ.resize(iw ? {
            width: iw,
            height: ih
          } : c)
        }
        sharpOBJ = sharpOBJ.webp({ quality: 90 })
      }

        // .composite([
        //   {
        //     input: "./logo_joumiadeals2.png",
        //     top: ih - lh,
        //     left: iw - lw,
        //   },
        // ])
        sharpOBJ.toFile(`${env.get("FILE_STORAGE")}/${fileName}`, () => {
          rev(fileName)
        });
      
    } catch (error) {
      rej(null);
    }
  });
}
