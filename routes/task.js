const express = require('express')
const router = express.Router()
const {TaskController} = require('../controller/Task')

/* GET home page. */
router
    .get('/', TaskController.index)
    .get('/count', TaskController.count)
    .get('/countNoValidDueDate', TaskController.countNoValidDueDate)
    .get('/done', TaskController.doneTasks)
    .get('/not-done', TaskController.notDoneTasks)
    .get('/recent', TaskController.recentlyCreated)
    .get('/most-recent', TaskController.mostRecentlyCreated)
    .get('/database', TaskController.tasksDatabase)
    .get('/title-status', TaskController.titleStatus)

module.exports = router
