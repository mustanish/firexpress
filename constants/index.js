const deepFreeze = require('deep-freeze');

const option = {
  failed: 'failed',
  success: 'success',
  invalidreq: 'Invalid request. Please review your request and try again',
  notfound: 'Resource not found',
  unavailable: 'Unable to service your request. Please try again later'
};
module.exports = deepFreeze(option);
