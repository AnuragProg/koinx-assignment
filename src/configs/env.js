
const API_PORT = process.env.API_PORT ?? 3000;
const COIN_GECKO_API_KEY = process.env.COIN_GECKO_API_KEY;
const MONGO_URI = process.env.MONGO_URI ?? "mongodb://localhost:27017/koinx_assignment";


export {
   API_PORT,
   COIN_GECKO_API_KEY,
   MONGO_URI
};
