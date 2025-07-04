//rrd imports
import {redirect} from "react-rounter-dom";
import {toast} from " react-toastify ";

//helper 
//import{deleteItem} form "../helpers";

export async function logoutAction() {
    //delete the user 
    deleteItem({
        key: "userName"
    })
    toast.success("You have delete your account")
    return redirect("/")
}