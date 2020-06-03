import React from 'react';
import classnames from 'classnames';
import classes from './ProductButtons.module.css'

const ProductButtons = ({inCompare, inFavorites, inCart}) => {
    return (
        <div className={classes.buttons}>
            <button className={classnames('buttonReset', classes.compare_btn, { [classes.compare_btn_active]: inCompare })}>
                <span className="material-icons">compare</span>
            </button>
            <button className={classnames('buttonReset', classes.favorites_btn, { [classes.favorites_btn_active]: inFavorites })}>
                <span className="material-icons">favorite</span>
            </button>
            <button className={classnames('buttonReset', classes.cart_btn, { [classes.cart_btn_active]: inCart })}>
                <span className="material-icons">shopping_cart</span>
            </button>
        </div>
    );
};

export default ProductButtons;