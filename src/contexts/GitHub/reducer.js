import { SEARCH_USERS, GET_USER, CLEAR_USERS, GET_REPOS, REMOVE_ALERT, SET_ALERT, SET_LOADING } from "../types";

export const Reducer = (state, action) => {

    switch (action.type) {
        case SET_LOADING:
            return { ...state, loading: true };
        case SEARCH_USERS:
            return { ...state, users: action.payload, loading: false };
        case CLEAR_USERS:
            return { ...state, users: [], loading: false };
        case GET_USER:
            return { ...state, user: action.payload, loading: false };
        case GET_REPOS:
            return { ...state, repos: action.payload, loading: false };
        case SET_ALERT:
            return {  ...state, alert: { message: action.payload.message, type: action.payload.type } };
        case REMOVE_ALERT:
            return { ...state, alert: null };
        default:
            return state;
    }
};

