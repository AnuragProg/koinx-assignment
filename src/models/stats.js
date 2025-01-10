import mongoose from "mongoose";
import { supportedCoins } from "../configs/coins.js";

const coinStatsSchema = new mongoose.Schema({
   coinId: {
      type: String,
      required: true,
      enum: supportedCoins,
   },
   currentPrice: {
      type: Number,
      required: true,
   },
   marketCap: {
      type: Number,
      required: true,
   },
   "24hChange": {
      type: Number,
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now
   },
}, {timestamps: false});

coinStatsSchema.index({coinId: 1, createdAt: -1});

export default mongoose.model('coin_stats', coinStatsSchema);
