import express, {Application, Request, Response }from 'express';
import "dotenv/config";
const app: Application = express();
import ejs from 'ejs'; //importing ejs module to render EJS templates,used to create dynamic HTML pages on the server side
import path from 'path';//importing path module to handle file and directory paths,used to set the views directory and serve static files
import {fileURLToPath} from "url"; //importing fileURLToPath from url module to convert a URL to a file path,used to get the current file's directory path
import { sendEmail } from './config/mail.js'; //importing sendEmail function from mail module,used to send emails using the configured SMTP transporter
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); //getting the directory name of the current file,used to set the views directory and serve static files

import { emailQueue, emailQueueName } from './jobs/EmailJob.js';
app.use(express.json()); //middleware to parse JSON bodies used to handle incoming requests and take action based on the request data
app.use(express.urlencoded({ extended: false }));// middleware to parse URL-encoded bodies,used to handle form submissions and other URL-encoded data,take input  data from the request body and make it available in the req.body object.

app.set("view engine", "ejs"); //set the view engine to ejs,used to render dynamic HTML pages on the server side
app.set("views", path.resolve(__dirname ,"./views")); //set the views directory to the current file's directory,used to locate the EJS templates for rendering and serving dynamic content 


app.get("/", async(req: Request, res: Response) => {
//res.send("Hello World");
 const html = await ejs.renderFile(path.resolve(__dirname + "/views/emails/welcome.ejs"), {name: "Setu"}); //render the EJS template with a name variable
//    await  sendEmail("satorugojo0236sukuna@gmail.com", "Welcome to Clash", html); //send the email using the sendEmail function

await emailQueue.add(emailQueueName, {to:"satorugojo0236sukuna@gmail.com",subject: "Welcome",body:html}) //add a job to the email queue with the emailQueueName and data)
 res.json({msg: "Email send successfully"}); //send a response indicating that the email was sent successfully

 //return res.render("emails/welcome",{name: "Setu K. Jha"}); //render the welcome email template with a name variable
});

//**Queues*/
import "./jobs/index.js"; //importing the jobs module to initialize and process email jobs in the queue

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
