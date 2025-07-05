// rrd imports 
import { useLoaderData } from 'react-router-dom';

// components
import Intro from '../components/Intro';

//helper functions
import { fetchData } from '../helpers';

// loader
export function dashboardLoader() {
    const userName = fetchData("userName");
    return { userName };
}

// action
export async function dashboardAction({ request }) {
    const data = await request.formData();
    const userName = formData.get("userName");
    localStorage.setItem("userName", userName);
    return { userName };
}

const Dashboard = () => {
    const { userName }  = useLoaderData()

    return (
        <>
            { userName ? (<h1>{userName}</h1>) : <Intro/> }
        </>
  );
}
export default Dashboard;