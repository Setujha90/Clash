import express, {Application, Request, Response }from 'express';
import "dotenv/config";
const app: Application = express();

app.get("/", (req: Request, res: Response) => {
res.send("Hello World");
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
