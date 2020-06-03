import React from 'react';
import classes from './FavoritesIndicatorWithList.module.css';
import CountIndicator from '../../CountIndicator/CountIndicator';
import pages from '../../../config/pages';

const FavortiesIndicatorWithList = () => {
    return (
        <div className={classes.wrap}>
            <CountIndicator 
            indicatorLogo="favorite"
            pageUrl= {pages.favorites.url} 
            count={0}></CountIndicator>
        </div>
    );
};

export default FavortiesIndicatorWithList;