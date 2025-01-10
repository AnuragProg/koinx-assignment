import express from "express";
import { health } from "./src/controllers/health.js"; 
import axios from "axios";
import axiosRetry from "axios-retry";
import { API_PORT, DISABLE_FETCH_AND_STORE_COIN_STATS_JOB, MONGO_URI } from "./src/configs/env.js";
import mongoose from "mongoose";
import { fetchAndStoreCoinStats } from "./src/jobs/cryptoDataFetcher.js";
import { CronJob } from "cron";
import { query } from "express-validator";
import { supportedCoins } from "./src/configs/coins.js";
import { stats } from "./src/controllers/stats.js";
import validateResult from "./src/middlewares/validate-result.js";
import { deviation } from "./src/controllers/deviation.js";

// Setup axios request params
axios.defaults.timeout = 30 * 1000; // 30sec
axiosRetry(axios, {retries: 3, retryDelay: axiosRetry.exponentialDelay});

// Connect to database
mongoose.connect(MONGO_URI)
.then(()=>console.log('Connected to MongoDB'));

// NOTE: Task 1. Fetch and store crypto stats
if(!DISABLE_FETCH_AND_STORE_COIN_STATS_JOB ){
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
}


// Setup Rest API
const app = express();
app.use(express.json());
app.get('/health', health);
app.get('/stats', 
   query('coin')
      .isIn(supportedCoins)
      .withMessage(`Coin must be one of: ${supportedCoins.join(', ')}`),
   validateResult,
   stats,
);
app.get('/deviation',
   query('coin')
      .isIn(supportedCoins)
      .withMessage(`Coin must be one of: ${supportedCoins.join(', ')}`),
   validateResult,
   deviation
);


app.listen(API_PORT, ()=>{
   console.log(`Listening on ${API_PORT}`);
});
