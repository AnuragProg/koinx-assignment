import express from "express";
import { health } from "./src/controllers/health.js"; 
import axios from "axios";
import axiosRetry from "axios-retry";
import { API_PORT, DISABLE_FETCH_AND_STORE_COIN_STATS_JOB, MONGO_URI } from "./src/configs/env.js";
import mongoose from "mongoose";
import { fetchAndStoreCoinStats } from "./src/jobs/cryptoDataFetcher.js";
import { header, query } from "express-validator";
import { supportedCoins } from "./src/configs/coins.js";
import { stats } from "./src/controllers/stats.js";
import validateResult from "./src/middlewares/validate-result.js";
import { deviation } from "./src/controllers/deviation.js";
import apiKeyModel from "./src/models/api-key.js";

// Setup axios request params
axios.defaults.timeout = 30 * 1000; // 30sec
axiosRetry(axios, {retries: 3, retryDelay: axiosRetry.exponentialDelay});

// Connect to database
mongoose.connect(MONGO_URI)
.then(()=>console.log('Connected to MongoDB'));



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

// NOTE: Task 1. Fetch and store crypto stats
app.get('/sync', 
   header('X-Api-Key')
      .isMongoId()
      .withMessage(`X-Api-Key must be set to appropriate api key.`),
   validateResult,
   async function(req, res){

      const key = await apiKeyModel.findOne({_id: req.get('X-Api-Key')})
      if ( !key ){
         return res.status(401).send();
      }

      if(!DISABLE_FETCH_AND_STORE_COIN_STATS_JOB ){
         console.log('Commencing Crypto stats fetch and store op...');
         try{
            await fetchAndStoreCoinStats();
         }catch(err){ console.log(err); }
         console.log('Completed Crypto stats fetch and store op!');
      }
      res.status(202).json({message: 'Fetch and store op triggered'});
   }
);

app.listen(API_PORT, ()=>{
   console.log(`Listening on ${API_PORT}`);
});
