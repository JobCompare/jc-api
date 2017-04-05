const Service = require('../services/CRUDService');

const COLLECTION_NAME = 'companies';

class CompanyManager {
  static getCompanies(queries) {
    return Service.list(COLLECTION_NAME, queries);
  }

  static getCompanyById(uuid, queries) {
    return Service.read(COLLECTION_NAME, uuid, queries);
  }

  static createCompany(queries) {
    return Service.create(COLLECTION_NAME, queries);
  }

  static updateCompanyById(uuid, queries) {
    return Service.update(COLLECTION_NAME, uuid, queries);
  }

  static removeCompanyById(uuid, queries) {
    return Service.delete(COLLECTION_NAME, uuid, queries);
  }

  static getJobsFromCompany() {
    return {};
  }
}

module.exports = CompanyManager;
