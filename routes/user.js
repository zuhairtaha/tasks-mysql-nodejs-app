const express = require('express')
const router = express.Router()
const {UserController} = require('../controller/User')

/* GET home page. */
router.get('/api/', UserController.index)

module.exports = router
