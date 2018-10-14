import M from "materialize-css"
import {getTasksData} from "./javascripts/hwTasksList"
import "./javascripts/tasksStatusUsers"
import "./javascripts/addNewTask"
import {updateDueDate} from "./javascripts/editDueDate"
import {updateTitle} from "./javascripts/editTitle"
import {RenderTasksList} from "./javascripts/tasksStatusUsers"

M.AutoInit()

// document.ready
document.addEventListener('DOMContentLoaded', function () {

    // week 1 homework
    const taskItem = document.querySelectorAll('#hwTasksList .taskItem')
    if (taskItem) taskItem.forEach(task => task.addEventListener('click', getTasksData))

    // week 2 homework
    if (document.querySelector(`#tasks-list`)) {
        RenderTasksList()
    }

    const updateTaskDueDate = document.querySelector('#updateTaskDueDate')
    if (updateTaskDueDate) updateTaskDueDate.addEventListener('click', updateDueDate)

    const updateTaskTitle = document.querySelector('#updateTaskTitle')
    if (updateTaskTitle) updateTaskTitle.addEventListener('click', updateTitle)

})