import React, { createContext, useReducer } from 'react';
import axios from "axios";
import { Reducer } from "./reducer";
import { SEARCH_USERS, GET_USER, CLEAR_USERS, GET_REPOS, REMOVE_ALERT, SET_ALERT, SET_LOADING } from "../types";

const API_ID = process.env.REACT_APP_CLIENT_ID;
const API_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const API_URL = `https://api.github.com/users`;

export const GitHubContext = createContext();

export const GitHubState = props => {

    const globalState = {
        title: '',
        icon: '',
        users: [],
        user: {},
        repositories: [],
        loading: false,
        alert: null
    };

    const [state, dispatch] = useReducer(Reducer, globalState);

    // search users
    const searchUsers = async searchTerm => {
        setLoading();
        const res = await axios.get(`https://api.github.com/search/users?q=${searchTerm}&client_id=${API_ID}&client_secret=${API_SECRET}`);
        dispatch({ type: SEARCH_USERS, payload: res.data.items });
    };

    // clear users
    const clearUsers = () => dispatch({ type: CLEAR_USERS });

    // get a user
    const getSingleUser = async userLogin => {
        setLoading(true);
        const res = await axios.get(`${API_URL}/${userLogin}?client_id=${API_ID}&client_secret=${API_SECRET}`);
        setUser(res.data);
        setLoading(false);
    };

    // get repos
    const getUserRepositories = async userLogin => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/users/${userLogin}/repos?per_page=5&sort=created:asc&client_id=${API_ID}&client_secret=${API_SECRET}`);
        setRepositories(res.data);
        setLoading(false);
    };

    // set alert
    const setAlert = (message, type) => {
        dispatch({ type: SET_ALERT, payload: { message, type } });
        setTimeout(() => dispatch({ type: REMOVE_ALERT }), 3000);
    };

    // set loading
    const setLoading = dispatch({ type: SET_LOADING });

    return (
        <GitHubContext.Provider value={{
            title: state.title,
            icon: state.icon,
            users: state.users,
            user: state.user,
            repos: state.repositories,
            loading: state.loading,
            alert: state.alert,
            searchUsers,
            clearUsers,
            setAlert
        }}>
            { props.children }
        </GitHubContext.Provider>
    )

};
