const express = require('express')
const RequestQueue = require('node-request-queue');
const cuid = require('cuid')
const axios = require('axios')
const moment = require('moment')

import registerDependencies from './services/register-dependencies';
import { NODE_PORT } from './config/vars';
import { DEPENDENCIES, DATA_PROVIDERS } from './utils/constants';

var app = express()

const start = async () => {
  const container = await registerDependencies()
  const securityRepository = container.get(DEPENDENCIES.SECURITY_REPOSITORY)
  const requestLogRepository = container.get(DEPENDENCIES.REQUEST_LOG_REPOSITORY)

  app.get('/', async (req: any, res: any) => {
    const securities = await securityRepository.get({})
    res.send({ securities })
  })

  app.get('/security/:symbol', async (req: any, res: any) => {
    const { symbol } = req.params;

    const existingSecurity = await securityRepository.getOne({ symbol });
    const security = existingSecurity ? existingSecurity : await securityRepository.create({
      id: cuid(),
      symbol,
    })

    const getChartPageData = async (symbol: string) => {
      const key = `${DATA_PROVIDERS.TIPSRANK}:getChartPageData/?ticker=${symbol}&benchmark=1&period=2`;

      // return cache found in database
      const cache = await requestLogRepository.getOne({
        key,
      }, {
        "RequestLog.expirationDate": "DESC"
      });
      if (cache && moment().isBefore(cache.expirationDate)) {
        return cache.value;
      }

      const response = await axios.get(`https://www.tipranks.com/api/stocks/getChartPageData/?ticker=${symbol}&benchmark=1&period=2`);
      const { data } = response;
      await requestLogRepository.create({
        id: cuid(),
        key,
        value: data,
        expirationDate: moment().add(1, 'day'),
        security: security.id,
      })
      return data;
    }

    const getStockData = async (symbol: string) => {
      const key = `${DATA_PROVIDERS.TIPSRANK}:getData/?name=${symbol}&benchmark=1&period=3`;

      // return cache found in database
      const cache = await requestLogRepository.getOne({
        key,
      }, {
        "RequestLog.expirationDate": "DESC"
      });
      if (cache && moment().isBefore(cache.expirationDate)) {
        return cache.value;
      }

      const response = await axios.get(`https://www.tipranks.com/api/stocks/getData/?name=${symbol}&benchmark=1&period=3`);
      const { data } = response;
      await requestLogRepository.create({
        id: cuid(),
        key,
        value: data,
        expirationDate: moment().add(1, 'day'),
        security: security.id,
      })
      return data;
    }

    const stockData = await getStockData(symbol);
    const chartPageData = await getChartPageData(symbol);
    const tipsrank = {
      stockData,
      chartPageData,
    };
    return res.send({ tipsrank })
  })

  app.post('/security/:symbol/subscribe', async (req: any, res: any) => {
    const { symbol } = req.params;
    const active = true; 
    const existingSecurity = await securityRepository.getOne({ symbol });
    if (existingSecurity) {
      const updatedSecurity = await securityRepository.update(existingSecurity, { active })
      return res.send(updatedSecurity);
    }
    const security = await securityRepository.create({
      id: cuid(),
      symbol,
      active,
    })
    return res.send(security)
  })

  app.post('/security/:symbol/unsubscribe', async (req: any, res: any) => {
    const { symbol } = req.params;
    const active = false;
    const existingSecurity = await securityRepository.getOne({ symbol });
    if (existingSecurity) {
      const updatedSecurity = await securityRepository.update(existingSecurity, { active })
      return res.send(updatedSecurity);
    }
    const security = await securityRepository.create({
      id: cuid(),
      symbol,
      active,
    })
    return res.send(security)
  })

  app.listen(NODE_PORT, () => {
    console.log(`Market Data Service listening at http://localhost:${NODE_PORT}`)
  })
}

start();

// A request to be performed, this uses [request] standard format
// see: 'http://www.npmjs.com/request' for more information

const stocks = [
  'TSLA',
  'SQ',
  'MRVL',
  'KL',
  'ENPH',
  'SEDG',
  'FUV',
  'TTD',
  'NEM',
  'NOW',
  'CORT',
  'CRSP',
  'SPOT',
  'IDN',
  'NVNXF',
  'NBIX',
  'TCNNF',
  'VIG',
  'PFF',
  'VCSH',
];

const requests = stocks.map(stock => ({
  method: 'GET',
  uri: `https://www.tipranks.com/api/stocks/getChartPageData/?ticker=${stock}&benchmark=1&period=2`
}))

// console.log(requests)

// Create a new RequestQueue, running 3 requests in parallel
let rq = new RequestQueue(1, 1000);

// Listen to the resolved and rejected events when a Request is completed.
rq.on('resolved', (res: any) => {
  console.log('res', res)
  // Handle successfull response
}).on('rejected', (err: any) => {
  // Handle rejected response
}).on('completed', () => {
  // Handle queue empty.
});

// rq.pushAll(requests);
