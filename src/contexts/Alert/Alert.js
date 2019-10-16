import React, { createContext, useReducer } from 'react';
import { Reducer } from "./reducer";
import { REMOVE_ALERT, SET_ALERT } from "../types";

export const AlertContext = createContext();

export const AlertState = props => {

    const alertState = { alert: null };

    const [state, dispatch] = useReducer(Reducer, alertState);

    // set alert
    const setAlert = (message, type) => {
        dispatch({ type: SET_ALERT, payload: { message, type } });
        setTimeout(() => dispatch({ type: REMOVE_ALERT }), 3000);
    };

    return (
        <AlertContext.Provider value={{ alert: state.alert, setAlert }}>
            { props.children }
        </AlertContext.Provider>
    )

};
