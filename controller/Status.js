const {StatusModel} = require("../models/Status")

const status = new StatusModel()


class Status {
    static index(req, res) {
        status.all()
            .then(data => res.send(data))
    }

    static nameTasksCount(req, res) {
        status.nameTasksCount()
            .then(data => res.send(data))
    }
    static nameTasksCountDesc(req, res) {
        status.nameTasksCount("DESC")
            .then(data => res.send(data))
    }


}

module.exports = {StatusController: Status}




