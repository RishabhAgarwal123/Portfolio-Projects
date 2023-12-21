import express from 'express';
import { config } from 'dotenv'
import user from './routes/userRoute.js';
import course from "./routes/courseRoute.js";

config({
    path: './config/config.env'
});

const app = express();

app.use('/api/v1', course);
app.use('/api/v1', user);

export default app;