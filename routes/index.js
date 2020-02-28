const express = require('express');
const group = require('./group');
const members = require('./members');

const router = express.Router();

router.use('/', group);
router.use('/', members);

module.exports = router;
