// rrd imports 
import { useLoaderData, Link } from 'react-router-dom';

// library
import { toast } from 'react-toastify';

// components
import Intro from '../components/Intro';
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetItem from '../components/BudgetItem'; 
import Table from '../components/Table';

//helper functions
import { createExpense, createBudget, fetchData, waait, deleteItem } from '../helpers';

// loader
export function dashboardLoader() {
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    const expenses = fetchData("expenses");
    return { userName, budgets, expenses };
}

// action
export async function dashboardAction({ request }) {
    await waait(); // Simulate a delay for the action

    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);
    console.log(_action);

    // New User submission
    if (_action === "newUser") {
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName)); 
            return toast.success(`Welcome ${values.userName}!`);
        } catch (error) {
            throw new Error("Failed to save user name");
        } 
    };

    // Create Budget submission
    if (_action === "createBudget") {
        try {
            // create a new budget
            createBudget({
                name: values.newBudget,
                amount: values.newBudgetAmount,
            });
            return toast.success(`Budget created!`);
        } catch (error) {
            throw new Error("Failed to create budget");
        } 
    };

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

    // Create Budget submission
    if (_action === "createBudget") {
        try {
            // create budget

            return toast.success(`Budget created successfully!`);
        } catch (error) {
            throw new Error("There was an error creating the budget");
        }
    }
}

const Dashboard = () => {
    const { userName, budgets, expenses }  = useLoaderData()

    return (
        <>
            { userName ? 
            // Render the dashboard if userName exists
            (<div className='dashboard'>
                   <h1>Welcome back, <span className="accent">{userName}</span></h1>
                <div className='grid-sm'>  
                    {
                        budgets && budgets.length > 0 ?
                        (<div className="grid-lg">
                            <div className="flex-lg">
                                <AddBudgetForm/>
                                <AddExpenseForm budgets={budgets}/>
                            </div>
                            <h2>Existing Budgets</h2>
                            <div className="budgets">
                                {
                                budgets.map((budget) => (
                                    <BudgetItem key={budget.id} budget={budget}/>
                                ))
                                }
                            </div>
                            {
                                expenses && expenses.length > 0 && (
                                    <div className="grid-md">
                                        <h2>Recent expenses</h2>
                                        <Table expenses={expenses.sort(
                                            (a, b) => b.createdAt - a.createdAt
                                        ).slice(0, 8)
                                        }/>
                                        {expenses.length > 8 && (
                                            <Link to="expenses" className='btn btn-dark'>
                                                View all expenses
                                            </Link>
                                        )}
                                    </div>
                                )
                            }
                        </div>)
                        :
                        (
                            <div className="grid-sm">
                                <p>Personal budgeting is the secret to financial freedom.</p>
                                <p>Start creating a budget now!</p>
                                <AddBudgetForm/>
                            </div>
                        )
                    }
                    
                </div>
            </div>) 
            // Render the intro component if userName does not exist
            : <Intro/> }
        </>
  );
}

export default Dashboard;