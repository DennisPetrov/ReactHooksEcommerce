import React from 'react';
import classes from './CartIndicatorWithList.module.css';
import pages from '../../../config/pages';
import CountIndicator from '../../CountIndicator/CountIndicator';

const CartIndicatorWithList = () => {
    return (
        <div className={classes.wrap}>
            <CountIndicator 
            indicatorLogo="shopping_cart"
            pageUrl= {pages.cart.url}  
            count={0}></CountIndicator>
        </div>
    );
};

export default CartIndicatorWithList;