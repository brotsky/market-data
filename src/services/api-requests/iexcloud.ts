import * as moment from 'moment'

import { IEXCLOUD_API_KEY } from '../../config/vars';
import { DATA_PROVIDERS } from '../../utils/constants';
import { apiRequest } from './api-request';

export const stockBook = (container: any, symbol: string, securityId: string) => {
  const cacheExpirationDate = moment().add(15, 'minutes');
  const key = `${DATA_PROVIDERS.IEXCLOUD}:stock/${symbol}/book`;
  const url = `${DATA_PROVIDERS.IEXCLOUD_API_URL}/stock/${symbol}/book?token=${IEXCLOUD_API_KEY}`;
  return apiRequest(container, key, url, securityId, cacheExpirationDate);
}

export const stockChart5day = (container: any, symbol: string, securityId: string) => {
  const cacheExpirationDate = moment().add(12, 'hours'); // this should change to 4pm EST, when the data refreshes
  const key = `${DATA_PROVIDERS.IEXCLOUD}:stock/${symbol}chart/5d`;
  const url = `${DATA_PROVIDERS.IEXCLOUD_API_URL}/stock/${symbol}/chart/5d?token=${IEXCLOUD_API_KEY}`;
  return apiRequest(container, key, url, securityId, cacheExpirationDate);
}

export const allIexcloudForSecurity = async (container: any, symbol: string, securityId: string) => {
  const _stockBook = await stockBook(container, symbol, securityId);
  const _stockChart5day = await stockChart5day(container, symbol, securityId);
  return {
    stockBook: _stockBook,
    stockChart5day: _stockChart5day,
  }
}
