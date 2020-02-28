const GROUP_CONSTANT = require('../constants/group');

class Group {
  constructor(connector) {
    this.connector = connector;
  }

  async create() {
    await this.connector.connect();
    try {
      const res = await this.connector.query(GROUP_CONSTANT.create.query);
      console.log(res);
    } catch (err) {
      console.log('ERROR:', err.stack);
    } finally {
      this.connector.end();
    }
  }
}

module.exports = Group;
