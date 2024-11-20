import { createContext, useContext, useEffect, useReducer } from "react";

const intialstate = {
        user: localStorage.getItem('user') != undefined ? JSON.parse(localStorage.getItem('user')) : null,
        role:localStorage.getItem('role') || null,
        token: localStorage.getItem('token') || null
  
}

export const AuthContext = createContext(intialstate);

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                user: null,
                role: null,
                token: null,
            };

        case 'LOGIN_SUCCESS':
            console.log("LOGIN_SUCCESS payload:", action.payload);
            return {
                user: action.payload.user,
                token: action.payload.token,
                role: action.payload.role
            };

        case 'LOGOUT':
            return {
                user: null,
                role: null,
                token: null,
            };

        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, intialstate);

useEffect(()=> {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("token", state.token);
    localStorage.setItem("role", state.role);
}, [state]);

    return <AuthContext.Provider value={{ user: state.user, token: state.token, role: state.role, dispatch }}>
        {children}
    </AuthContext.Provider>
}

