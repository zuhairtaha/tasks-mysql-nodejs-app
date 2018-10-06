const express = require('express')
const router = express.Router()
const {UserController} = require('../controller/User')

/* GET home page. */
router.get('/', UserController.index)

module.exports = router
