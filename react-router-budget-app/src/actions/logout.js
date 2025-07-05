import { redirect } from "react-router-dom";
import { deleteItem } from "../helpers";

export async function logoutAction() {
    // Clear user data from local storage
    deleteItem({ key: "userName" });

    // Optionally, you can redirect the user to a different page after logout
    return redirect("/");
}