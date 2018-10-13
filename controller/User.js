const {UserModel} = require("../models/User")

const user = new UserModel()

class User {
    static index(req, res, next) {
        user.all()
            .then(data => {
                res.send(data)
            })
    }

}

module.exports = {UserController: User}




