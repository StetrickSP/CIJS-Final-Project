//Local Storage
export const fetchData = (key) => {
    const value = localStorage.getItem(key);
    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
}