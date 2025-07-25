// components 
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";

// rrd imports
import { useLoaderData } from "react-router-dom";

// helpers
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";

// libraries
import { toast } from "react-toastify";

// loader
export async function budgetLoader({ params }) {
    const budget = await getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: params.id,
    })[0];
    const expenses = await getAllMatchingItems({
        category: "expenses",
        key: "budgetId",
        value: params.id,
    });

    if (!budget) {
        throw new Error("Budget not found");
    }

    return { budget, expenses };
}

// action
export async function budgetAction({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

    // Create Expense submission
        if (_action === "createExpense") {
            try {
                // create a new expense
                createExpense({
                    name: values.newExpense,
                    amount: values.newExpenseAmount,
                    budgetId: values.newExpenseBudget,
                })
                return toast.success(`Expense ${values.newExpense} created!`);
            } catch (error) {
                throw new Error("Failed to create expense");
            } 
        }

    // Delete Expense submission
        if (_action === "deleteExpense") {
            try {
                // create a new expense
                deleteItem({
                    key: "expenses",
                    id: values.expenseId,
                })
                return toast.success(`Expense deleted!`);
            } catch (error) {
                throw new Error("Failed to delete expense");
            } 
        }
}

const BudgetPage = () => {
    const { budget, expenses } = useLoaderData();

    return (
        <div className="grid-lg"
             style={{ "--accent": budget.color }}>
            <h1 className="h2">
                <span className="accent">{budget.name}</span> Overview
            </h1>
            <div className="flex-lg">
                <BudgetItem budget={budget} showDelete={true}/>
                <AddExpenseForm budgets={[budget]}/>
            </div>
            {
                expenses && expenses.length > 0 && (
                    <div className="grid-md">
                        <h2>
                            <span className="accent">{budget.name}</span> Expenses
                        </h2>
                        <Table expenses={expenses} showBudget={false}/>
                    </div>
                )
            }
        </div>
    );
}
export default BudgetPage;