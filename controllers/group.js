/* eslint-disable spaced-comment */
/*const code = require('http-status-codes');
const connector = require('../configs/database');
const Group = require('../models/group');
const GROUP_CONSTANT = require('../constants/group');*/

const create = () => {
  console.log('INSIDE:', 'CREATE');
};

const update = () => {
  console.log('INSIDE:', 'UPDATE');
};

/*const deleteGroup = async (req, res) => {
  const data = await Group.delete();
  console.log('data:', data);
};

const detail = async (req, res) => {
  const data = await Group.detail();
  console.log('data:', data);
};*/

module.exports = {
  create,
  update
};
