import {v4 as uuid} from 'uuid';

export default class Utils {

  public static getIpAddressFromRequest(req) {
    return req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  }

  public static isSet(obj: any): boolean {
    return (typeof obj !== "undefined" && obj !== null);
  }

  public static uuid(): string {
    return uuid();
  }

  /**
   * Inserts an additional $or clause into the given filter.
   * If an $or clause already exists, the filter is converted into
   * an $and array, and the second $or is added.
   *
   * @param {Object} filter
   * @param {Object} orClause
   */
  public static insertAdditionalOrClauseIntoFilter(filter, orClause) {
    if (!filter) {
      return filter;
    }

    if (typeof filter.$or !== 'undefined' && filter.$or != null) {
      let newFilter = {$and: []};

      Object.keys(filter).forEach(key => {
        let keyFilter = {};
        keyFilter[key] = filter[key];
        newFilter.$and.push(keyFilter);
      });

      newFilter.$and.push({
        $or: orClause
      });

      return newFilter;
    } else {
      filter.$or = orClause;
      return filter;
    }
  }

  /**
   * Removes all empty $or clauses.
   *
   * @param {Object} filter
   */
  public static removeEmptyOrClauses(filter): any {
    if (!filter) {
      return {};
    }

    function isObjectId(value) {
      return (value instanceof Object && typeof value._bsontype !== 'undefined' && value._bsontype === 'ObjectId');
    }

    let normalizedFilter = {};
    Object.keys(filter).forEach(key => {
      const value = filter[key];
      if (Array.isArray(value)) {
        if (value.length > 0) {
          const normalizedArray = value.map(element => {
            if (isObjectId(element)) {
              return element;
            } else {
              return Utils.removeEmptyOrClauses(element);
            }
          });
          normalizedFilter[key] = normalizedArray;
        }
      } else if (value instanceof Object && !Utils.removeEmptyOrClauses(value)) {
        normalizedFilter[key] = Utils.removeEmptyOrClauses(value);
      } else {
        normalizedFilter[key] = filter[key];
      }
    });

    return normalizedFilter;
  }

  public static checkArray(array) {
    return (array && Array.isArray(array) && array.length >= 1);
  }
}
