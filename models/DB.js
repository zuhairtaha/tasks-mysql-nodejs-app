const mysql = require("mysql")
const connectionObj = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hyf-1'
}
const connectionObj2 = {
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'bb4df4b37199a0',
    password: '6d5f3bfa',
    database: 'heroku_37b75dd635d896f'
}
const db = mysql.createConnection(connectionObj)

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

    store() {
        // POST	/table	store	table.store
    }

    show(id) {
        // GET	/table/{id}	show	table.show
    }

    edit(id) {
        // GET	/table/{id}/edit	edit	table.edit
    }

    update(id) {
        // PUT/PATCH	/table/{id}	update	table.update
    }

    destroy(id) {
        // DELETE	/table/{id}	destroy	table.destroy
    }
}

// --------------------------
module.exports = {DB}