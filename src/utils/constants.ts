import { isProduction } from '../config/vars';

export const DEPENDENCIES = {
  DB: 'db',
  CONTAINER: 'container',
  SECURITY_REPOSITORY: 'securityRepository',
  REQUEST_LOG_REPOSITORY: 'requestLogRespository',
};

export const DATA_PROVIDERS = {
  TIPSRANK: 'tipsrank',
  TIPSRANK_API_URL: 'https://www.tipranks.com/api',
  TIPSRANK_MARKET_API_URL: 'https://market.tipranks.com/api',
  IEXCLOUD: isProduction ? 'iexcloud_production' : 'iexcloud_sandbox',
  IEXCLOUD_API_URL: isProduction ? 'https://cloud.iexapis.com/stable' : 'https://sandbox.iexapis.com/stable',
};
