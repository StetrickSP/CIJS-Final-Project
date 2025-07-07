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

//Delete Item
export const deleteItem = ( {key} ) => {
    return localStorage.removeItem(key);
}