const express = require('express')
const router = express.Router()
const {UserController} = require('../controller/User')

/* GET home page. */
router
    .get('/api/', UserController.index)
    .delete('/api/:id', UserController.deleteUser)
module.exports = router
