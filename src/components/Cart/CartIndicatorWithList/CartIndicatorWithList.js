import React, { useContext, useEffect } from 'react';
import { stringify } from 'query-string';

import classes from './CartIndicatorWithList.module.css';
import pages from '../../../config/pages';
import CountIndicator from '../../CountIndicator/CountIndicator';
import CartContext from '../../../contexts/Cart';
import useFetch from '../../../hooks/useFetch';
import CartListSmall from '../CartListSmall/CartListSmall';


const CartIndicatorWithList = () => {
    const [cartItems, dispatchCart] = useContext(CartContext);
    const count = Object.keys(cartItems).reduce(((total, key) => total + cartItems[key]), 0);
    const stringifiedParams = stringify({
        id: Object.keys(cartItems)
    }, {
        arrayFormat: 'bracket'
    });

    const apiUrl = `/products/?${stringifiedParams}`;
    const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);

    useEffect(() => {
        if (stringifiedParams) {
            doFetch();
        }
    }, [doFetch, stringifiedParams]);

    return (
        <div className={classes.wrap}>
            <CountIndicator
                indicatorLogo="shopping_cart"
                pageUrl={pages.cart.url}
                count={count} />
            <div className={classes.cartList}>
                <CartListSmall
                    products={response && response.data}
                    cartItems={cartItems}
                    error={error}
                    isLoading={isLoading}
                    dispatchCart={dispatchCart}
                />
            </div>
        </div>
    );
};

export default CartIndicatorWithList;