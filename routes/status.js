const express = require('express')
const router = express.Router()
const {StatusController} = require('../controller/Status')

/* GET home page. */
router
    .get('/api/', StatusController.index)
    .get('/api/tasks-count',StatusController.nameTasksCount)
    .get('/api/tasks-count-desc',StatusController.nameTasksCountDesc)

module.exports = router
