import {closeModal, openModal} from "./modals"
import swal from "sweetalert"
import {RenderTasksList} from "./tasksStatusUsers"

const editDateInput = document.querySelector('#editDueDateModal #dateEdit')
const editTimeInput = document.querySelector('#editDueDateModal #timeEdit')
const title = document.querySelector('#editDueDateModal #title-dueDate')
const updateTaskDueDate = document.querySelector('#editDueDateModal #updateTaskDueDate')

export function editDueDate(taskId) {
    fetch(`/task/api?id=${taskId}`)
        .then(data => data.json())
        .then(task => {
            title.innerHTML = task[0].title
            const currentDueDate = new Date(task[0].due_date)
            if (currentDueDate.toString() !== 'Invalid Date') {
                editDateInput.value = currentDueDate.toLocaleDateString()
                editTimeInput.value = currentDueDate.toLocaleTimeString()
            }
            openModal('#editDueDateModal')
            updateTaskDueDate.dataset.taskid = taskId

        }).catch(err => alert(err))

}


export function updateDueDate(e) {
    e.preventDefault()
    const newEditDate = editDateInput.value
    const newEditTime = editTimeInput.value
    let due_date = new Date(`${newEditDate} ${newEditTime}`)
    if (due_date.toString() === 'Invalid Date') {
        swal({text: "Invalid DateTime", icon: "warning"})
        return
    }
    const taskId = this.dataset.taskid
    fetch(`/task/api/${taskId}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({due_date})
    })
        .then(data => data.json())
        .then(data => {
            if (data.updated === true) {
                RenderTasksList()
                closeModal('#editDueDateModal')
            }
        })
        .catch(err => swal({text: err, icon: "warning",}))
}
