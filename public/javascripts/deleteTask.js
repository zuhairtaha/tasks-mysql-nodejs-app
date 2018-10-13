function fadeOut(el) {
    el.style.opacity = 1;

    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none"
        } else {
            requestAnimationFrame(fade)
        }
    })()
}

export function deleteTask(taskId) {
    fadeOut(document.querySelector(`#task-row-${taskId}`))
}