// rrd imports 
import { useLoaderData } from 'react-router-dom';

//helper functions
import { fetchData } from '../helpers';

// loader
export function aboutLoader() {
    const userName = fetchData("userName");
    return { userName };
}

const About = () => {
    const { userName }  = useLoaderData()

    /// !-------------------------------- Cook o phan nay ----------------------------------- ///
    return (
        <div>  
            <h1>Welcome {userName}</h1>
            <h2>About us</h2>
            <p>Welcome! This is where you will find out more about us!</p>
        </div>
  );
}  /// -------------------------------- Cook o phan nay -----------------------------------! ///
export default About;