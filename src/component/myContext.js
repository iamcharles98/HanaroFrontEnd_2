import { createContext, useRef } from "react";
import { getUserContextFromLocalStorage } from "./localStorageUtil";

export const MyContext = createContext();

export const ContextProvider = ({children}) => {
    const userContext  = useRef({id:-1, name : "", isLogin : false});
    if(getUserContextFromLocalStorage() != null) {
        let user = getUserContextFromLocalStorage();
        userContext.current={...user};
    }

    return (
        <MyContext.Provider value={userContext}>
            {children}
        </MyContext.Provider>
    );
}