import { find, isEmpty } from 'lodash';
import flatten from 'flat';

import miscellaneous from './miscellaneous';

const { lastElementsOfString } = miscellaneous;

const filterToString = (filter: any, operation: any, metadata: { columns: any; name: any; }) => {
  let condition = '';
  const { columns, name } = metadata;
  const flattenedFilter: any = flatten(filter);

  const key = Object.keys(flattenedFilter)[0];
  const value = flattenedFilter[key];

  if (typeof value === 'object' && isEmpty(value)) return '';

  const truncated = lastElementsOfString(key, '.', 3);
  const splittedTruncated = truncated.split('.');
  const { length } = splittedTruncated;

  const propertyName = splittedTruncated[0];
  const column = find(columns, el => el.propertyName === propertyName);

  if (column && column.type === 'jsonb') {
    condition = `${name}.${propertyName} ->> 'primary' ${operation} '${value}'`;
  } else {
    let operand = '';
    switch (length) {
      case 0: {
        break;
      }
      case 1: {
        operand = `${name}.${truncated}`;
        break;
      }
      case 2: {
        operand = truncated;
        break;
      }
      default: {
        operand = `${splittedTruncated[1]}.${splittedTruncated[2]}`;
        break;
      }
    }
    condition = `${operand} ${operation} '${value}'`;
  }
  return condition;
};

const formatCondition = ({ AND = [], OR, ...rest }: any) => {
  if (Object.keys(rest).length > 0) {
    Object.keys(rest).forEach((key) => {
      AND.push({ [key]: rest[key] });
    });
  }
  const result: any = {};
  if (OR) result.OR = OR;
  if (AND.length > 0) result.AND = AND;
  return result;
};

const sqlize = (conditions: any[], operator: any, operation: any, metadata: { columns: any; name: any; }) => {
  let result = '';
  let operand = '';
  conditions.forEach((condition: any) => {
    if (isEmpty(condition)) return;

    const keys = Object.keys(condition);

    if (keys.length === 1 && !Array.isArray(condition[keys[0]])) {
      operand = filterToString(condition, operation, metadata);
    } else operand = '(' + createSqlFilter(condition, operation, metadata) + ')';

    if (result === '') result = operand;
    else result = `${result}  ${operator}  ${operand}`;
  });
  return result;
};

const createSqlFilter = (filter: { [x: string]: any; AND?: any[]; OR: any; }, operation: any, metadata: any) => {
  const formattedFilter = formatCondition(filter);
  const operators = Object.keys(formattedFilter);

  if (operators.length === 0) return '';
  if (operators.length === 1) {
    const operator = operators[0];
    return sqlize(formattedFilter[operator], operator, operation, metadata);
  }

  let result = '';
  operators.map((operator, index) => {
    const sqlized = sqlize(formattedFilter[operator], operator, operation, metadata);
    switch (formattedFilter[operator].length) {
      case 0:
        break;

      case 1: {
        if (index === 0) result = `${sqlized}`;
        else result = `${result} AND  ${sqlized} `;
        break;
      }
      default: {
        if (index === 0) result = `( ${sqlized} )`;
        else result = `${result} AND  ( ${sqlized} )`;
        break;
      }
    }
  });
  return result;
};

export default { createSqlFilter };
