const {DB} = require("./DB")

class Task extends DB {
    constructor() {
        super("status", ["title", "description", "created", "updated",
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


}

module.exports = {TaskModel: Task}