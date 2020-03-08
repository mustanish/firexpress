const { has, get } = require('lodash');
const HTTP_CODE = require('http-status-codes');
const Joi = require('@hapi/joi');
const schemas = require('../schemas');
const GLOBAL_CONSTANT = require('../constants');

const validationOptions = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true
};

const body = (useJoiError = false) => {
  const supportedMethods = ['post', 'put', 'patch'];
  return (req, res, next) => {
    const route = req.route.path;
    const method = req.method.toLowerCase();

    if (supportedMethods.includes(method) && has(schemas, `${route}:${method}`)) {
      const schema = get(schemas, `${route}:${method}`);
      if (schema) {
        try {
          Joi.assert(req.body, schema.body, validationOptions);
          next();
        } catch (err) {
          const errObj = {
            status: GLOBAL_CONSTANT.failed,
            error: GLOBAL_CONSTANT.invalidreq
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
  };
};

const params = (useJoiError = false) => {
  const supportedMethods = ['put', 'patch', 'get', 'delete'];
  return (req, res, next) => {
    const route = req.route.path;
    const method = req.method.toLowerCase();
    if (supportedMethods.includes(method) && has(schemas, `${route}:${method}`)) {
      const schema = get(schemas, `${route}:${method}`);
      if (schema) {
        try {
          Joi.assert(req.params, schema.params, validationOptions);
          next();
        } catch (err) {
          const errObj = {
            status: GLOBAL_CONSTANT.failed,
            error: GLOBAL_CONSTANT.invalidreq
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
  };
};

const query = (useJoiError = false) => {
  const supportedMethods = ['get'];
  return (req, res, next) => {
    const route = req.route.path;
    const method = req.method.toLowerCase();
    if (supportedMethods.includes(method) && has(schemas, `${route}:${method}`)) {
      const schema = get(schemas, `${route}:${method}`);
      if (schema) {
        try {
          Joi.assert(req.query, schema.query, validationOptions);
          next();
        } catch (err) {
          const errObj = {
            status: GLOBAL_CONSTANT.failed,
            error: GLOBAL_CONSTANT.invalidreq
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
  };
};

module.exports = { body, params, query };
