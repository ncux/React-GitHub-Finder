import React, {Component, Fragment} from 'react';
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

class App extends Component {

  state = {
    title: "GitHub Finder",
    icon: "fab fa-github",
    usersAPI: `${API_URL}?client_id=${API_ID}&client_secret=${API_SECRET}`,
    alert: null,
    loading: false,
    users: [],
    user: {}
  };

    searchUsers = async searchTerm => {
      this.setState({ loading: true });
      const res = await axios.get(`https://api.github.com/search/users?q=${searchTerm}&client_id=${API_ID}&client_secret=${API_SECRET}`);
      this.setState({ users: res.data.items, loading: false });
    };

    getSingleUser = async userLogin => {
        this.setState({ loading: true });
        const res = await axios.get(`${API_URL}/${userLogin}?client_id=${API_ID}&client_secret=${API_SECRET}`);
        console.log(res.data);
        this.setState({ user: res.data, loading: false });
    };

    clearUsers = () => this.setState({ users: [], loading: false });

    setAlert = (message, type) => {
        this.setState({ alert: { message, type } });
        setTimeout(() => this.setState({ alert: null }), 3000);
    };

    render() {

    const { title, icon, alert, loading, users, user } = this.state;

    return (
       <BrowserRouter>
           <div className="App">
               <Navbar title={ title } icon={ icon } />
               <div className="container">
                   <Alert alert={ alert } />
                   <Switch>
                       <Route exact path="/" render={ props => (
                           <Fragment>
                               <Search searchUsers={ this.searchUsers } users={ users } clearUsers={ this.clearUsers } setAlert={ this.setAlert } />
                               <Users loading={ loading } users={ users } />
                           </Fragment>
                       ) } />
                       <Route exact path="/user/:userLogin" render={ props => (
                          <UserProfile { ...props } getUser={ this.getSingleUser } user={ user } loading={ loading } />
                       ) } />
                       <Route exact path="/about" component={ About } />
                   </Switch>

               </div>
           </div>
       </BrowserRouter>
    );
  }

}

export default App;
