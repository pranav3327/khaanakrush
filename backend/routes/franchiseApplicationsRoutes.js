const express = require('express');
const { create } = require('../controllers/franchiseApplicationsController');

const router = express.Router();

router.post('/', create);

module.exports = router;

