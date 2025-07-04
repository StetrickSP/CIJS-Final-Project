// rrd imports 
import { Outlet, useLoaderData } from 'react-router-dom';

//assets 
import wave from '../assets/wave.svg';

//helper functions
import { fetchData } from '../helpers';

// loader
export function mainLoader() {
    const userName = fetchData("userName");
    return { userName };
}

const Main = () => {
    const { userName }  = useLoaderData()

    return (
        <div className="layout">
            <h1>Main</h1>
            <main>
             <Outlet/>
            </main>
            <img src={wave} alt=""/>
        </div>
  );
}
export default Main; 