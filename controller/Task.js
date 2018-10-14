const {TaskModel} = require("../models/Task")

const task = new TaskModel()

class Task {
    static index(req, res, next) {
        if (req.query.id) {
            task.getRow(req.query.id)
                .then(data => res.send(data))
        }
        else
            task.all()
                .then(data => res.send(data))
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

    static tasksWithStatusAndUsers(req, res) {
        task.getTasksWithStatusAndUsers()
            .then(data => res.send(data))
    }

    static addNewTask(req, res) {
        task.add(req.body)
            .then(result => res.send(result))
            .catch(error => res.status(404).send(error))
    }

    static updateTask(req, res) {
        task.updateField(req.params.id, req.body)
            .then(() => res.status(200).send({"updated": true}))
            .catch(err => res.status(500).send(err))
    }

    static deleteTask(req, res) {
        task.destroy(req.params.id)
            .then(result => res.send(result))
            .catch(err => res.status(500).send(err))
    }

}

module.exports = {TaskController: Task}




