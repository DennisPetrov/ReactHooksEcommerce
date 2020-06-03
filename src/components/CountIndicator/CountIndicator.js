import React from 'react';
import classes from './CountIndicator.module.css';
import { Link } from 'react-router-dom'

const CountIndicator = ({ indicatorLogo, count, pageUrl }) => {
    return (
        <Link to={pageUrl} className={classes.indicator}>
            <span className="material-icons">{indicatorLogo}</span>
            <img src={indicatorLogo} className={classes.icon} alt="" />
            <span className={classes.count}>
                {count}
            </span>
        </Link>
    );
};

export default CountIndicator;