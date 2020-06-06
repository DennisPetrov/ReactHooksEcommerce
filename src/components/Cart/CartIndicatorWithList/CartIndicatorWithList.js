import React, { useContext } from 'react';
import classes from './CartIndicatorWithList.module.css';
import pages from '../../../config/pages';
import CountIndicator from '../../CountIndicator/CountIndicator';
import CartContext from '../../../contexts/Cart';

const CartIndicatorWithList = () => {
    const [cartItems,] = useContext(CartContext);
    const count = Object.keys(cartItems).reduce(((total, key) => total + cartItems[key]), 0);

    return (
        <div className={classes.wrap}>
            <CountIndicator 
            indicatorLogo="shopping_cart"
            pageUrl= {pages.cart.url}  
            count={count}></CountIndicator>
        </div>
    );
};

export default CartIndicatorWithList;