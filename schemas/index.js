const deepFreeze = require('deep-freeze');
const group = require('./group');

const schema = {
  '/group:post': group.create,
  '/group/:id:patch': group.update,
  '/group/:id:delete': group.remove,
  '/group/:id:get': group.single,
  '/group:get': group.all
};

module.exports = deepFreeze(schema);
