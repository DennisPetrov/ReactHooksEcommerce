import React from 'react';
import classes from './NoResults.module.css';

const NoResults = ({ error }) => {
    console.log(error);
    return (
        <div className={classes.wrap}>
            {error.response &&
                <p className={classes.errorName}>
                    Error {error.response.status}
                </p>
            }
            <p className={classes.errorDescription}>
                {error.message}
            </p>
            {error.response && error.response.status === 404 &&
                <p>
                    The resource you requested was not found.
                </p>
            }
        </div>
    );
};

export default NoResults;