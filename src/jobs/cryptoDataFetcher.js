import axios from "axios";
import { supportedCoins } from "../configs/coins.js";
import { getCoinGeckoCoinDataURL } from "../configs/coin_gecko.js";
import { COIN_GECKO_API_KEY } from "../configs/env.js";
import statsModel from "../models/stats.js";


async function fetchAndStoreCoinStats(){
   const coinStats = await Promise.all(
      supportedCoins.map(async coinId=>{
         const response = await axios.get(getCoinGeckoCoinDataURL(coinId), {
            headers: {
               Accept: 'application/json',
               'x-cg-demo-api-key': COIN_GECKO_API_KEY,
            },
         });
         const body = response.data;
         return {
            coinId,
            currentPrice: body.market_data.current_price.usd,
            marketCap: body.market_data.market_cap.usd,
            '24hChange': body.market_data.price_change_24h,
         };
      })
   );

   await statsModel.bulkWrite(coinStats.map(stat=>{
      return {
         insertOne: {
            document: stat,
         },
      };
   }));
}

export {
   fetchAndStoreCoinStats,
};
