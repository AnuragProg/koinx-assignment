import mongoose from "mongoose";

const apiKeySchema = new mongoose.Schema({
   description: {
      type: String,
      required: true,
   }
});

export default mongoose.model('api_keys', apiKeySchema);
