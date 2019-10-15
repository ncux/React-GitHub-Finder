import React from "react";
import Repo from "../repo/repo";


const Repositories = ({ repos }) => {

    return (
        repos.map(repo => (
            <Repo key={ repo.id } repo={ repo } />
        ))
    );

};

export default Repositories;

