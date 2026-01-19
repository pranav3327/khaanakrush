const express = require('express');
const { create } = require('../controllers/reviewsController');

const router = express.Router();

router.post('/', create);

module.exports = router;

