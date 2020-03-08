const Joi = require('@hapi/joi');
const GROUP_CONSTANT = require('../constants/group');

const members = Joi.string().regex(/^([0]|\+91)?\d{10}(?:,([0]|\+91)?\d{10})*$/);

const id = Joi.string().guid({ version: 'uuidv4' });

const create = {
  body: Joi.object().keys({
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
  })
};

const update = {
  body: Joi.object().keys({
    name: Joi.string()
      .trim()
      .min(3)
      .max(15)
      .messages({
        'string.empty': GROUP_CONSTANT.update.messages.name.empty,
        'string.min': GROUP_CONSTANT.update.messages.name.min,
        'string.max': GROUP_CONSTANT.update.messages.name.max
      }),
    desc: Joi.string()
      .trim()
      .min(5)
      .max(100)
      .messages({
        'string.empty': GROUP_CONSTANT.update.messages.desc.empty,
        'string.min': GROUP_CONSTANT.update.messages.desc.min,
        'string.max': GROUP_CONSTANT.update.messages.desc.max
      })
  }),
  params: Joi.object().keys({
    id: id.messages({ 'string.guid': GROUP_CONSTANT.common.messages.invalidId })
  })
};

const remove = {
  params: Joi.object().keys({
    id: id.messages({ 'string.guid': GROUP_CONSTANT.common.messages.invalidId })
  })
};

const single = {
  params: Joi.object().keys({
    id: id.messages({ 'string.guid': GROUP_CONSTANT.common.messages.invalidId })
  })
};

const all = {
  query: Joi.object().keys({
    page: Joi.number()
      .integer()
      .messages({
        'number.base': GROUP_CONSTANT.all.messages.page.invalid,
        'number.positive': GROUP_CONSTANT.all.messages.page.positive
      }),
    perPage: Joi.number()
      .integer()
      .messages({
        'number.base': GROUP_CONSTANT.all.messages.perPage.invalid,
        'number.positive': GROUP_CONSTANT.all.messages.perPage.positive
      })
  })
};

module.exports = {
  create,
  update,
  remove,
  single,
  all
};
