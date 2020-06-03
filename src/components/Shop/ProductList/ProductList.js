import React from 'react';
import classnames from 'classnames'

import classes from './ProductList.module.css'
import ProductListItemTile from '../ProductListItem/ProductListItemTile/ProductListItemTile';
import ProductListItemLine from '../ProductListItem/ProductListItemLine/ProductListItemLine';
import Loading from '../../Loading/Loading';

const ProductList = ({ products, viewType, isLoading, error }) => {
    let ViewComponent;
    let itemClasses;
    switch (viewType) {
        case 'line':
            ViewComponent = ProductListItemLine;
            itemClasses = "col-sm-12";
            break;
        case 'tile':
        default:
            ViewComponent = ProductListItemTile;
            itemClasses = "col-md-6 col-sm-6 col-lg-4 d-flex"
            break;
    }
    const outerClass = classnames({
        row: true,
        [classes.overlayLoading]: isLoading && products
    });
    return (
        <div className={outerClass}>
            {!products && isLoading && <Loading />}
            {!isLoading && error &&
                <p className="errorMessage">
                    {error}
                </p>
            }
            {!isLoading && !error && products && !products.length &&
                <p>
                    Nothing was found. Try setting other search parameters.
                </p>
            }
            {products && !!products.length && products.map((product) => {
                return <div className={itemClasses} key={product.id}>
                    <ViewComponent product={product}></ViewComponent>
                </div>
            })}
        </div>
    );
};

export default ProductList;