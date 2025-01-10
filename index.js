import express from "express";
import { health } from "./src/controllers/health.js"; 

process.env.PORT ??= 3000;
const app = express();

app.get('/health', health);

app.listen(process.env.PORT, ()=>{
   console.log(`Listening on ${process.env.PORT}`);
});
