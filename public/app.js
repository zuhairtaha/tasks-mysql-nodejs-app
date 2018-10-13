import M from "materialize-css"
import {getTasksData} from "./javascripts/hwTasksList"
import "./javascripts/tasksStatusUsers"
import "./javascripts/addNewTask"
import {updateDueDate} from "./javascripts/editDueDate"
import {updateTitle} from "./javascripts/editTitle"

M.AutoInit()

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('#hwTasksList .taskItem')
        .forEach(task => task.addEventListener('click', getTasksData))
})

document.querySelector('#updateTaskDueDate')
    .addEventListener('click', updateDueDate)


document.querySelector('#updateTaskTitle')
    .addEventListener('click', updateTitle)