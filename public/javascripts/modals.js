import M from "materialize-css"

export function closeModal(modalSelector) {
    const addNoteModal = document.querySelector(modalSelector)
    const instance = M.Modal.getInstance(addNoteModal)
    instance.close()
}


export function openModal(modalSelector) {
    M.updateTextFields()
    const addNoteModal = document.querySelector(modalSelector)
    const instance = M.Modal.getInstance(addNoteModal)
    instance.open()
}

export function openModalByElement(element) {
    M.updateTextFields()
    const instance = M.Modal.getInstance(element)
    instance.open()
}