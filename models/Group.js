const { BAD_REQUEST, OK } = require('http-status-codes');
const { isArray, isEmpty } = require('lodash');
const GLOBAL_CONSTANT = require('../constants');
const GROUP_CONSTANT = require('../constants/group');

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
   */
  async create(userId, name, members) {
    const { create, all } = GROUP_CONSTANT;
    Object.assign(create.query, { values: [name, userId, userId] });
    let response = await this.database.execute(create.query);
    if (response.data && response.data.error) return response;
    response = await this.getAll(userId, 1, 10, all.query);
    if (response.data && response.data.error) return response;
    return { code: OK, data: { status: GLOBAL_CONSTANT.success, data: response.data.data } };
  }

  /**
   *
   * @param {*} groupId
   * @param {*} name
   * @param {*} desc
   */
  async update(groupId, name, desc) {
    let response = await this.get(groupId);
    if (response.data && response.data.error) return response;
    const { update } = GROUP_CONSTANT;
    Object.assign(update.query, {
      values: [name || response.data.data[0].name, desc || response.data.data[0].desc, groupId]
    });
    response = await this.database.execute(update.query);
    if (response.data && response.data.error) return response;
    return { code: OK, data: { status: GLOBAL_CONSTANT.success, data: response } };
  }

  /**
   *
   * @param {*} groupId
   */
  async remove(groupId) {
    let response = await this.get(groupId);
    if (response.data && response.data.error) return response;
    const { remove, all } = GROUP_CONSTANT;
    Object.assign(remove.query, { values: [true, groupId] });
    response = await this.database.execute(remove.query);
    if (response.data && response.data.error) return response;
    response = await this.getAll(1, 1, 10, all.query);
    if (response.data && response.data.error) return response;
    return { code: OK, data: { status: GLOBAL_CONSTANT.success, data: response.data.data } };
  }

  /**
   *
   * @param {*} groupId
   */
  async get(groupId) {
    const { single } = GROUP_CONSTANT;
    Object.assign(single.query, { values: [groupId] });
    const response = await this.database.execute(single.query);
    if (response.data && response.data.error) return response;
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
   */
  async getAll(userId, page, perPage) {
    const { all } = GROUP_CONSTANT;
    Object.assign(all.query, { values: [userId, perPage, (page - 1) * perPage] });
    const response = await this.database.execute(all.query);
    if (response.data && response.data.error) return response;
    return { code: OK, data: { status: GLOBAL_CONSTANT.success, data: response } };
  }
}

module.exports = Group;
