import { REMOVE_ALERT, SET_ALERT } from "../types";

export const Reducer = (state, action) => {

    switch (action.type) {

        case SET_ALERT:
            return {  ...state, alert: { message: action.payload.message, type: action.payload.type } };
        case REMOVE_ALERT:
            return { ...state, alert: null };
        default:
            return state;
    }
};

