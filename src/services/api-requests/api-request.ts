import * as cuid from 'cuid'
import axios from 'axios'
import * as moment from 'moment'
import { get, isNil } from 'lodash'

import { DEPENDENCIES } from '../../utils/constants';

export const apiRequest = async (container: any, key: string, url: string, securityId: string = null, cacheExpirationDate: any = null) => {
  const requestLogRepository = container.get(DEPENDENCIES.REQUEST_LOG_REPOSITORY)
  const cache = await requestLogRepository.getOne({
    key,
  }, {
    "RequestLog.expirationDate": "DESC"
  });
  if (cache && moment().isBefore(cache.expirationDate)) {
    return cache.value;
  }
  const apiRequest = await axios
    .get(url)
    .catch(err => err);

  const value = get(apiRequest, 'data', null);
  const status = get(apiRequest, 'response.status', 200)
  const error = status !== 200;
  let expirationDate = moment().add(1, 'day');
  if (error) expirationDate = moment().add(1, 'hour');
  if (!isNil(cacheExpirationDate)) expirationDate = moment(cacheExpirationDate);

  await requestLogRepository.create({
    id: cuid(),
    key,
    value,
    expirationDate,
    security: securityId,
    error,
    status,
  })

  return value;
}
