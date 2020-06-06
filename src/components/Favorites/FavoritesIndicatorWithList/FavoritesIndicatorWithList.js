import React, { useContext } from 'react';
import classes from './FavoritesIndicatorWithList.module.css';
import CountIndicator from '../../CountIndicator/CountIndicator';
import pages from '../../../config/pages';
import FavoritesContext from '../../../contexts/Favorites';

const FavortiesIndicatorWithList = () => {
    const [favoritesItems,] = useContext(FavoritesContext);
    const count = favoritesItems.length;

    return (
        <div className={classes.wrap}>
            <CountIndicator 
            indicatorLogo="favorite"
            pageUrl= {pages.favorites.url} 
            count={count}></CountIndicator>
        </div>
    );
};

export default FavortiesIndicatorWithList;