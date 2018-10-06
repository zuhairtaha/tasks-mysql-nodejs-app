import M from "materialize-css"
import {getTasksData} from "./javascripts/hwTasksList"

document.addEventListener('DOMContentLoaded', function () {
    M.AutoInit()
    document.querySelectorAll('#hwTasksList .taskItem')
        .forEach(task => task.addEventListener('click', getTasksData))
})