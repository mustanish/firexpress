const Joi = require('@hapi/joi');
const MEMBERS_CONSTANT = require('../constants/members');

const groupId = Joi.string()
  .trim()
  .guid({ version: 'uuidv4' })
  .required()
  .messages({
    'string.empty': MEMBERS_CONSTANT.add.messages.groupId.empty,
    'string.guid': MEMBERS_CONSTANT.add.messages.groupId.guid,
    'any.required': MEMBERS_CONSTANT.add.messages.groupId.required
  });

const add = Joi.object().keys({
  groupId,
  members: Joi.string()
    .regex(/^([0]|\+91)?\d{10}(?:,([0]|\+91)?\d{10})*$/)
    .required()
    .messages({
      'string.empty': MEMBERS_CONSTANT.add.messages.members.empty,
      'string.pattern.base': MEMBERS_CONSTANT.add.messages.members.pattern,
      'any.required': MEMBERS_CONSTANT.add.messages.members.required
    })
});

const remove = Joi.object().keys({
  groupId,
  members: Joi.string()
    .regex(/^([0]|\+91)?\d{10}$/)
    .required()
    .messages({
      'string.empty': MEMBERS_CONSTANT.remove.messages.members.empty,
      'string.pattern.base': MEMBERS_CONSTANT.remove.messages.members.pattern,
      'any.required': MEMBERS_CONSTANT.remove.messages.members.required
    })
});

module.exports = {
  add,
  remove
};
