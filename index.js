import express from "express";
import { health } from "./src/controllers/health.js"; 
import axios from "axios";
import axiosRetry from "axios-retry";
import { API_PORT, MONGO_URI } from "./src/configs/env.js";
import mongoose from "mongoose";
import { fetchAndStoreCoinStats } from "./src/jobs/cryptoDataFetcher.js";
import { CronJob } from "cron";

// Setup axios request params
axios.defaults.timeout = 30 * 1000; // 30sec
axiosRetry(axios, {retries: 3, retryDelay: axiosRetry.exponentialDelay});

// Connect to database
mongoose.connect(MONGO_URI)
.then(()=>console.log('Connected to MongoDB'));

// NOTE: Task 1. Fetch and store crypto stats
CronJob.from({
   cronTime: '0 0 */2 * * *',
   onTick: async function (){
      console.log('Commencing Crypto stats fetch and store op...');
      try{
         await fetchAndStoreCoinStats();
      }catch(err){ console.log(err); }
      console.log('Completed Crypto stats fetch and store op!');
   },
   onComplete: null,
   start: true,
});


// Setup Rest API
const app = express();
app.use(express.json());
app.get('/health', health);


app.listen(API_PORT, ()=>{
   console.log(`Listening on ${API_PORT}`);
});
