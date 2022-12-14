/*
    Checking the authentication of the current user
*/

const express = require('express');
const isAuth = require('../middleware/isAuth');
//Controller for login routes
const loginController = require('../controller/loginController');

const router = express.Router();

router.post('/userAuth',isAuth,loginController.postLogin);


module.exports = router;