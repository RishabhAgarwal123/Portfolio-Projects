import express from 'express';
import { config } from 'dotenv'
import user from './routes/userRoute.js';
import course from "./routes/courseRoute.js";
import ErrorMiddleware from './middlewares/Error/errorMiddleware.js'
import cookieParser from 'cookie-parser';

config({
    path: './config/config.env'
});

const app = express();

// Using middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

app.use('/api/v1', course);
app.use('/api/v1', user);

app.use(ErrorMiddleware);

export default app;