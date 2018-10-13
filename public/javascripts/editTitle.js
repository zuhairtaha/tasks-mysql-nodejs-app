import {closeModal, openModal} from "./modals.js"
//import swal from "sweetalert"
import {RenderTasksList} from "./tasksStatusUsers.js"
//import M from "materialize-css"

const editTitleInput = document.querySelector('#editTitleModal #titleToEdit')
const updateTaskTitle = document.querySelector('#editTitleModal #updateTaskTitle')

export function editTitle(taskId) {

    fetch(`/task/api?id=${taskId}`)
        .then(data => data.json())
        .then(task => {
            editTitleInput.value = task[0].title
            openModal('#editTitleModal')
            updateTaskTitle.dataset.taskid = taskId
        }).catch(err => alert(err))

}

export function updateTitle(e) {
    e.preventDefault()
    const title = editTitleInput.value.trim()
    if (!title) {
        swal({
            title: "Warning",
            text: "Title is required",
            icon: "warning",
            button: "OK",
        })
        return
    }
    const taskId = this.dataset.taskid
    fetch(`/task/api/${taskId}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title})
    })
        .then(data => data.json())
        .then(data => {
            if (data.updated === true) {
                RenderTasksList()
                closeModal('#editTitleModal')
            }
        })
        .catch(err => swal({text: err, icon: "warning",}))
}
