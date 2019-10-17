import React, { createContext, useReducer } from 'react';
import axios from "axios";
import { Reducer } from "./reducer";
import { SEARCH_USERS, GET_USER, CLEAR_USERS, GET_REPOS, SET_LOADING } from "../types";

const API_ID = process.env.REACT_APP_CLIENT_ID;
const API_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const API_URL = `https://api.github.com/users`;

let GitHubClientId;
let GitHubClientSecret;
if(process.env.NODE_ENV !== 'production') {
    GitHubClientId = API_ID;
    GitHubClientSecret = API_SECRET;
} else {
    GitHubClientId = process.env.CLIENT_ID;
    GitHubClientSecret = process.env.CLIENT_SECRET;
}

export const GitHubContext = createContext();

export const GitHubState = props => {

    const githubState = {
        title: '',
        icon: '',
        users: [],
        user: {},
        repos: [],
        loading: false,
        alert: null
    };

    const [state, dispatch] = useReducer(Reducer, githubState);

    // search users
    const searchUsers = async searchTerm => {
        setLoading();
        const res = await axios.get(`https://api.github.com/search/users?q=${searchTerm}&client_id=${GitHubClientId}&client_secret=${GitHubClientSecret}`);
        dispatch({ type: SEARCH_USERS, payload: res.data.items });
    };

    // clear users
    const clearUsers = () => dispatch({ type: CLEAR_USERS });

    // get a user
    const getSingleUser = async userLogin => {
        setLoading();
        const res = await axios.get(`${API_URL}/${userLogin}?client_id=${GitHubClientId}&client_secret=${GitHubClientSecret}`);
        dispatch({ type: GET_USER, payload: res.data });
    };

    // get repos
    const getUserRepositories = async userLogin => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${userLogin}/repos?per_page=5&sort=created:asc&client_id=${GitHubClientId}&client_secret=${GitHubClientSecret}`);
        dispatch({ type: GET_REPOS, payload: res.data });
    };

    // set loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    return (
        <GitHubContext.Provider value={{
            title: state.title,
            icon: state.icon,
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            alert: state.alert,
            searchUsers,
            clearUsers,
            getSingleUser,
            getUserRepositories,
        }}>
            { props.children }
        </GitHubContext.Provider>
    )

};
