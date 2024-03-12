import env from "#start/env";
import { HttpContext } from "@adonisjs/core/http";
import AdmZip from "adm-zip";

type FileType = ReturnType<HttpContext["request"]["file"]>;

export async function unZipDir({
  column_name,
  file,
  table_id,
  table_name,
  // lastUrls
}: {
  // lastUrls:string;
  file: FileType;
  table_id: string;
  table_name: string;
  column_name: string;
}) {
  const dirName = `${table_name}_${column_name}_${table_id}`;
  const dirUrl = `${env.get('FILE_STORAGE')}/${dirName}`;
  const zip = new AdmZip(file?.tmpPath);
  zip.extractAllTo(dirUrl, /** overwrite **/ true)
  return dirUrl;

}