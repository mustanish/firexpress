const express = require('express');
const members = require('../controllers/members');
const schemaValidator = require('../middlewares/schemaValidator');

const router = express.Router();

router.post('/members', schemaValidator(true), members.add);

router.delete('/member', schemaValidator(true), members.remove);

module.exports = router;
