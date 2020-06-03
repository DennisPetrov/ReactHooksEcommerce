import React from 'react';

import image from './loading.svg';
import classes from './Loading.module.css';

const Loading = () => {
    return (
        <div className={classes.wrap}>
            <img src={image} alt="" className={classes.image}/>
        </div>
    );
};

export default Loading;