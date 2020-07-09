import React, { useContext } from 'react';
import classnames from 'classnames';
import classes from './ProductButtons.module.css'
import CartContext from '../../../contexts/Cart';
import FavoritesContext from '../../../contexts/Favorites';
import CompareContext from '../../../contexts/Compare';

const ProductButtons = ({ productID, wrapClass }) => {
    const [cartItems, dispatchCart] = useContext(CartContext);
    const [favoriteItems, dispatchFavorites] = useContext(FavoritesContext);
    const [compareItems, dispatchCompare] = useContext(CompareContext);

    const inCompare = compareItems.includes(productID);
    const inFavorites = favoriteItems.includes(productID);
    const inCart = cartItems[productID];

    return (
        <div className={classnames(classes.buttons, wrapClass)}>
            <button
                onClick={() => {
                    dispatchCompare({
                        type: "TOGGLE_COMPARE",
                        payload: productID,
                    })
                }}
                className={classnames('buttonReset', classes.compare_btn, { [classes.compare_btn_active]: inCompare })}>
                <span className="material-icons">compare</span>
            </button>
            <button
                onClick={() => {
                    dispatchFavorites({
                        type: "TOGGLE_FAVORITE",
                        payload: productID,
                    })
                }}
                className={classnames('buttonReset', classes.favorites_btn, { [classes.favorites_btn_active]: inFavorites })}>
                <span className="material-icons">favorite</span>
            </button>
            <button
                onClick={() => {
                    dispatchCart({
                        type: "ADD_TO_CART",
                        payload: {
                            id: productID,
                            count: 1,
                        },
                    })
                }}
                className={classnames('buttonReset', classes.cart_btn, { [classes.cart_btn_active]: inCart })}>
                <span className="material-icons">shopping_cart</span>
            </button>
        </div>
    );
};

export default ProductButtons;