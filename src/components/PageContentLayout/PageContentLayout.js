import React from 'react';
import classes from './PageContentLayout.module.css';

const PageContentLayout = ({ title, children }) => {
    return (
        <div className={classes.wrap}>
            {title &&
                <div className={classes.heading}>
                    <div className="container-fluid container-max-width">
                        <div className="row">
                            <div className="col">
                                <h1>
                                    {title}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className="container-fluid container-max-width">
                <div className="row">
                    <div className="col">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageContentLayout;