import React from 'react';
import classes from './ProductListItemTile.module.css';
import ProductButtons from '../../ProductButtons/ProductButtons';
import { Link } from 'react-router-dom';

const ProductListItemTile = ({ product }) => {
    const inCompare = false;
    const inFavorites = false;
    const inCart = false;
    return (
        <div className={classes.wrap}>
            <Link to={product.link} className={classes.image_wrap}>
                <img src={`/images/products/${product.image}`} alt={product.name} className={classes.image} />
            </Link>
            <div className={classes.title}>
                <Link to={product.link}>
                    {product.name}
                </Link>
            </div>
            <div className={classes.specs}>
            {`[Display ${product.display} inches; RAM ${product.ram} Gb; HDD ${product.hdd}; Color: ${product.color}]`}
            </div>
            <div className={classes.controls}>
                <div className={classes.price}>
                    {product.price} $
                </div>
                <ProductButtons
                    inCompare={inCompare}
                    inFavorites={inFavorites}
                    inCart={inCart}
                />
            </div>
        </div>
    );
};

export default ProductListItemTile;