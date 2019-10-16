import React, { useContext } from "react";
import Repo from "../repo/repo";
import { GitHubContext } from "../../../contexts/GitHub/GitHub";

const Repositories = () => {

    const { repos } = useContext(GitHubContext);

    return (
        repos.map(repo => (<Repo key={ repo.id } repo={ repo } />))
    );

};

export default Repositories;

