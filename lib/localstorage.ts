export const storeInLocalStorage = (key: string, value: any) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, value);
    }
};

export const lookInInLocalStorage = (key: string) => {
    if (typeof window !== "undefined") {
        return localStorage.getItem(key);
    }
    return null;
};

export const removeFromLocalStorage = (key: string) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(key);
    }
};

export const logoutUser = () => {
    if (typeof window !== "undefined") {
        localStorage.clear();
    }
};