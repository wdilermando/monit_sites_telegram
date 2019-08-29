const express = require('express');
const router = express.Router();

const sitesController = require('../controllers/sites-controllers');

router.post('/', sitesController.insertSite);

router.get('/', sitesController.getSites);

router.get('/:siteId', sitesController.getSites);

router.put('/:siteId', sitesController.updateSite);

router.delete('/:siteId', sitesController.deleteSite);


module.exports = router;