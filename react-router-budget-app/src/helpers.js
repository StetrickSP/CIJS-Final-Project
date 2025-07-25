export const waait = () => new Promise(res => setTimeout(res, Math.random() * 2000));

// Random color generator
const generateRandomColor = () => {
    const existingBudgetLength = fetchData("budgets")?.length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`;
}

//Local Storage
export const fetchData = (key) => {
    const value = localStorage.getItem(key);
    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
}

// create budget
export const createBudget = ({name, amount}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createAt: Date.now(),
        amount: +amount,
        // color: 
    }
}

// Get all items from local storage
export const getAllMatchingItems = ({ category, key, value }) => {
    const data = fetchData(category) ?? [];
    return data.filter((item) => item[key] === value);
};

// delete an item from local storage
export const deleteItem = ({ key, id }) => {
    const existingData = fetchData(key);
    if (id) {
        const newData = existingData.filter((item) => item.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
}

//Create a budget
export const createBudget = ( {name, amount} ) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount, 
        color: generateRandomColor(),
    };
    const existingBudgets = fetchData("budgets") ?? [];
    return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]));
}

//Create an expense
export const createExpense = ( {name, amount, budgetId} ) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount, 
        budgetId: budgetId,
    };
    const existingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]));
}


// Total spent by budget
export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
        // check if the expense belongs to the budget
        if (expense.budgetId !== budgetId) return acc;

        // add the current amount to the total
        return acc += expense.amount;
    }, 0)
    return budgetSpent;
}

/// Formatting
export const formatDateToLocaleString = (epoch) => 
    new Date(epoch).toLocaleDateString();

// Format percentage
export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
    })
}

// Format currency
export const formatCurrency = (amt) => {
    if (amt == null || isNaN(amt)) return "₫0";
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency: "VND",
    });
}