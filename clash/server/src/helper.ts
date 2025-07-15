import { ZodError } from "zod"; 

import ejs from "ejs";
import { fileURLToPath } from "url";
import * as path from "path";
import moment from "moment";

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