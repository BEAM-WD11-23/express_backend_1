var express = require('express');
var router = express.Router()
var userController = require('../controllers/userControllers');


router.get('/users', userController.allUsers)



module.exports = { router }