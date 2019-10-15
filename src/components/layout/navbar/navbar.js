import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = props => {

    const { title, icon } = props;

    return (
        <nav className="navbar bg-primary">
            <h1> <i className={ icon }></i> { title }</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>

                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
