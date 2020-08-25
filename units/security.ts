import Unit from './unit';
import SecurityEntity from '../entities/security';

function Security(db: any): void {
  this.entity = SecurityEntity;
  this.relations = [];
  this.db = db;
  Unit.call(this.entity, this.relations, this.db);
}

Security.prototype = Object.create(Unit.prototype);

export default Security;
