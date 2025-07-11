// rrd imports 
import { useLoaderData } from 'react-router-dom';

// library
import { toast } from 'react-toastify';

// components
import Intro from '../components/Intro';
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm';

//helper functions
import { createExpense, createBudget, fetchData, waait } from '../helpers';

// loader
export function dashboardLoader() {
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    return { userName, budgets };
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
}

const Dashboard = () => {
    const { userName, budgets }  = useLoaderData()

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
//action
export async function dashboardAction({request}) {
  const data = await request.formData();
  const formData = Object.fromEntries(data)
  try{
    throw new Error("hehe");
    localStorage.setItem("userName", JSON.stringify(formData.userName))
    return toast.success(`Welcome ${formData.userName}!`);
  }catch (e){
    return new Error("There was an problem to create your account.");
  }
}

export default Dashboard;