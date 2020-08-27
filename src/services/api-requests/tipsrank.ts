import { DATA_PROVIDERS } from '../../utils/constants';
import { apiRequest } from './api-request';

export const getStockData = (container: any, symbol: string, securityId: string) => {
  const ts = Date.now();
  const key = `${DATA_PROVIDERS.TIPSRANK}:getData/?name=${symbol}&benchmark=1&period=3`;
  const url = `${DATA_PROVIDERS.TIPSRANK_API_URL}/stocks/getData/?name=${symbol}&benchmark=1&period=3&break=${ts}`;
  return apiRequest(container, key, url, securityId);
}

export const getChartPageData = (container: any, symbol: string, securityId: string) => {
  const ts = Date.now();
  const key = `${DATA_PROVIDERS.TIPSRANK}:getChartPageData/?ticker=${symbol}&benchmark=1&period=2`;
  const url = `${DATA_PROVIDERS.TIPSRANK_API_URL}/stocks/getChartPageData/?ticker=${symbol}&benchmark=1&period=2&break=${ts}`;
  return apiRequest(container, key, url, securityId);
}

// https://www.tipranks.com/api/crowd/publicPortfolios/?ticker=AMZN&break=1598487190025
// https://www.tipranks.com/api/dividends/getByTicker/?name=AMZN&break=1598487190025
// https://www.tipranks.com/api/dividends/getGraphDetailsByTicker/?ticker=AMZN&break=1598487190026
// https://www.tipranks.com/api/compare/similar/AMZN/?num=5&break=1598487190027
// https://www.tipranks.com/api/stocks/getNews/?break=1598487190796&ticker=AMZN
// https://www.tipranks.com/api/stocks/getHistoricalPriceExtended/?break=1598487190797&name=AMZN&daysBack=1095
// https://market.tipranks.com/api/details/GetRealTimeQuotes/?tickers=AMZN&break=1598487190797
// https://market.tipranks.com/api/details/getstockdetailsasync/?break=1598487190799&id=AMZN