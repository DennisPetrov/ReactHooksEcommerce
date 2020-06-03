import React from 'react';
import classes from './CompareIndicatorWthList.module.css';
import CountIndicator from '../../CountIndicator/CountIndicator';
import pages from '../../../config/pages';
const CompareIndicatorWthList = () => {
    return (
        <div className={classes.wrap}>
            <CountIndicator 
            indicatorLogo="compare"
            pageUrl= {pages.compare.url}  
            count={0}></CountIndicator>
        </div>
    );
};

export default CompareIndicatorWthList;