'use strict'

const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const istoken = require('../helpers/checker')


/* GET users listing. */

router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/check',istoken,userController.check)
router.get('/check',istoken,userController.check)

router.get('/destroy',istoken,userController.destroy)
router.get('/:id',userController.findbyid)



module.exports = router;
