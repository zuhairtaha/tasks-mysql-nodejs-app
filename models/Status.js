const {DB} = require("./DB")

class Status extends DB {
    constructor() {
        super("status", ["name"])
    }

    all() {
        return super.index(
            {limit: 2, offset: 0},
            {column: 'id', by: 'desc'}
        )
    }

    nameTasksCount(orderBy = 'ASC') {
        return super.query(`
        SELECT
          status.name AS status_name,
          COUNT(task.id) AS tasks_count
        FROM task
          INNER JOIN status
            ON task.status_id = status.id
        GROUP BY status.name
        ORDER BY tasks_count ${orderBy}
        `)
    }
}

module.exports = {StatusModel: Status}