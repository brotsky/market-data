import cuid from 'cuid'
import axios from 'axios'
import moment from 'moment'
import get from 'lodash/get'

import { DEPENDENCIES } from '../../utils/constants';

export const apiRequest = async (container: any, key: string, url: string, securityId: string) => {
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
  const expirationDate = error ? moment().add(1, 'hour') : moment().add(1, 'day');

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
