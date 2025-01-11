import coinStatsModel from "../models/stats.js";

// NOTE: Task 2. Return latest coin stat
async function stats(req, res){
   const {coin} = req.query;
   const coinStat = await coinStatsModel.findOne({coinId: coin}).sort({createdAt: -1});
   if (coinStat) {
      return res.status(200).json({
         price: coinStat.currentPrice,
         marketCap: coinStat.marketCap,
         "24hChange": coinStat["24hChange"]
      });
   }
   res.status(404).json({message: "not found"});
}

export {
   stats
};
