import {
  getStockData,
  getChartPageData,
  crowdPublicPortfolios,
  dividendsGetByTicker,
  dividendsGetGraphDetailsByTicker,
  compareSimilar,
  getNews,
  getHistoricalPriceExtended,
  getRealTimeQuotes,
  getStockDetailsAsync,
  allTipsRankForSecurity,
  screenerGetStocksList,
} from './tipsrank';
import {
  stockBook,
  allIexcloudForSecurity,
} from './iexcloud';

export const tipsrankService = {
  getStockData,
  getChartPageData,
  crowdPublicPortfolios,
  dividendsGetByTicker,
  dividendsGetGraphDetailsByTicker,
  compareSimilar,
  getNews,
  getHistoricalPriceExtended,
  getRealTimeQuotes,
  getStockDetailsAsync,
  allTipsRankForSecurity,
  screenerGetStocksList,
};

export const iexcloudService = {
  stockBook,
  allIexcloudForSecurity,
};
