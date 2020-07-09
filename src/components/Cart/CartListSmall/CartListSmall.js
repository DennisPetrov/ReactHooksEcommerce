import React, { useCallback } from 'react';
import classes from './CartListSmall.module.css';
import Loading from '../../Loading/Loading';
import { Link } from 'react-router-dom';
import QuantityControls from '../QuantityControl/QuantityControls';

const CartListSmall = ({ products, cartItems, error, isLoading, dispatchCart }) => {
    const cartItemsEmpty = Object.keys(cartItems).length === 0;
    const changeCallback = useCallback((count, id) => {
        dispatchCart({
            type: "SET_QUANTITY",
            payload: {
                count: count,
                id: id
            }
        })
    }, [dispatchCart]);
    return (
        <div className={classes.wrap}>
            {!products && isLoading && <Loading />}
            {!isLoading && error &&
                <p className={classes.errorMessage}>
                    {error.message}
                </p>
            }
            {(!products || cartItemsEmpty) && !isLoading && !error &&
                <p>
                    Empty cart.
                </p>
            }
            {products && !!products.length && !cartItemsEmpty &&
                <div>
                    <div className={classes.products}>
                        {products.filter((product) => (cartItems[product.id])).map((product) => {
                            return <div className={classes.productItem} key={product.id}>
                                <Link to={product.link} className={classes.image_wrap}>
                                    <img src={`/images/products/${product.image}`} alt={product.name} className={classes.image} />
                                </Link>
                                <div className={classes.title}>
                                    <Link to={product.link}>
                                        {product.name}
                                    </Link>
                                </div>
                                <div className={classes.quantityConrol}>
                                    <QuantityControls
                                        defaultCount={cartItems[product.id]}
                                        stock={product.stock}
                                        changeCallback={changeCallback}
                                    />
                                </div>
                            </div>
                        })}
                    </div>
                    <div className={classes.buttonsWrap}>
                        <button className="btn btn_transparent ">1-Click buy</button>
                        <button className="btn">Checkout</button>
                    </div>
                </div>
            }
        </div>
    );
};

export default CartListSmall;