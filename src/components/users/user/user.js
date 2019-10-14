import React  from 'react';

const User = props => {

    const { login, avatar_url, html_url } = props.user;

    return (
        <div className="card text-center">
            <img src={ avatar_url } className="round-img" alt="" style={{ width: '60px' }} />
            <h3>{ login }</h3>
            <div>
                <a href={ html_url } target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-sm my-1">View profile</a>
            </div>
        </div>
    );

};

export default User;
