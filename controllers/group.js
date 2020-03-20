const connector = require('../connectors');
const Group = require('../models/Group');

const model = new Group(connector);
/**
 *
 * @param {*} req
 * @param {*} res
 */
const create = async (req, res) => {
  const { name, members } = req.body;
  const { code, data } = await model.create(1, name, members);
  res.status(code).json(data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const update = async (req, res) => {
  const { id } = req.params;
  const { name, desc } = req.body;
  const { code, data } = await model.update(id, name, desc);
  res.status(code).json(data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const remove = async (req, res) => {
  const { id } = req.params;
  const { code, data } = await model.remove(id);
  res.status(code).json(data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const get = async (req, res) => {
  const { id } = req.params;
  const { code, data } = await model.get(id);
  res.status(code).json(data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const getAll = async (req, res) => {
  const page = req.query.page || 1;
  const perPage = req.query.perPage || 10;
  const { code, data } = await model.getAll(1, page, perPage);
  res.status(code).json(data);
};

module.exports = {
  create,
  get,
  getAll,
  remove,
  update
};
