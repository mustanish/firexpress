const deepFreeze = require('deep-freeze');
const group = require('./group');
const members = require('./members');

const schema = {
  '/group': group.create,
  '/group/:id': group.update,
  '/members': members.add,
  '/member': members.remove
};

module.exports = deepFreeze(schema);
