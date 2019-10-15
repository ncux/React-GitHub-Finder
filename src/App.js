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
import { GitHubState } from "./contexts/GitHub/GitHub";

const App = () => {

    const [title, setTitle] = useState('');
    const [icon, setIcon] = useState('');
    // const [users, setUsers] = useState([]);
    // const [user, setUser] = useState({});
    // const [repositories, setRepositories] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const [alert, setAlert] = useState(null);

    return (
        <GitHubState>
            <BrowserRouter>
                <div className="App">
                    <Navbar title={ title } setTitle={ setTitle } icon={ icon } setIcon={ setIcon } />
                    <div className="container">
                        <Alert alert={ alert } />
                        <Switch>
                            <Route exact path="/" render={ props => (
                                <Fragment>
                                    <Search />
                                    <Users />
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
        </GitHubState>
    );

};

export default App;
