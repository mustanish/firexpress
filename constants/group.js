const deepFreeze = require('deep-freeze');

const group = {
  create: {
    query: {
      text: 'INSERT INTO groups(name, members) VALUES($1, $2)',
      values: []
    },
    messages: {
      name: {
        empty: 'Please enter group name',
        min: 'Group name must be at least {#limit} characters long',
        max: 'Group name must be at most {#limit} characters long',
        required: 'Group name cannot empty'
      },
      members: {
        empty: 'Please enter group members',
        pattern: 'Please enter members in specified format',
        required: 'Group members cannot empty'
      }
    }
  }
};
module.exports = deepFreeze(group);
