import M from "materialize-css"
import {deleteTask} from "./deleteTask"
import {editTitle} from "./editTitle"
import {editDueDate} from "./editDueDate"

function getStatus(statusText) {
    let status
    switch (statusText) {
        case 'Done':
            status = ' checked="checked" '
            break
        case 'Not started':
            status = ''
            break
        case 'In progress':
            status = ' class="indeterminate-checkbox" '
            break
    }
    return status
}

function renderResults(obj) {
    let item = ''
    obj.forEach((task, index) => {
        item += `
        <div class="row task-row" id="task-row-${task.id}">
            <div class="col s1 card-content">
                <label>
                    <input ${getStatus(task.status)} type="checkbox"/>
                    <span></span>
                </label>
            </div>
            <div class="col s10">
                 <p class="m0"><i class="material-icons">label_outline</i> <b>${task.title}</b></p>`
        if (task.description !== null) item +=
            `<p class="m0"><i class="material-icons">lightbulb_outline</i> ${task.description}</p>`
        item +=
            `<p class="m0"><i class="material-icons">person_outline</i> ${task.user}</p>`
        if (task.due_date !== null) item += `
             <p class="m0">
                <small class="">
                    <i class="material-icons">access_time</i> ${new Date(task.due_date).toLocaleString()}
                </small>
             </p>`
        item += `
            </div>
            <div class="col s1">
                <p>
                  <!-- Dropdown Trigger -->
                  <a class='dropdown-trigger btn' href='#' data-target='dropdown-${task.id}'>
                    <i class="material-icons">more_horiz</i>
                  </a> 
                  <!-- Dropdown Structure -->
                  <ul style="min-width:200px" id='dropdown-${task.id}' 
                      class='dropdown-content'>
                    <li>
                        <a href="#!" class="controlBtn" data-action="edit_title" data-user_id="${task.user_id}" data-taskid="${task.id}">
                            <i class="material-icons">rate_review</i> Edit title</a>
                    </li>
                    <li>
                        <a href="#!" class="controlBtn" data-action="edit_due_date" data-user_id="${task.user_id}" data-taskid="${task.id}">
                            <i class="material-icons">edit</i> Edit due date</a>
                    </li>
                    <li>
                        <a href="#!" class="controlBtn" data-action="delete_task" data-user_id="${task.user_id}" data-taskid="${task.id}">
                            <i class="material-icons">delete_sweep</i> Delete task</a>
                    </li>
                    <li>
                        <a href="#!" class="controlBtn" data-action="delete_user" data-user_id="${task.user_id}" data-taskid="${task.id}">
                            <i class="material-icons">pool</i> Delete user</a>
                    </li>
                  </ul>
                </p>
            </div>
        </div>`
    })
    return item
}


const tasksListDom = document.querySelector(`#tasks-list`)

export function RenderTasksList() {
    tasksListDom.innerHTML = `<div class="progress"><div class="indeterminate"></div></div>`
    fetch('task/api/tasks-status-users')
        .then(data => data.json())
        .then(data => {
            tasksListDom.innerHTML = renderResults(data)
            tasksListDom.querySelectorAll('.indeterminate-checkbox')
                .forEach(checkbox => checkbox.indeterminate = true)
            tasksListDom.querySelectorAll('.controlBtn')
                .forEach(controlBtnClick)
            M.AutoInit()
        }).catch(err => console.log(err))

}

if (tasksListDom) {
    RenderTasksList()
}

function controlBtnClick(controlButton) {
    controlButton.addEventListener("click", function (e) {
        e.preventDefault()
        const taskId = this.dataset.taskid
        const action = this.dataset.action
        const userId = this.dataset.user_id

        if (action === 'edit_title') editTitle(taskId)
        if (action === 'edit_due_date') editDueDate(taskId)
        if (action === 'delete_task') deleteTask(taskId)
        if (action === 'delete_user') deleteUser(userId)
    })
}





