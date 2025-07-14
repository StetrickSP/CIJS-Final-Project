// rrd imports
import { Form } from 'react-router-dom';

// library
import { UserPlusIcon } from '@heroicons/react/24/solid';

// assets
import illustration from '../assets/illustration.jpg';

const Intro = () => {
    // -- Add await functionality if needed for data fetching or other async operations here --

    return (
        <div className="intro">
            <div>
                <h1>
                    Take Control of <span className="accent">Your Money</span>
                </h1>
                <p>
                    Budgeting is the key to financial freedom.
                    Start tracking your expenses and savings today to achieve your financial goals.
                </p>
                <Form method='post'>
                    <input type="text" name="userName" required 
                    placeholder='What is your name?' aria-label='Your Name' autoComplete='given-name'/>
                    <input type="hidden" name="_action" value="newUser"/>
                    <button type='submit' className='btn btn-dark'>
                        <span>Start Budgeting</span>
                        <UserPlusIcon width={20}/>
                    </button>
                </Form>
            </div>
            <img src={illustration} alt="Person with money" width={600} />
        </div>
    );
}

export default Intro;