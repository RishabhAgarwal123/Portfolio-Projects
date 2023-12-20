import express from 'express';
import { config } from 'dotenv'
import { Course } from './models/courseModel.js';
import { User } from './models/userModel.js';

config({
    path: './config/config.env'
});

const app = express();
app.use('/api/v1', Course);
app.use('/api/v1', User);

export default app;