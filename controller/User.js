const {UserModel} = require("../models/User")

const user = new UserModel()

class User {
    static index(req, res, next) {
        user.all()
            .then(data => {
                res.send(data)
            })
    }

    static deleteUser(req, res) {
        user.destroy(req.params.id)
            .then(result => res.send(result))
            .catch(err => res.status(500).send(err))
    }

}

module.exports = {UserController: User}




