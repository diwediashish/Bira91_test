/*
    Fetching Home Page Dashboard data
*/

const express = require('express');
const isAuth = require('../middleware/isAuth');
//Controller for login routes
const reportController = require('../controller/reportController');

const router = express.Router();

router.post('/homePageDashboardFetch',isAuth,reportController.fetchHomePageData);


module.exports = router;