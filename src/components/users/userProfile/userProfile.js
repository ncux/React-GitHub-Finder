import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Loading from "../../layout/loading/loading";
import Repositories from "../../repositories/repositories/repositories";

const UserProfile = props => {

    const { getUser, getRepos, repos, loading } = props;

    useEffect(() => {
        getUser(props.match.params['userLogin']);
        getRepos(props.match.params['userLogin']);
        // eslint-disable-next-line
    }, []);

    const { login, name, avatar_url, html_url, location, bio, repos_url, followers, following  } = props.user;

    if(loading) {
        return <Loading />
    }

    return (
        <Fragment>
            <Link to="/" className="btn btn-light">back</Link>
            <div className="card grid-2">

                <div className="all-center">
                    <img src={ avatar_url } className="round-img" alt="" style={{ width: '60px' }} />
                    <h1>{ name }</h1>
                    <p><strong>Location</strong>: { location }</p>
                </div>

                <div className="">
                    { login && ( <p><strong>Username</strong>: { login }</p> ) }
                    { bio && ( <Fragment> <h3>Bio</h3>  <p>{ bio }</p> </Fragment> ) }
                    <ul>
                        <li>
                            <strong>Profile</strong>: <a href={ html_url } target="_blank" rel="noopener noreferrer" className="">View profile</a>
                        </li>
                        <li>
                            <strong>Public repositories</strong>: { repos_url && ( <a href={ `https://github.com/${login}?tab=repositories` } target="_blank" rel="noopener noreferrer" className="">View repositories</a> ) }
                        </li>

                    </ul>
                </div>

            </div>
            <div className="card text-center">
                <div className="badge badge-success">
                    { followers && ( <p><strong>Followers</strong>: { followers }</p> ) }
                </div>
                <div className="badge badge-info">
                    { following && ( <p><strong>Following</strong>: { following }</p> ) }
                </div>
            </div>
            <Repositories repos={ repos } />
        </Fragment>
    );

};

export default UserProfile;
