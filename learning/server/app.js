import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import user from './routes/userRoute.js';
import course from "./routes/courseRoute.js";
import payment from './routes/paymentRoute.js';
import other from './routes/otherRoute.js';
import ErrorMiddleware from './middlewares/Error/errorMiddleware.js'
import cookieParser from 'cookie-parser';

config({
    path: './config/config.env'
});

const app = express();

const corsOptions = {
    //To allow requests from client
    origin: [
        "http://localhost:3000",
        "http://127.0.0.1",
        "http://104.142.122.231",
    ],
    credentials: true,
    exposedHeaders: ["Set-cookie"],
};

// Using middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/api/v1', course);
app.use('/api/v1', other);
app.use('/api/v1', payment);
app.use('/api/v1', user);

app.use(ErrorMiddleware);

export default app;