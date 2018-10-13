const {StatusModel} = require("../models/Status")
const {UserModel} = require("../models/User")

const status = new StatusModel()
const user = new UserModel()

class Pages {
    static index(req, res) {
        const data = {title: "MySQL - Week 1"}
        return res.render('index', data)
    }

    static w2(req, res) {
        Promise
            .all([user.names(), status.index()])
            .then(results => {
                const data = {
                    title: "MySQL - Week 2",
                    users: results[0],
                    status: results[1]
                }
                return res.render('week2', data)
            })
    }


}

module.exports = {PagesController: Pages}




