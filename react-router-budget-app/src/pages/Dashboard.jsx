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
            <h1>Welcome, {userName}</h1>
            <h2>Dashboard</h2>
            <p>Welcome to the dashboard!</p>
        </div>
  );
}
export default Dashboard;