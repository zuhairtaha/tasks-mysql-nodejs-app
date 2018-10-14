const mysql = require("mysql")
const localDB = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hyf-1'
}
const onlineDB = {
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b42d09cef0af7d',
    password: '4f939ce0',
    database: 'heroku_b943da5b7a251d3'
}
const db = mysql.createConnection(onlineDB)

// connect
db.connect(error => {
    if (error) throw error
    console.log('Database connected...')
})

// --------------------------
// HTTP Verb	Path (URL)	Action (Method)	Route Name

class DB {
    /**
     * constructor of DB
     * @param {String} table table name
     * @param {Array} fields table fields
     */
    constructor(table, fields) {
        this.table = table
        this.fields = fields
    }

    // ------------------------------------------------------------------
    query(sql) {
        return new Promise((resolve, reject) => {
            db.query(sql, (error, result) => {
                if (error) reject(result)
                resolve(result)
            })
        })
    }

    // ------------------------------------------------------------------
    /**
     *
     * @param {Object} pagination
     * @param {Number} pagination.limit
     * @param {Number} pagination.offset
     * @param {Object} order
     * @param {String} order.column
     * @param {String} order.by
     */
    index(pagination = null, order = null) {
        //  GET	/table	index	table.index
        let sql =
                `SELECT * 
                FROM ${this.table} `
        if (order)
            sql += ` ORDER BY ${order.column} ${order.by}`
        if (pagination)
            sql += ` LIMIT ${pagination.limit}
                    OFFSET ${pagination.offset}`
        return this.query(sql)
    }

    // ------------------------------------------------------------------
    count() {
        return this.query(`SELECT COUNT(*) AS count FROM ${this.table}`)
    }

    // ------------------------------------------------------------------

    create() {
        // GET	/table/create	create	table.create
    }


    store(obj) {
        // POST	/table	store	table.store
        return new Promise((resolve, reject) => {
            if (!this.fields.includes(...Object.keys(obj)))
                reject("object is not valid")
            db.query('INSERT INTO ?? SET ?', [this.table, obj], (error, result) => {
                if (error) reject(error)
                resolve(result)
            })
        })
    }

    getRow(id) {
        // GET	/table/{id}	show	table.show
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM?? WHERE id = ?', [this.table, id], (error, result) => {
                if (error) reject(error)
                resolve(result)
            })
        })
    }

    edit(id) {
        // GET	/table/{id}/edit	edit	table.edit
    }

    update(id) {
        // PUT/PATCH	/table/{id}	update	table.update
    }

    destroy(id) {
        // DELETE	/table/{id}	destroy	table.destroy
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM?? WHERE id = ?', [this.table, id], (error, result) => {
                if (error) reject(error)
                resolve(result)
            })
        })
    }


}

// --------------------------
module.exports = {DB, db}