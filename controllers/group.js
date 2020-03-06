const HTTP_CODE = require('http-status-codes');
const connector = require('../connectors');
const Group = require('../models/Group');
const GROUP_CONSTANT = require('../constants/group');
const GLOBAL_CONSTANT = require('../constants/global');
const model = new Group(connector);

const create = async (req, res) => {
  const data = await model.create(
    req.body,
    1,
    GROUP_CONSTANT.create.query,
    GROUP_CONSTANT.all.query
  );
  if (data) res.status(HTTP_CODE.CREATED).json({ status: GLOBAL_CONSTANT.success, data });
  else
    res
      .status(HTTP_CODE.SERVICE_UNAVAILABLE)
      .json({ status: GLOBAL_CONSTANT.failed, error: GLOBAL_CONSTANT.unavailable });
};

const update = () => {};

const remove = async (req, res) => {
  const { id } = req.params;
  const data = await model.remove(id, GROUP_CONSTANT.delete.query, GROUP_CONSTANT.all.query);
  if (data) res.status(HTTP_CODE.OK).json({ status: GLOBAL_CONSTANT.success, data });
  else
    res
      .status(HTTP_CODE.SERVICE_UNAVAILABLE)
      .json({ status: GLOBAL_CONSTANT.failed, error: GLOBAL_CONSTANT.unavailable });
};

const single = async (req, res) => {
  const { id } = req.params;
  const data = await model.single(id, GROUP_CONSTANT.single.query);
  if (Array.isArray(data) && data.length === 1)
    res.status(HTTP_CODE.OK).json({ status: GLOBAL_CONSTANT.success, data: data[0] });
  else if (Array.isArray(data) && data.length === 0)
    res
      .status(HTTP_CODE.BAD_REQUEST)
      .json({ status: GLOBAL_CONSTANT.failed, error: GLOBAL_CONSTANT.notfound });
  else
    res
      .status(HTTP_CODE.SERVICE_UNAVAILABLE)
      .json({ status: GLOBAL_CONSTANT.failed, error: GLOBAL_CONSTANT.unavailable });
};

const all = async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const perPage = req.query.perPage ? parseInt(req.query.perPage) : 10;
  const data = await model.all(1, page, perPage, GROUP_CONSTANT.all.query);
  if (data) res.status(HTTP_CODE.OK).json({ status: GLOBAL_CONSTANT.success, data });
  else
    res
      .status(HTTP_CODE.SERVICE_UNAVAILABLE)
      .json({ status: GLOBAL_CONSTANT.failed, error: GLOBAL_CONSTANT.unavailable });
};

module.exports = {
  all,
  create,
  remove,
  single,
  update
};
