const express = require('express')
const router = express.Router()
const {TaskController} = require('../controller/Task')

/* GET home page. */
router
    .get('/api/', TaskController.index)
    .get('/api/count', TaskController.count)
    .get('/api/countNoValidDueDate', TaskController.countNoValidDueDate)
    .get('/api/done', TaskController.doneTasks)
    .get('/api/not-done', TaskController.notDoneTasks)
    .get('/api/recent', TaskController.recentlyCreated)
    .get('/api/most-recent', TaskController.mostRecentlyCreated)
    .get('/api/database', TaskController.tasksDatabase)
    .get('/api/title-status', TaskController.titleStatus)
    .get('/api/tasks-status-users', TaskController.tasksWithStatusAndUsers)
    .post('/api/add-task', TaskController.addNewTask)
    .patch('/api/:id', TaskController.updateTask)

module.exports = router
