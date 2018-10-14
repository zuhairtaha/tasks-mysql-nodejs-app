import swal from "sweetalert"
import {RenderTasksList} from "./tasksStatusUsers"


export function deleteUser(userId, userName) {
    swal({
        title: "Are you sure?",
        text: `Once ${userName} deleted, all tasks for him will be deleted!`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {

                fetch(`/user/api/${userId}`, {method: 'delete'})
                    .then(() => {
                        RenderTasksList()
                        // deleteUserFromDropDownList(userName)
                    })
                    .catch(err => swal({text: err, icon: "warning"}))

                swal("Poof! User has been deleted!", {
                    icon: "success",
                })
            }
        })
} // end deleteUser

// to remove delete user from add new task form
function deleteUserFromDropDownList(userName) {
    document.querySelectorAll('#usersDropDown li span')
        .forEach(span => {
            if (span.textContent === userName)
                this.parentNode.remove()
        })
}