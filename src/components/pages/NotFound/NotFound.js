import React from "react";
import { Link } from 'react-router-dom';

const NotFound = props => {

    return (
        <div className="text-center">
            <h1>Page not found</h1>
            <Link to="/" className="btn btn-dark">Home</Link>
        </div>
    );

};

export default NotFound;

