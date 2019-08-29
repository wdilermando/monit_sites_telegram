const express = require('express');
const router = express.Router();

const statusController = require('../controllers/status-controller');

router.get('/', statusController.getWebStatus);

module.exports = router;