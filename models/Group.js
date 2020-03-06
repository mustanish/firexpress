class Group {
  constructor({ database }) {
    if (!Group.instance) {
      Group.instance = this;
      this.database = database;
    }
    return Group.instance;
  }

  async create(data, userId, createQuery, allQuery) {
    const { name } = data;
    Object.assign(createQuery, { values: [name, userId, userId] });
    const response = await this.database.execute(createQuery);
    if (!response) return response;
    return this.all(userId, 1, 10, allQuery);
  }

  async remove(groupId, deleteQuery, allQuery) {
    Object.assign(deleteQuery, { values: [true, groupId] });
    const response = await this.database.execute(deleteQuery);
    if (!response) return response;
    return this.all(1, 1, 10, allQuery);
  }

  async single(groupId, singleQuery) {
    Object.assign(singleQuery, { values: [groupId] });
    const response = await this.database.execute(singleQuery);
    return response;
  }

  async all(userId, page, perPage, allQuery) {
    Object.assign(allQuery, { values: [userId, perPage, (page - 1) * perPage] });
    const response = await this.database.execute(allQuery);
    return response;
  }
}

module.exports = Group;
