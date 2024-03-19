
import fs from "fs";
import { moveFile } from "./CreateFiles.js";
import { HttpContext } from "@adonisjs/core/http";
import env from "#start/env";

type OptionsType = {
  maxSize?: number;
  min?: number;
  max?: number;
  extname?: string[];
  compress?:'none' | 'img' | 'zip';
  throwError?: boolean;
};

export async function updateFiles({
  request,
  table_id,
  table_name,
  column_name,
  options,
  lastUrls,
  newPseudoUrls,
}: {
  lastUrls: string;
  newPseudoUrls: string | undefined;
  request: HttpContext["request"];
  table_id: string;
  table_name: string;
  column_name: string;
  options?: OptionsType;
}): Promise<string[]> {
  let _newPseudoUrls: string[] = [];
  let _lastUrls: string[] = [];
  const { extname, max, maxSize, min, compress,throwError } = options || {};

  try {
    _lastUrls = JSON.parse(lastUrls);
    if (!Array.isArray(_lastUrls)) _lastUrls = [];
  } catch (error) {}
  try {
    console.log({ newPseudoUrls });
    if (newPseudoUrls) {
      _newPseudoUrls = JSON.parse(newPseudoUrls);
      console.log({ _newPseudoUrls });
    }
    if (!Array.isArray(_newPseudoUrls)) _newPseudoUrls = [];
  } catch (error) {}

  const pointer = column_name + "_";
  let fileLength = 0;
  // console.log({_newPseudoUrls});

  const promisesAdd = _newPseudoUrls.map((pseudoUrl, i) => {
    console.log({ pseudoUrl });

    try {
      if (pseudoUrl.startsWith(pointer)) {
        const file = request.file(pseudoUrl);
        if (!file) return Promise.reject(null);
        if (extname && !extname.includes(file.extname || "")) {
          if (throwError)
            throw new Error("File bad Extension : " + file?.extname);
          else return Promise.reject(null);
        }
        if (maxSize && file.size > maxSize) {
          if (throwError)
            throw new Error("File  size must be < " + file.size + " byte");
          else return Promise.reject(null);
        }
        fileLength++;

        return moveFile({ file, column_name, count: i, table_id, table_name ,compress });
      } else {
        const filePath = `${env.get("FILE_STORAGE_PATH")}/${pseudoUrl}`;
        const fileUrl = `${env.get("FILE_STORAGE_URL")}/${pseudoUrl}`;
        if (fs.existsSync(filePath)) {
          fileLength++;
          return Promise.resolve(fileUrl);
        } else return Promise.reject(null);
      }
    } catch (error) {
      return Promise.reject(null);
    }
  });

  let newUrls: string[] = [];
  console.log({ fileLength, lastUrls, newPseudoUrls });

  if (min && fileLength < min) {
    if (throwError) throw new Error("number of Files must be >= " + min);
    else return [];
  }
  if (max && fileLength > max) {
    if (throwError) throw new Error("number of Files must be <= " + min);
    else return [];
  }

  newUrls = (await Promise.allSettled(promisesAdd))
    .filter((f) => f.status === "fulfilled")
    .map((m) => (m as any).value);

  console.log("### _lastUrls ", _lastUrls);
  console.log("### newUrls ", newUrls);

  _lastUrls.map((lastUrl) => {
    if (!newUrls.includes(lastUrl)) {
      const filePath = `${env.get("FILE_STORAGE_PATH")}/${lastUrl}`;
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, function (err) {
          if (err) return console.log(err);
        });
      }
    }
  });
  return newUrls;
}
