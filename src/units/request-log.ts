import Unit from './unit';
import RequestLogEntity from '../entities/RequestLog';

function RequestLog(db: any): void {
  this.entity = RequestLogEntity;
  this.relations = [
    { name: 'RequestLog.security', alias: 'security' },
  ];
  this.db = db;
  Unit.call(this.entity, this.relations, this.db);
}

RequestLog.prototype = Object.create(Unit.prototype);

export default RequestLog;
