import React from 'react';
import User from "../user/user";
import Loading from "../../layout/loading/loading";

const Users = props => {

    const { loading, users } = props;

    if(loading) {
        return (
            <Loading />
        )
    }

    return (
        <div style={ usersStyle }>
            { users.map(user => (
                <User key={ user.id } user={ user } />
            )) }
        </div>
    );

};

const usersStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
};

export default Users;
