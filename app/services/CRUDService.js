class CRUDService {
  static list(collectionName, queries) {
    /* TODO: perform MongoDB to get a list of companies */

    return { status: 200, result: [] };
  }

  static create(collectionName, queries) {
    /* TODO: perform MongoDB to create a company */

    return { status: 200 };
  }

  static read(collectionName, uuid, queries) {
    /* TODO: perform MongoDB to get a company */

    return { status: 200, result: {} };
  }

  static update(collectionName, uuid, queries) {
    /* TODO: perform MongoDB to update a company */

    return { status: 200 };
  }

  static delete(collectionName, uuid, queries) {
    /* TODO: perform MongoDB to delete a company */

    return { status: 200 };
  }
}

module.exports = CRUDService;
