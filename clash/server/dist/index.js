import express from 'express';
import "dotenv/config";
const app = express();
import path from 'path'; //importing path module to handle file and directory paths,used to set the views directory and serve static files
import { fileURLToPath } from "url"; //importing fileURLToPath from url module to convert a URL to a file path,used to get the current file's directory path
const _dirname = path.dirname(fileURLToPath(import.meta.url)); //getting the directory name of the current file,used to set the views directory and serve static files
app.use(express.json()); //middleware to parse JSON bodies used to handle incoming requests and take action based on the request data
app.use(express.urlencoded({ extended: false })); // middleware to parse URL-encoded bodies,used to handle form submissions and other URL-encoded data,take input  data from the request body and make it available in the req.body object.
app.set("view engine", "ejs"); //set the view engine to ejs,used to render dynamic HTML pages on the server side
app.set("views", path.resolve(_dirname, "./views")); //set the views directory to the current file's directory,used to locate the EJS templates for rendering and serving dynamic content 
app.get("/", (req, res) => {
    res.send("Hello World");
});
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
