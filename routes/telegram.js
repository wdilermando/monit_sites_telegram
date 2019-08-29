const express = require('express');
const router = express.Router();

const telegramController = require('../controllers/telegram-controller')


/* GET bot info. */
router.get('/me', telegramController.getBotInfo);

router.post('/send', telegramController.sendMessageToBot)

module.exports = router;