export function getTasksData() {
    const id = parseInt(this.id)
    let collapsibleBody = this.querySelector('.collapsible-body')
    collapsibleBody.innerHTML =
        `<div class="progress">
            <div class="indeterminate"></div>
         </div>`
    const IDsUrls = [
        {id: 1, url: '/task/count'},
        {id: 2, url: 'task/countNoValidDueDate'},
        {id: 3, url: 'task/done'},
        {id: 4, url: 'task/not-done'},
        {id: 5, url: 'task/recent'},
        {id: 6, url: 'task/most-recent'},
        {id: 7, url: 'task/database'},
        {id: 8, url: 'task/title-status'},
        {id: 9, url: 'status/tasks-count'},
        {id: 10, url: 'status/tasks-count-desc'}
    ]

    const fetchUrl = IDsUrls.find(idUrl => idUrl.id === id)
    fetchTasksJSONData(fetchUrl.url)
        .then(data => collapsibleBody.innerHTML = renderResults(data))
        .catch(error => collapsibleBody.innerHTML = error)

}

function fetchTasksJSONData(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(data => data.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

function renderResults(obj) {
    const keys = Object.keys(obj[0])
    // number of th = key length
    let table = ` <table><thead><tr>`
    keys.forEach(key => {
        const formattedKey = key.replace(/_/g, ' ')
        table += `<th class="capitalize">${formattedKey}</th>`
    })
    table += `</tr></thead>`
    obj.forEach(row => {
        table += `<tr>`
        keys.forEach(key => table += ` <td>${row[key]}</td>`)
        table += `<tr>`
    })
    table += `</tbody></table>`

    return table
}