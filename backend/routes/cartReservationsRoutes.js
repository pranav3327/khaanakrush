const express = require('express');
const { create } = require('../controllers/cartReservationsController');

const router = express.Router();

router.post('/', create);

module.exports = router;

