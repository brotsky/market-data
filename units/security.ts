import Unit from './unit';
import SecurityEntity from '../entities/security';

function Security(db: any) {
  this.entity = SecurityEntity;
  this.relations = [];
  this.db = db;
  Unit.call(this, this.entity, this.relations, this.db);
}

Security.prototype = Object.create(Unit.prototype);

export default Security;
