const express = require('express');
const { listMenuItems } = require('../controllers/menuItemsController');

const router = express.Router();

router.get('/', listMenuItems);

module.exports = router;

