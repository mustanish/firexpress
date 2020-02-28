const _ = require('lodash');
const Joi = require('@hapi/joi');
const schemas = require('../schemas');

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
            status: 'failed',
            error: 'Invalid request. Please review your request and try again.'
          };
          if (useJoiError) {
            errObj.error = {
              original: err._original,
              details: err.details.map(obj => {
                return { message: obj.message.replace(/['"]/g, '') };
              })
            };
          }
          res.status(400).json(errObj);
        }
      }
    }
    next();
  };
};
