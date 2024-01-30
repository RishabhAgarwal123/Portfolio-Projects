import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/get", (req: Request, res: Response) => {
    res.json({ message: "Hello from express" });
});

app.listen(4000, () => {
    console.log("Server is running at localhost: 4000");
})