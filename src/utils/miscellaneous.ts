import { isMatch as isMatchLodash, includes } from 'lodash';

const lastElementsOfString = (string: string, separator: any, limit: number) => {
  const array = string.split(separator);
  if (array.length <= limit) return string;

  let data = '';
  array.forEach((element: string, index: number) => {
    if (array.length === index + 1) data += element;
    else if (array.length - index <= limit) data += `${element}.`;
  });
  return data;
};

const isMatch = (data: any, filter: any) => {
  const objectKeys = Object.keys(filter);
  if (!includes(objectKeys, 'AND') && !includes(objectKeys, 'OR')) return isMatchLodash(data, filter);

  let result = true;

  objectKeys.forEach((key: any) => {
    if (key === 'AND') {
      let andResult = true;
      filter[key].forEach((subFilter: any) => {
        andResult = andResult && isMatch(data, subFilter);
      });
      result = result && andResult;
      return;
    }

    if (key === 'OR') {
      let orResult = false;
      filter[key].forEach((subFilter: any) => {
        orResult = orResult || isMatch(data, subFilter);
      });
      result = result && orResult;
      return;
    }

    result = result && isMatchLodash(data, {
      [key]: filter[key],
    });
  });

  return result;
};

function* asyncIterable(funcs: Array<any>): any {
  for (const func of funcs) {
    yield func
  }
};

const piper = async (funcs: Array<any>, args: any) => {
  let input = args
  for (const fn of asyncIterable(funcs)) {
    input = await fn(...input)
  }
  return input;
}

export default {
  piper,
  lastElementsOfString,
};
