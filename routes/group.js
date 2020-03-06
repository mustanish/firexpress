const express = require('express');
const group = require('../controllers/group');
const schemaValidator = require('../middlewares/schemaValidator');

const router = express.Router();

router.post('/group', schemaValidator(true), group.create);

router.patch('/group/:id', schemaValidator(true), group.update);

router.get('/group/', group.all);

router.get('/group/:id', group.single);

router.delete('/group/:id', group.remove);

module.exports = router;
