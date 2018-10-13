export function getTasksData() {
    const id = parseInt(this.id)
    let collapsibleBody = this.querySelector('.collapsible-body')
    collapsibleBody.innerHTML =
        `<div class="progress">
            <div class="indeterminate"></div>
         </div>`
    const IDsUrls = [
        {id: 1, url: 'task/api/count'},
        {id: 2, url: 'task/api/countNoValidDueDate'},
        {id: 3, url: 'task/api/done'},
        {id: 4, url: 'task/api/not-done'},
        {id: 5, url: 'task/api/recent'},
        {id: 6, url: 'task/api/most-recent'},
        {id: 7, url: 'task/api/database'},
        {id: 8, url: 'task/api/title-status'},
        {id: 9, url: 'status/api/tasks-count'},
        {id: 10, url: 'status/api/tasks-count-desc'}
    ]

    const fetchUrl = IDsUrls.find(idUrl => idUrl.id === id)
    fetchTasksJSONData(fetchUrl.url)
        .then(data => collapsibleBody.innerHTML = renderResults(data))
        .catch(error => collapsibleBody.innerHTML = error)

}

export function fetchTasksJSONData(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(data => data.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

export function renderResults(obj) {
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