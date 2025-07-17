//rrd imports
import { useLoaderData } from 'react-router-dom';

// helpers
import { deleteItem, fetchData } from '../helpers';

// components
import Table from '../components/Table';

// library
import { toast } from 'react-toastify';

// loader
export function expensesLoader() { // when fetchData, use aync/await
    // const userName = fetchData("userName");
    // const budgets = fetchData("budgets");
    const expenses = fetchData("expenses");
    return { expenses };
}

// action
export async function expensesAction({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

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

const ExpensesPage = () => {
    const { expenses } = useLoaderData();

    return (
        <div className="grid-lg">
            <h1>All Expenses</h1>
            <p>Here you can view and manage your expenses.</p>
            {
                expenses && expenses.length > 0 ? (
                    <div className="grid-md">
                        <h2>Recent expenses <small>({expenses.length} total)</small></h2>
                        <Table expenses={expenses}/>
                    </div>
                )
                : <p>No expenses to show</p>
            }
        </div>
    );
}
export default ExpensesPage;