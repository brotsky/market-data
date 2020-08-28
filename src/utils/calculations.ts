import { maxBy, minBy, get } from 'lodash';

export const latestPrice = (stockBook: object) => get(stockBook, 'quote.latestPrice')

// I'm not sure if this takes today into consideration
export const fiveDayHigh = (stockChart5day: Array<object>) => get(maxBy(stockChart5day, 'high'), 'high');

export const fiveDayLow = (stockChart5day: Array<object>) => get(minBy(stockChart5day, 'low'), 'low');

export const limitOrderSuggestions = (stockBook: object, stockChart5day: Array<object>) => {
  const high = fiveDayHigh(stockChart5day);
  const low = fiveDayLow(stockChart5day);
  const price = latestPrice(stockBook);

  const delta = high - low;
  const lowEnd = low + (delta * 0.10);
  const highEnd = high - (delta * 0.10);

  const buy = lowEnd < price
    ? lowEnd
    : price - (delta * 0.01);

  const sell = highEnd > price
    ? highEnd
    : price + (delta * 0.01);

  return { buy, sell };
}

export const allCalculations = (tipsrank: any, iexcloud: any) => {
  const { stockBook, stockChart5day } = iexcloud;
  const _latestPrice = latestPrice(stockBook);
  const _fiveDayHigh = fiveDayHigh(stockChart5day);
  const _fiveDayLow = fiveDayLow(stockChart5day);
  const _limitOrderSuggestions = limitOrderSuggestions(stockBook, stockChart5day);
  return {
    latestPrice: _latestPrice,
    fiveDayHigh: _fiveDayHigh,
    fiveDayLow: _fiveDayLow,
    limitOrderSuggestions: _limitOrderSuggestions,
  };
}