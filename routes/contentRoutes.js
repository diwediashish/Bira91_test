/*
    Checking the authentication of the current user
*/

const express = require('express');
const isAuth = require('../middleware/isAuth');
//Controller for login routes
const contentFetchController = require('../controller/contentFetchController');

const router = express.Router();

router.post('/sellingToolsFiles',isAuth,contentFetchController.fetchContentShared);
router.post('/sellingToolsContentVersionIds',isAuth,contentFetchController.fetchContentVersionIds);



module.exports = router;