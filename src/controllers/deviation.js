import coinStatsModel from "../models/stats.js";

// NOTE: Task 3. Calculate std deviation of latest 100 crypto coins
async function deviation(req, res){
   const {coin} = req.query;
   const result = await coinStatsModel.aggregate([
      // Find coins with id
      { $match: { coinId: coin } },
      // Retrieve latest coins
      { $sort: {createdAt: -1 } },
      // Drop rest of the coins
      { $limit: 100 },
      // Calculate std deviation on remaining coins price
      {
         $group: {
            _id: null,
            deviation: {$stdDevPop: "$currentPrice" }
         }
      },
      // Drop unnecessary fields
      {
         $project: {
            _id: 0,
               deviation: 1,
         }
      }
   ]);
   res.status(200).json(result[0]);
}

export {
   deviation
};
