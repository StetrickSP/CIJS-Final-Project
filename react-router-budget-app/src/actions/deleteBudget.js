// libraries
import { toast } from "react-toastify";

// helper functions
import { deleteItem, getAllMatchingItems } from "../helpers";

// rrd imports
import { redirect } from "react-router-dom";

export function deleteBudget({params}) {
    try {
        deleteItem({
        key: "budgets",
        id: params.id,
        });

    const associatedExpenses = getAllMatchingItems({
        category: "expenses",
        key: "budgetId",
        value: params.id,
    });
    associatedExpenses.forEach((expense) => {
        deleteItem({
            key: "expenses",
            id: expense.id,
        });
    });

    // Notify user of successful deletion
    toast.success("Budget deleted successfully!");
    } catch (error) {
        throw new Error("Failed to delete budget");
    }
    return redirect("/"); // Redirect to the home page after deletion
}
