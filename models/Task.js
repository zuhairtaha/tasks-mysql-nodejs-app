const mysql = require("mysql")
const {DB, db} = require("./DB")

class Task extends DB {
    constructor() {
        super("task", ["title", "description", "created", "updated",
            "due_date", "status_id", "user_id"])
    }

    all() {
        return super.index()
    }

    countNoValidDueDate() {
        return super.query(`
            SELECT
              COUNT(task.id) AS tasks_count_task_do_not_have_a_valid_due_date
            FROM task
            WHERE task.due_date IS NULL`
        )
    }

    doneTasks(done = true) {
        let sql = `
            SELECT
              task.title AS task_title,
              status.name AS task_status
            FROM task
              INNER JOIN status
                ON task.status_id = status.id`
        if (done) sql += ` WHERE status.name = 'done'`
        else sql += ` WHERE status.name != 'done'`
        return super.query(sql)
    }

    recentlyCreated(limit = null) {
        let sql = `
        SELECT
          task.created,
          task.title
        FROM task
        ORDER BY task.created DESC
        `
        if (limit) sql += ` limit ${limit}`
        return super.query(sql)
    }

    tasksDatabase() {
        const sql = `
        SELECT
          task.title task_title,
          task.due_date
        FROM task
        WHERE task.title LIKE '%database%'
        OR task.description LIKE '%database%'`
        return super.query(sql)
    }

    titleStatus() {
        return super.query(`
        SELECT CONCAT( "title: ", task.title,". status: ",  status.name) tasks_and_status
        FROM task
          INNER JOIN status
            ON task.status_id = status.id
        `)
    }

    getTasksWithStatusAndUsers() {
        return super.query(`
        SELECT
          t.id,
          t.user_id,
          t.title,
          t.due_date,
          s.name AS status,
          u.name AS user,
          t.description
        FROM task t
          JOIN status s
            ON t.status_id = s.id
          JOIN user u
            ON t.user_id = u.id
          ORDER BY t.id DESC
        `)
    }

    add(obj) {
        const created = {"created": mysql.raw('CURRENT_TIMESTAMP()')}
        obj = {...obj, ...created}
        return super.store(obj)
    }

    updateField(id, obj) {
        const field = Object.keys(obj)[0]
        if (!this.fields.includes(field))
            return Promise.reject("invalid field name")
        return new Promise((resolve, reject) => {
            const CURRENT_TIMESTAMP = {
                toSqlString: () => 'CURRENT_TIMESTAMP()'
            }
            db.query('UPDATE ?? SET ?? = ?, updated = ? WHERE id = ?',
                [this.table, field, obj[field], CURRENT_TIMESTAMP, id], (error, result) => {
                    if (error) reject(error)
                    resolve(result)
                })
        })
    }


}

module.exports = {TaskModel: Task}