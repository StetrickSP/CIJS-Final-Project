// rrd imports
import { redirect } from "react-router-dom";

// helpers 
import { deleteItem } from "../helpers";

// library
import { toast } from "react-toastify";

export async function logoutAction() {
    // Clear user data from local storage
    deleteItem({ key: "userName" });
    toast.success("You have successfully deleted your account!");

    // Optionally, you can redirect the user to a different page after logout
    return redirect("/");
}