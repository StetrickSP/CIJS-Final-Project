// rrd imports 
import { useLoaderData } from 'react-router-dom';

//helper functions
import { fetchData } from '../helpers';

// loader
export function dashboardLoader() {
    const userName = fetchData("userName");
    return { userName };
}

const Dashboard = () => {
    const { userName }  = useLoaderData()

    return (
        <div>
            <h1>{userName}</h1>
            <h2>Dashboard</h2>
            <p>Welcome to the dashboard!</p>
        </div>
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