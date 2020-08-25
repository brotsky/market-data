const express = require('express')
const RequestQueue = require('node-request-queue');

const cuid = require('cuid')

import registerDependencies from './services/register-dependencies';
import { NODE_PORT } from './config/vars';
import { DEPENDENCIES } from './utils/constants';

var app = express()

console.log('THING', cuid())

const start = async () => {
  const container = await registerDependencies();

  app.get('/', (req: any, res: any) => {
    res.send('hello world')
  })

  app.get('/security/:symbol/subscribe', async (req: any, res: any) => {
    const { symbol } = req.params;
    // container is not working
    const securityRepository = container.get(DEPENDENCIES.SECURITY_REPOSITORY);
    console.log("DEBUG", securityRepository)
    const security = await securityRepository.create({
      id: cuid(),
      symbol,
    })
    res.send(security)
  })

  app.listen(NODE_PORT, () => {
    console.log(`Example app listening at http://localhost:${NODE_PORT}`)
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
