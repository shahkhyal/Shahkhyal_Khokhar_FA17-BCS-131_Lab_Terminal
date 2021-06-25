const userController = require('../controllers/user');
const express = require('express');
const router = express.Router();

router.post('/', userController.createUser);

router.post('/login', userController.loginUser);

module.exports = router;
