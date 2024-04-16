import { PORT } from './config.js';
import express, { json } from "express";
import mysql from 'mysql';
import mongoose from 'mongoose';
import cors from "cors";
import indexRoutes from './routes/index.routes.js'

const app = express()

app.use(json())
app.use(cors())
app.use(indexRoutes)


app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}/`);
});
