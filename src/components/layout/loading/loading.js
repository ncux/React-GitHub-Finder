import React, { Fragment } from "react";
import loading from '../../../styles/loading.gif';

const Loading = props => {

    return (
        <Fragment>
            <img src={ loading } alt="...loading" style={{ width: '200px', margin: ' 40px auto', display: 'block' }}/>
        </Fragment>
    );

};

export default Loading;

