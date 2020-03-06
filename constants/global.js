const deepFreeze = require('deep-freeze');

const global = {
  failed: 'failed',
  invalid: 'Invalid request. Please review your request and try again',
  notfound: 'Invalid reuest not found',
  success: 'success',
  unavailable: 'Unable to service your request. Please try again later'
};
module.exports = deepFreeze(global);
