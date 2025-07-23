import express from 'express';
import "dotenv/config";
const app = express();
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from "url";
import fileUpload from 'express-fileupload'; // Importing express-fileupload for handling file uploads
import Routes from './routes/index.js';
import cors from 'cors'; // Importing CORS middleware to enable Cross-Origin Resource Sharing
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { emailQueue, emailQueueName } from './jobs/EmailJob.js';
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(appLimiter);
app.use(cors());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
app.use(express.static("public")); // Serve static files from the public directory, allowing access to files like images, stylesheets, and scripts.
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));
//**Routes */
app.use(Routes);
app.get("/", async (req, res) => {
    //res.send("Hello World");
    const html = await ejs.renderFile(path.resolve(__dirname + "/views/emails/welcome.ejs"), { name: "Setu" }); //render the EJS template with a name variable
    //    await  sendEmail("satorugojo0236sukuna@gmail.com", "Welcome to Clash", html); //send the email using the sendEmail function
    await emailQueue.add(emailQueueName, { to: "satorugojo0236sukuna@gmail.com", subject: "Welcome", body: html });
    res.json({ msg: "Email send successfully" });
    //return res.render("emails/welcome",{name: "Setu K. Jha"}); //render the welcome email template with a name variable
});
//**Queues*/
import "./jobs/index.js";
import { appLimiter } from './config/rateLimit.js';
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
