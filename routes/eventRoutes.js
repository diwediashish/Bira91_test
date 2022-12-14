
const express = require('express');
const isAuth = require('../middleware/isAuth');
const eventController = require('../controller/eventController');

const router = express.Router();


router.post('/eventList',isAuth,eventController.fetchEvents);
router.post('/itemList',isAuth,eventController.itemFetchController);
router.post('/itemImages',isAuth,eventController.itemImagesFetch);
router.post('/objectiveSync',isAuth,eventController.objectiveSync);
router.post('/eventTaskDateWise',isAuth,eventController.fetchDayWiseEventsAndTask);
module.exports = router;