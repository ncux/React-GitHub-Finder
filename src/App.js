import React, { useState, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from 'axios';
import './App.css';
import Navbar from "./components/layout/navbar/navbar";
import Users from "./components/users/users/users";
import Search from "./components/users/search/search";
import Alert from "./components/layout/alert/alert";
import About from "./components/pages/about/about";
import UserProfile from "./components/users/userProfile/userProfile";

const API_ID = process.env.REACT_APP_CLIENT_ID;
const API_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const API_URL = `https://api.github.com/users`;

const App = () => {

    const [title, setTitle] = useState('');
    const [icon, setIcon] = useState('');
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const searchUsers = async searchTerm => {
      setLoading(true);
      const res = await axios.get(`https://api.github.com/search/users?q=${searchTerm}&client_id=${API_ID}&client_secret=${API_SECRET}`);
      setUsers(res.data.items);
      setLoading(false);
    };

    const getSingleUser = async userLogin => {
        setLoading(true);
        const res = await axios.get(`${API_URL}/${userLogin}?client_id=${API_ID}&client_secret=${API_SECRET}`);
        setUser(res.data);
        setLoading(false);
    };

    const getUserRepositories = async userLogin => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/users/${userLogin}/repos?per_page=5&sort=created:asc&client_id=${API_ID}&client_secret=${API_SECRET}`);
        setRepositories(res.data);
        setLoading(false);
    };

    const clearUsers = () => {
        setUsers([]);
        setLoading(false);
    };

    const setAlertMessage = (message, type) => {
        setAlert({ message, type });
        setTimeout(() => setAlert(null), 3000);
    };


    return (
        <BrowserRouter>
            <div className="App">
                <Navbar title={ title } setTitle={ setTitle } icon={ icon } setIcon={ setIcon } />
                <div className="container">
                    <Alert alert={ alert } />
                    <Switch>
                        <Route exact path="/" render={ props => (
                            <Fragment>
                                <Search searchUsers={ searchUsers } users={ users } clearUsers={ clearUsers } setAlert={ setAlertMessage } />
                                <Users loading={ loading } users={ users } />
                            </Fragment>
                        ) } />
                        <Route exact path="/user/:userLogin" render={ props => (
                            <UserProfile { ...props } getUser={ getSingleUser } getRepos={ getUserRepositories } user={ user } repos={ repositories } loading={ loading } />
                        ) } />
                        <Route exact path="/about" component={ About } />
                    </Switch>

                </div>
            </div>
        </BrowserRouter>
    );

};

export default App;
