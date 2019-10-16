import React, { useContext } from 'react';
import UserItem from "../userItem/userItem";
import Loading from "../../layout/loading/loading";
import { GitHubContext } from "../../../contexts/GitHub/GitHub";

const Users = props => {

    const { users, loading } = useContext(GitHubContext);

    if(loading) {
        return (
            <Loading />
        )
    }

    return (
        <div style={ usersStyle }>
            { users.map(user => (
                <UserItem key={ user.id } user={ user } />
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
