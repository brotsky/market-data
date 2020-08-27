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

export const crowdPublicPortfolios = (container: any, symbol: string, securityId: string) => {
  const ts = Date.now();
  const key = `${DATA_PROVIDERS.TIPSRANK}:crowdPublicPortfolios/?ticker=${symbol}`;
  const url = `${DATA_PROVIDERS.TIPSRANK_API_URL}/crowd/publicPortfolios/?ticker=${symbol}&break=${ts}`;
  return apiRequest(container, key, url, securityId);
}

export const dividendsGetByTicker = (container: any, symbol: string, securityId: string) => {
  const ts = Date.now();
  const key = `${DATA_PROVIDERS.TIPSRANK}:dividendsGetByTicker/?name=${symbol}`;
  const url = `${DATA_PROVIDERS.TIPSRANK_API_URL}/dividends/getByTicker/?name=${symbol}&break=${ts}`;
  return apiRequest(container, key, url, securityId);
}

export const dividendsGetGraphDetailsByTicker = (container: any, symbol: string, securityId: string) => {
  const ts = Date.now();
  const key = `${DATA_PROVIDERS.TIPSRANK}:dividendsGetGraphDetailsByTicker/?ticker=${symbol}`;
  const url = `${DATA_PROVIDERS.TIPSRANK_API_URL}/dividends/getGraphDetailsByTicker/?ticker=${symbol}&break=${ts}`;
  return apiRequest(container, key, url, securityId);
}

export const compareSimilar = (container: any, symbol: string, securityId: string) => {
  const ts = Date.now();
  const number = 5;
  const key = `${DATA_PROVIDERS.TIPSRANK}:compare/similar/${symbol}/?num=${number}`;
  const url = `${DATA_PROVIDERS.TIPSRANK_API_URL}/compare/similar/${symbol}/?num=${number}&break=${ts}`;
  return apiRequest(container, key, url, securityId);
}

export const getNews = (container: any, symbol: string, securityId: string) => {
  const ts = Date.now();
  const key = `${DATA_PROVIDERS.TIPSRANK}:getNews/?ticker=${symbol}`;
  const url = `${DATA_PROVIDERS.TIPSRANK_API_URL}/stocks/getNews/?ticker=${symbol}&break=${ts}`;
  return apiRequest(container, key, url, securityId);
}

export const getHistoricalPriceExtended = (container: any, symbol: string, securityId: string) => {
  const ts = Date.now();
  const key = `${DATA_PROVIDERS.TIPSRANK}:getHistoricalPriceExtended/?name=${symbol}&daysBack=1095`;
  const url = `${DATA_PROVIDERS.TIPSRANK_API_URL}/stocks/getHistoricalPriceExtended/?name=${symbol}&break=${ts}&daysBack=1095`;
  return apiRequest(container, key, url, securityId);
}

export const getRealTimeQuotes = (container: any, symbol: string, securityId: string) => {
  const ts = Date.now();
  const key = `${DATA_PROVIDERS.TIPSRANK}:details/GetRealTimeQuotes/?tickers=${symbol}`;
  const url = `${DATA_PROVIDERS.TIPSRANK_MARKET_API_URL}/details/GetRealTimeQuotes/?tickers=${symbol}&break=${ts}`;
  return apiRequest(container, key, url, securityId);
}

export const getStockDetailsAsync = (container: any, symbol: string, securityId: string) => {
  const ts = Date.now();
  const key = `${DATA_PROVIDERS.TIPSRANK}:details/getstockdetailsasync/?tickers=${symbol}`;
  const url = `${DATA_PROVIDERS.TIPSRANK_MARKET_API_URL}/details/getstockdetailsasync/?id=${symbol}&break=${ts}`;
  return apiRequest(container, key, url, securityId);
}

export const allTipsrank = async (container: any, symbol: string, securityId: string) => {
  const _getStockData = await getStockData(container, symbol, securityId);
  const _getChartPageData = await getChartPageData(container, symbol, securityId);
  const _crowdPublicPortfolios = await crowdPublicPortfolios(container, symbol, securityId);
  const _dividendsGetByTicker = await dividendsGetByTicker(container, symbol, securityId);
  const _dividendsGetGraphDetailsByTicker = await dividendsGetGraphDetailsByTicker(container, symbol, securityId);
  const _compareSimilar = await compareSimilar(container, symbol, securityId);
  const _getNews = await getNews(container, symbol, securityId);
  const _getHistoricalPriceExtended = await getHistoricalPriceExtended(container, symbol, securityId);
  const _getRealTimeQuotes = await getRealTimeQuotes(container, symbol, securityId);
  const _getStockDetailsAsync = await getStockDetailsAsync(container, symbol, securityId);
  return {
    getStockData: _getStockData,
    getChartPageData: _getChartPageData,
    crowdPublicPortfolios: _crowdPublicPortfolios,
    dividendsGetByTicker: _dividendsGetByTicker,
    dividendsGetGraphDetailsByTicker: _dividendsGetGraphDetailsByTicker,
    compareSimilar: _compareSimilar,
    getNews: _getNews,
    getHistoricalPriceExtended: _getHistoricalPriceExtended,
    getRealTimeQuotes: _getRealTimeQuotes,
    getStockDetailsAsync: _getStockDetailsAsync,
  }
}