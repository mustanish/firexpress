const { BAD_REQUEST, OK } = require('http-status-codes');
const { isArray, isEmpty } = require('lodash');
const GLOBAL_CONSTANT = require('../constants');

class Group {
  /**
   *
   * @param {*} database
   */
  constructor({ database, cache }) {
    if (!Group.instance) {
      Group.instance = this;
      this.database = database;
      this.cache = cache;
    }
    return Group.instance;
  }

  /**
   *
   * @param {*} userId
   * @param {*} name
   * @param {*} members
   * @param {*} createQuery
   * @param {*} allQuery
   */
  async create(userId, name, members, createQuery, allQuery) {
    Object.assign(createQuery, { values: [name, userId, userId] });
    const response = await this.database.execute(createQuery);
    if (response.data.error) return response;
    const allGroups = await this.all(userId, 1, 10, allQuery);
    return { code: OK, data: { status: GLOBAL_CONSTANT.success, data: allGroups } };
  }

  /**
   *
   * @param {*} groupId
   * @param {*} name
   * @param {*} desc
   * @param {*} updateQuery
   */
  async update(groupId, name, desc, updateQuery) {
    Object.assign(updateQuery, { values: [name, desc, groupId] });
    const response = await this.database.execute(updateQuery);
    if (response.data.error) return response;
    if (isArray(response) && isEmpty(response))
      return {
        code: BAD_REQUEST,
        data: { status: GLOBAL_CONSTANT.failed, error: GLOBAL_CONSTANT.notfound }
      };
    return { code: BAD_REQUEST, data: { status: GLOBAL_CONSTANT.success, data: response } };
  }

  /**
   *
   * @param {*} groupId
   * @param {*} deleteQuery
   * @param {*} allQuery
   */
  async remove(groupId, deleteQuery, allQuery) {
    Object.assign(deleteQuery, { values: [true, groupId] });
    const response = await this.database.execute(deleteQuery);
    if (response.data.error) return response;
    if (isArray(response) && isEmpty(response))
      return {
        code: BAD_REQUEST,
        data: { status: GLOBAL_CONSTANT.failed, error: GLOBAL_CONSTANT.notfound }
      };
    const allGroups = await this.all(1, 1, 10, allQuery);
    return { code: OK, data: { status: GLOBAL_CONSTANT.success, data: allGroups } };
  }

  /**
   *
   * @param {*} groupId
   * @param {*} singleQuery
   */
  async single(groupId, singleQuery) {
    Object.assign(singleQuery, { values: [groupId] });
    const response = await this.database.execute(singleQuery);
    if (response.data.error) return response;
    if (isArray(response) && isEmpty(response))
      return {
        code: BAD_REQUEST,
        data: { status: GLOBAL_CONSTANT.failed, error: GLOBAL_CONSTANT.notfound }
      };
    return { code: OK, data: { status: GLOBAL_CONSTANT.success, data: response } };
  }

  /**
   *
   * @param {*} userId
   * @param {*} page
   * @param {*} perPage
   * @param {*} allQuery
   */
  async all(userId, page, perPage, allQuery) {
    Object.assign(allQuery, { values: [userId, perPage, (page - 1) * perPage] });
    const response = await this.database.execute(allQuery);
    if (response.data.error) return response;
    return { code: OK, data: { status: GLOBAL_CONSTANT.success, data: response } };
  }
}

module.exports = Group;
