const express = require('express')
const router = express.Router()
const {StatusController} = require('../controller/Status')

/* GET home page. */
router
    .get('/', StatusController.index)
    .get('/tasks-count',StatusController.nameTasksCount)
    .get('/tasks-count-desc',StatusController.nameTasksCountDesc)

module.exports = router
