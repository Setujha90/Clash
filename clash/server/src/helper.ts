import { ZodError } from "zod"; 

import ejs from "ejs";
import { fileURLToPath } from "url";
import * as path from "path";
import moment from "moment";
import { supportedMimeTypes } from "./config/filesystem.js"; 

import { UploadedFile } from "express-fileupload"; 
import {v4 as uuid4} from 'uuid'
import fs from "fs"; // Importing fs module to handle file system operations


export const formatZodError = (error: ZodError):any => { // Function to format Zod validation errors.
    // This function takes a ZodError object and formats it into a more readable structure.
    let errors: any = {};
    error.issues?.map((issue) => {
        errors[issue.path?.[0]] = issue.message;
    });
    return errors;
}



export const renderEmailEjs = async (fileName: string, payload: any) => { // Function to render an EJS template for emails.It takes a file name and a payload object as parameters,and returns the rendered HTML string.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const html = await ejs.renderFile(
    __dirname + `/views/emails/${fileName}.ejs`,
    payload
);
return html;
};

export const checkDateHourDiff = (date: Date | string): number =>{
    const now = moment();
    const tokenSendAt = moment(date);
    const diffence = moment.duration(now.diff(tokenSendAt));
    return diffence.asHours();
}


//Zod cant able to validate the file upload, so we need to validate it manually
export const imageValidation = (size:number , mime: string): string | null =>{
 //mine types are used to find the type of file we can upload we configure it manually in config
    if(byteToMb(size) > 2){
        return "File size must be less than 2MB";
    }
    else if (!supportedMimeTypes.includes(mime)){
        return "File type is not supported";
    }
    return null; // If the file size and type are valid, return null indicating no error.
}

export const byteToMb = (bytes: number): number => {
    return bytes / (1024 * 1024); 
}

export const uploadFile = async (image:UploadedFile) =>{
    const imgExt = image?.name.split(".")
    const imageName = uuid4() + "." +imgExt[1];
    const uploadPath = process.cwd() + "/public/images/" + imageName; 
    image.mv(uploadPath, (err: Error | null) => {
        if (err) {
            throw new Error("File upload failed");
        }
    });
    return imageName; // Return the name of the uploaded image file.
}

export const removeImage = (imageName: string) => {
    const path = process.cwd() + "/public/images/" + imageName;
    if (fs.existsSync(path)) {
    fs.unlinkSync(path);
    }
};