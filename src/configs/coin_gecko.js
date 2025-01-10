const coinGeckoBaseUrl = 'https://api.coingecko.com/api/v3';
const getCoinGeckoCoinDataURL = (coinId)=>`${coinGeckoBaseUrl}/coins/${coinId}?tickers=false&community_data=false&developer_data=false`;


export {
   getCoinGeckoCoinDataURL,
};
