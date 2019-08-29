const express = require('express');
const router = express.Router();

const commandController = require('../controllers/commands-controller');

router.post('/', commandController.sendCommandToServer);

module.exports = router;