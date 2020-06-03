import React from 'react';
import classnames from 'classnames'
import {Link} from 'react-router-dom';

import classes from './Header.module.css'
import HeaderNavigation from '../../Navigation/HeaderNavigation/HeaderNavigation';

import CompareIndicatorWthList from '../../Compare/CompareIndicatorWthList/CompareIndicatorWthList';
import FavoritesIndicatorWithList from '../../Favorites/FavoritesIndicatorWithList/FavoritesIndicatorWithList';
import CartIndicatorWithList from '../../Cart/CartIndicatorWithList/CartIndicatorWithList';

const Header = () => {

    return (
        <header className={classes.header}>
            <div className="container-fluid container-max-width">
                <div className="row">
                    <div className="col">
                        <div className="d-flex justify-content-between">
                            <Link className={classes.logo} to="/">
                                E-commerce
                            </Link>
                            <div className={classnames(classes.controls, 'd-flex', 'justify-content-between')}>
                                <div className={classnames(classes.menu)}>
                                    <HeaderNavigation></HeaderNavigation>
                                </div>
                                <div className={classnames(classes.controls__item, classes.compare)}>
                                    <CompareIndicatorWthList></CompareIndicatorWthList>
                                </div>
                                <div className={classnames(classes.controls__item, classes.favorites)}>
                                    <FavoritesIndicatorWithList></FavoritesIndicatorWithList>
                                </div>
                                <div className={classnames(classes.controls__item, classes.cart)}>
                                    <CartIndicatorWithList></CartIndicatorWithList>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;