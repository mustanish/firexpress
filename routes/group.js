const express = require('express');
const group = require('../controllers/group');
const validator = require('../middlewares/validator');

const router = express.Router();

router.post('/group', validator.body(true), group.create);

router.patch('/group/:id', validator.params(true), validator.body(true), group.update);

router.delete('/group/:id', validator.params(true), group.remove);

router.get('/group/:id', validator.params(true), group.single);

router.get('/group', validator.query(true), group.all);

module.exports = router;
