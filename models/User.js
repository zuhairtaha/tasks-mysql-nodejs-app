const {DB} = require("./DB")

class User extends DB {
    constructor() {
        super("user", ["name", "email", "phone"])
    }

    all() {
        return super.index()
    }

    names() {
        return super.query(`SELECT id, name FROM user`)
    }
}

module.exports = {UserModel: User}