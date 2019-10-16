import React from "react";

const Repo = ({ repo }) => {

    return (
        <div className="card">
            <h3>
                <a href={ repo.html_url } target="_blank" rel="noopener noreferrer">{ repo.name }</a>
            </h3>
            <small>Created on { repo.created_at.slice(0, 10) }</small>
            <p>{ repo.description }</p>
        </div>
    );

};

export default Repo;

