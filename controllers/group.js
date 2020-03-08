const connector = require('../connectors');
const Group = require('../models/Group');
const GROUP_CONSTANT = require('../constants/group');

const model = new Group(connector);
/**
 *
 * @param {*} req
 * @param {*} res
 */
const create = async (req, res) => {
  const { name, members } = req.body;
  const { code, data } = await model.create(
    1,
    name,
    members,
    GROUP_CONSTANT.create.query,
    GROUP_CONSTANT.all.query
  );
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
  const { code, data } = await model.update(id, name, desc, GROUP_CONSTANT.update.query);
  res.status(code).json(data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const remove = async (req, res) => {
  const { id } = req.params;
  const { code, data } = await model.remove(
    id,
    GROUP_CONSTANT.remove.query,
    GROUP_CONSTANT.all.query
  );
  res.status(code).json(data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const single = async (req, res) => {
  const { id } = req.params;
  const { code, data } = await model.single(id, GROUP_CONSTANT.single.query);
  res.status(code).json(data);
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
const all = async (req, res) => {
  const page = req.query.page || 1;
  const perPage = req.query.perPage || 10;
  const { code, data } = await model.all(1, page, perPage, GROUP_CONSTANT.all.query);
  res.status(code).json(data);
};

module.exports = {
  all,
  create,
  remove,
  single,
  update
};
