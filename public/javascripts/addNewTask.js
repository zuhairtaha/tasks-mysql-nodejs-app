import swal from 'sweetalert'
import {RenderTasksList} from "./tasksStatusUsers"
import {closeModal} from "./modals"

const saveTaskBtn = document.querySelector('#saveTaskBtn')
if (saveTaskBtn)
    saveTaskBtn.addEventListener('click', addNewTask)


function addNewTask(event) {
    event.preventDefault()

// get fields values
    const title = document.querySelector('#add-task-modal #title').value.trim()
    const description = document.querySelector('#add-task-modal #description').value.trim()
    const date = document.querySelector('#add-task-modal #date').value
    const time = document.querySelector('#add-task-modal #time').value
    const user_id = document.querySelector('#add-task-modal #user').selectedOptions[0].value
    const status_id = document.querySelector('#add-task-modal #status').selectedOptions[0].value
    let exception = false
    try {
        if (!title)
            throw new Error('Title is required')
        if (!date)
            throw new Error('Date is required')
        if (!time)
            throw new Error('Time is required')
        if (!user_id)
            throw new Error('User is required')
        if (!status_id)
            throw new Error('Status is required')

        let due_date = new Date(`${date} ${time}`)
        if (due_date.toString() === 'Invalid Date')
            throw  new Error('Invalid date')

        due_date = due_date.toISOString()
        const taskObj = {title, description, due_date, user_id, status_id}
        fetch('/task/api/add-task', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskObj)
        }).then(res => res.json())
            .then(response => {
                swal({
                    title: "Added Successfully",
                    text: `new task added: id = ${response.insertId}`,
                    icon: "success",
                    button: "OK"
                })
                RenderTasksList()
            })
            .catch(err => swal({
                title: "Error",
                text: "Error inserting new task \n" + err,
                icon: "warning",
                button: "OK",
            }))

    } catch (e) {
        exception = true
        swal({
            title: "Warning",
            text: e.message,
            icon: "warning",
            button: "OK",
        })
    }
    if (!exception) {
        closeModal('#add-task-modal')
    }

}