import { DATA_PROVIDERS } from '../../utils/constants';
import { apiRequest } from './api-request';

export const getStockData = (container: any, symbol: string, securityId: string) => {
  const key = `${DATA_PROVIDERS.TIPSRANK}:getData/?name=${symbol}&benchmark=1&period=3`;
  const url = `${DATA_PROVIDERS.TIPSRANK_API_URL}/stocks/getData/?name=${symbol}&benchmark=1&period=3`;
  return apiRequest(container, key, url, securityId);
}

export const getChartPageData = (container: any, symbol: string, securityId: string) => {
  const key = `${DATA_PROVIDERS.TIPSRANK}:getChartPageData/?ticker=${symbol}&benchmark=1&period=2`;
  const url = `${DATA_PROVIDERS.TIPSRANK_API_URL}/stocks/getChartPageData/?ticker=${symbol}&benchmark=1&period=2`;
  return apiRequest(container, key, url, securityId);
}
