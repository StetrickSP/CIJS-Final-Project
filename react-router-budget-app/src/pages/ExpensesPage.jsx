//rrd imports
import { useLoaderData } from 'react-router-dom';

// helpers
import { fetchData } from '../helpers';

// components
import Table from '../components/Table';

// loader
export function expensesLoader() {
    // const userName = fetchData("userName");
    // const budgets = fetchData("budgets");
    const expenses = fetchData("expenses");
    return { expenses };
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