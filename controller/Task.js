const {TaskModel} = require("../models/Task")

const task = new TaskModel()

class Task {
    static index(req, res, next) {
        task.all()
            .then(data => {
                res.send(data)
            })
    }

    static count(req, res) {
        task.count()
            .then(data => res.send(data))
    }

    static countNoValidDueDate(req, res) {
        task.countNoValidDueDate()
            .then(data => res.send(data))
    }

    static doneTasks(req, res) {
        task.doneTasks(true)
            .then(data => res.send(data))
    }

    static notDoneTasks(req, res) {
        task.doneTasks(false)
            .then(data => res.send(data))
    }

    static recentlyCreated(req, res) {
        task.recentlyCreated()
            .then(data => res.send(data))
    }

    static mostRecentlyCreated(req, res) {
        task.recentlyCreated(1)
            .then(data => res.send(data))
    }

    static tasksDatabase(req, res) {
        task.tasksDatabase()
            .then(data => res.send(data))
    }

    static titleStatus(req, res) {
        task.titleStatus()
            .then(data => res.send(data))
    }

    static initDB(req, res) {
        task.initDB()
            .then(() => res.send('done'))
    }

}

module.exports = {TaskController: Task}




