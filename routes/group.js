const express = require('express');
const group = require('../controllers/group');
const schemaValidator = require('../middlewares/schemaValidator');

const router = express.Router();

router.post('/group', schemaValidator(true), group.create);

router.put('/group/:id', schemaValidator(true), group.update);

module.exports = router;
