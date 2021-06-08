var express = require('express');
var router = express.Router();

const { usersController } = require('../controller');

// * POST /users/login
router.post('/login', usersController.login.post);

// * POST /users/logout
router.post('/logout', usersController.logout.post);

// * get /users/userinfo
router.get('/userinfo', usersController.userinfo.get);

module.exports = router;
