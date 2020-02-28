const deepFreeze = require('deep-freeze');

const members = {
  add: {
    query: {},
    messages: {
      groupId: {
        empty: 'Please enter group ID',
        guid: 'Please enter group ID in specified format',
        required: 'Group ID cannot empty'
      },
      members: {
        empty: 'Please enter group members',
        pattern: 'Please enter members in specified format',
        required: 'Group members cannot empty'
      }
    }
  },
  remove: {
    query: {},
    messages: {
      members: {
        empty: 'Please enter group member',
        pattern: 'Please enter member in specified format',
        required: 'Group member cannot empty'
      }
    }
  }
};
module.exports = deepFreeze(members);
