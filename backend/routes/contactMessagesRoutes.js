const express = require('express');
const { create } = require('../controllers/contactMessagesController');

const router = express.Router();

router.post('/', create);

module.exports = router;

