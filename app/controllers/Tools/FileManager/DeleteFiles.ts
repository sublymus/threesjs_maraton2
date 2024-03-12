
import env from "#start/env";
import fs from "fs";


export async function deleteFiles(id: string,fieldName?:string): Promise<number> {
    let deletedFileCounter = 0;
    
  fs.readdir(env.get("FILE_STORAGE"), (_, files) => {
    files?.forEach(fileName => {
      const selector = fieldName ? `${fieldName}_${id}`:id;
     if(fileName.includes(selector)){
      const url = `${env.get("FILE_STORAGE")}/${fileName}`;
      fs.unlink(url, function (err) {
        if (err){
          return fs.rmSync(url, { recursive: true, force: true });;
        }
        console.log("file deleted successfully");
      });
       console.log(deletedFileCounter++,fileName);
     }
    });
  });
  
    return deletedFileCounter;
  }