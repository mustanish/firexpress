const Joi = require('@hapi/joi');
const GROUP_CONSTANT = require('../constants/group');

const members = Joi.string().regex(/^([0]|\+91)?\d{10}(?:,([0]|\+91)?\d{10})*$/);

const create = Joi.object().keys({
  name: Joi.string()
    .trim()
    .min(3)
    .max(15)
    .required()
    .messages({
      'string.empty': GROUP_CONSTANT.create.messages.name.empty,
      'string.min': GROUP_CONSTANT.create.messages.name.min,
      'string.max': GROUP_CONSTANT.create.messages.name.max,
      'any.required': GROUP_CONSTANT.create.messages.name.required
    }),
  members: members
    .trim()
    .required()
    .messages({
      'string.empty': GROUP_CONSTANT.create.messages.members.empty,
      'string.pattern.base': GROUP_CONSTANT.create.messages.members.pattern,
      'any.required': GROUP_CONSTANT.create.messages.members.required
    })
});

const update = Joi.object().keys({
  name: Joi.string(),
  members
});

module.exports = {
  create,
  update
};
