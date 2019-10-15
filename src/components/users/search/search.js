import React, { useState } from 'react';

const Search = ({ users, clearUsers, setAlert, searchUsers }) => {

    const [searchTerm, setSearchTerm] = useState('');

    const onFormSubmit = e => {
      e.preventDefault();
      if(searchTerm === '') {
          setAlert('Enter a search term', 'light');
      } else {
          searchUsers(searchTerm);
          setSearchTerm('');
      }
    };

    return (
        <div className="">
            <form onSubmit={ onFormSubmit } className="form">
                <input type="text" name="searchTerm" value={ searchTerm } onChange={ e => setSearchTerm(e.target.value) } placeholder="Search for users" />
                <input type="submit" value="Search" className="btn btn-dark btn-block" />
            </form>
            { users.length ? (
                <button onClick={ clearUsers } className="btn btn-light btn-block" >Clear</button>
            ) : null }
        </div>
    );
};

export default Search;
