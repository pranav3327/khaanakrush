const express = require('express');
const { create } = require('../controllers/eventBookingsController');

const router = express.Router();

router.post('/', create);

module.exports = router;

