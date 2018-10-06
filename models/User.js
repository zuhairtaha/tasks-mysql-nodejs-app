const {DB} = require("./DB")

class User extends DB {
    constructor() {
        super("user", ["name", "email", "phone"])
    }

    all() {
        return super.index()
    }

}

module.exports = {UserModel: User}