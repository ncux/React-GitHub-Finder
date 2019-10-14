import React, { Component } from 'react';

class Search extends Component {

    state = {
        searchTerm: ''
    };

    onSearchInput = e => this.setState({ [e.target.name]: e.target.value });

    onFormSubmit = e => {
      e.preventDefault();
      if(this.state.searchTerm === '') {
          this.props.setAlert('Enter a search term', 'light');
      } else {
          this.props.searchUsers(this.state.searchTerm);
          this.setState({ searchTerm: '' });
      }
    };

    render() {

        const { users, clearUsers } = this.props;

        return (
            <div className="">
                <form onSubmit={ this.onFormSubmit } className="form">
                    <input type="text" name="searchTerm" value={ this.state.searchTerm } onChange={ this.onSearchInput } placeholder="Search for users" />
                    <input type="submit" value="Search" className="btn btn-dark btn-block" />
                </form>
                { users.length ? (
                    <button onClick={ clearUsers } className="btn btn-light btn-block" >Clear</button>
                ) : null }
            </div>
        );
    }

}

export default Search;
