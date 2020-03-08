const express = require('express');
const members = require('../controllers/members');
const validator = require('../middlewares/validator');

const router = express.Router();

router.post('/members', validator.body(true), members.add);

router.delete('/member', validator.body(true), members.remove);

module.exports = router;
