import React, { useState, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/layout/navbar/navbar";
import Users from "./components/users/users/users";
import Search from "./components/users/search/search";
import Alert from "./components/layout/alert/alert";
import About from "./components/pages/about/about";
import UserProfile from "./components/users/userProfile/userProfile";
import { GitHubState } from "./contexts/GitHub/GitHub";
import { AlertState } from "./contexts/Alert/Alert";

const App = () => {

    const [title, setTitle] = useState('');
    const [icon, setIcon] = useState('');

    return (
        <AlertState>
            <GitHubState>
                <BrowserRouter>
                    <div className="App">
                        <Navbar title={ title } setTitle={ setTitle } icon={ icon } setIcon={ setIcon } />
                        <div className="container">
                            <Alert />
                            <Switch>
                                <Route exact path="/" render={ props => (
                                    <Fragment>
                                        <Search />
                                        <Users />
                                    </Fragment>
                                ) } />
                                <Route exact path="/user/:userLogin" component={ UserProfile } />
                                ) } />
                                <Route exact path="/about" component={ About } />
                            </Switch>
                        </div>
                    </div>
                </BrowserRouter>
            </GitHubState>
        </AlertState>
    );
};

export default App;
