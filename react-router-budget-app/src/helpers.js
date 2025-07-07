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

//Delete Item
export const deleteItem = ( {key} ) => {
    return localStorage.removeItem(key);
}