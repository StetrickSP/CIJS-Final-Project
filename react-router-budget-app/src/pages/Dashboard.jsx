// rrd imports 
import { useLoaderData } from 'react-router-dom';

// library
import { toast } from 'react-toastify';

// components
import Intro from '../components/Intro';
import AddBudgetForm from '../components/AddBudgetForm';

//helper functions
import { fetchData } from '../helpers';

// loader
export function dashboardLoader() {
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    return { userName, budgets };
}

// action
export async function dashboardAction({ request }) {
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
    const { userName, budgets }  = useLoaderData()

    return (
        <>
            { userName ? 
            (<div className='dashboard'>
                <h1>Welcome back, <span className="accent">{userName}</span></h1>
                <div className='grid-sm'>
                    {/* {budgets ? () : ()} */}
                    <div className="grid-lg">
                        <div className="flex-lg">
                            <AddBudgetForm/>
                        </div>
                    </div>
                </div>
            </div>) 
            : <Intro/> }
        </>
  );
}

export default Dashboard;