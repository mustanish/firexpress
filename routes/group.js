const express = require('express');
const groups = require('../controllers/group');

const router = express.Router();

router.get('/:create', groups.createGroup);

router.put('/:update', groups.updateGroup);

router.put('/:delete', groups.deleteGroup);

router.put('/:all', groups.allGroups);

router.put('/:detail', groups.detail);

module.exports = router;
