const _ = require('lodash');
const HTTP_CODE = require('http-status-codes');
const Joi = require('@hapi/joi');
const schemas = require('../schemas');
const GLOBAL_CONSTANT = require('../constants/global');

module.exports = (useJoiError = false) => {
  const supportedMethods = ['post', 'put', 'patch', 'delete'];

  const validationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
  };

  return (req, res, next) => {
    const route = req.route.path;
    const method = req.method.toLowerCase();

    if (supportedMethods.includes(method) && _.has(schemas, route)) {
      const schema = _.get(schemas, route);
      if (schema) {
        try {
          Joi.assert(req.body, schema, validationOptions);
        } catch (err) {
          const errObj = {
            status: GLOBAL_CONSTANT.failed,
            error: GLOBAL_CONSTANT.invalid
          };
          if (useJoiError) {
            errObj.error = {
              original: err._original,
              details: err.details.map(obj => {
                return { message: obj.message.replace(/['"]/g, '') };
              })
            };
          }
          res.status(HTTP_CODE.BAD_REQUEST).json(errObj);
        }
      }
    }
    next();
  };
};
