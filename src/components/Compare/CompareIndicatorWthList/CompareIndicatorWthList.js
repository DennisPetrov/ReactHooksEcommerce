import React, { useContext } from 'react';
import classes from './CompareIndicatorWthList.module.css';
import CountIndicator from '../../CountIndicator/CountIndicator';
import pages from '../../../config/pages';
import CompareContext from '../../../contexts/Compare';
const CompareIndicatorWthList = () => {
    const [compareItems,] = useContext(CompareContext);
    const count = compareItems.length;

    return (
        <div className={classes.wrap}>
            <CountIndicator 
            indicatorLogo="compare"
            pageUrl= {pages.compare.url}  
            count={count}></CountIndicator>
        </div>
    );
};

export default CompareIndicatorWthList;