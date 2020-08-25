import DB from "../../services/DatabaseConnector";

export default class Container {
  services: { [x: string]: any; };

  constructor() {
    this.services = {};
  }

  has(id: string | number) {
    return !!this.services[id];
  }

  register(id: string | number, service: any) {
    this.services[id] = service;
  }

  get(id: string | number) {
    if (!this.services[id]) {
      return null;
    }

    return this.services[id];
  }
}