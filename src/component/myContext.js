import { BASE_URL, getData } from "./myAxios";
import { createContext, useReducer } from "react";

const initialState = {
    isLogin : false
};


export const MyContext = createContext();

export const MyContextProvider = ({children}) => {
    
    return(
        <MyContext.Provider value={initialState}>
            {children}
        </MyContext.Provider>
    );
}