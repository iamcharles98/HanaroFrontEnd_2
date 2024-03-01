
const userContextKey = "loginUser";

export const setUserContextToLocalStorage = (userInfo) => {
    localStorage.setItem(userContextKey, JSON.stringify(userInfo));
}

export const getUserContextFromLocalStorage = () => {
    const saved = localStorage.getItem(userContextKey);
    return saved? JSON.parse(saved)[0]: null;
}





