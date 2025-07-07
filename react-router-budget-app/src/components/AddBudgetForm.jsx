// rrd imports
import { Form } from 'react-router-dom';

// library
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

const AddBudgetForm = () => {
    return (
        <div className="form-wrapper">
            <h2 className="h3">
                Create new budget
            </h2>
            <Form
                method='post'
                className="grid-sm"
            >
                <div className="grid-xs">
                    <label htmlFor="newBudget">Label</label>
                    <input 
                        type="text" 
                        name='newBudget' 
                        id='newBudget'
                        placeholder='e.g. Groceries' required
                    />
                </div>
                <div className="grid-xs">
                    <label htmlFor="newBudgetAmount">Amount</label>
                    <input 
                        type="number" 
                        step="1" 
                        name="newBudgetAmount" id="newBudgetAmount"
                        placeholder='e.g. 1000' required
                        inputMode='decimal'
                    />
                </div>
                <input type="hidden" name="_action" value="createBudget"/>
                <button type='submit' className='btn btn--dark'>
                    <span>Create budget</span>
                    <CurrencyDollarIcon width={20}/>
                </button>
            </Form>
        </div>
    );
}
export default AddBudgetForm;