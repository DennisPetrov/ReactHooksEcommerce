import React, { useContext, useEffect, useState } from 'react';
import { stringify } from 'query-string';
import classnames from 'classnames';

import classes from './CompareListFull.module.css';
import CompareContext from '../../../contexts/Compare';
import useFetch from '../../../hooks/useFetch';
import Loading from '../../Loading/Loading';
import { Link } from 'react-router-dom';
import ProductButtons from '../../Shop/ProductButtons/ProductButtons';
import Checkbox from '../../Inputs/Checkbox/Checkbox';


function construcProps(products, skipProps) {
    const comparePropKeys = {};
    if (products) {
        for (let i = 0; i < products.length; i++) {
            for (const propKey in products[i]) {
                if (!skipProps.includes(propKey) && !comparePropKeys[propKey]) {
                    comparePropKeys[propKey] = {
                        isDifferent: false
                    }
                    for (let j = 0; j < products.length; j++) {
                        if (products[i][propKey] !== products[j][propKey]) {
                            comparePropKeys[propKey].isDifferent = true;
                            break;
                        }
                    }
                }
            }
        }
    }
    return comparePropKeys;
}
const CompareListFull = () => {
    const [compareStore,] = useContext(CompareContext);
    const [showOnlyDifferencies, setShowOnlyDifferencies] = useState(false)
    const stringifiedParams = stringify({
        id: compareStore
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

    const products = response && response.data && response.data.length !== 0 ? response.data : null;
    const skipProps = ["category_id", "description", "id", "link", "slug", "name", "image"];
    const comparePropKeys = construcProps(products, skipProps);
    if (products) {
        for (let i = 0; i < products.length; i++) {
            for (const propKey in products[i]) {
                if (!skipProps.includes(propKey) && !comparePropKeys[propKey]) {
                    comparePropKeys[propKey] = {
                        isDifferent: false
                    }
                    for (let j = 0; j < products.length; j++) {
                        if (products[i][propKey] !== products[j][propKey]) {
                            comparePropKeys[propKey].isDifferent = true;
                            break;
                        }
                    }
                }
            }
        }
    }
    return (
        <div>
            {isLoading && <Loading />}
            {!isLoading && error &&
                <p className={classes.errorMessage}>
                    {error.message}
                </p>
            }
            {!products && !isLoading && !error &&
                <p>
                    Empty compare list.
                </p>
            }
            {products &&
                <div className={classes.wrap}>
                    <div className={classes.controlsWrap}>
                        <Checkbox
                            checked={showOnlyDifferencies}
                            label="Show only differencies"
                            onChange={() => {
                                setShowOnlyDifferencies(prevState => !prevState)
                            }}
                        />
                    </div>
                    <div className={classes.frame}>
                        <div className={classes.row}>
                            <div className={classnames(classes.cell, classes.cellTitle)}>
                                Name
                            </div>
                            {products.map(product => (
                                <div className={classes.cell} key={product.id}>
                                    <Link to={product.link} className={classes.productTitle}>
                                        {product["name"]}
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div className={classes.row}>
                            <div className={classnames(classes.cell, classes.cellTitle)}>
                                Image
                            </div>
                            {products.map(product => (
                                <div className={classes.cell} key={product.id}>
                                    {product.image &&
                                        <Link to={product.link} className={classes.productImageHolder}>
                                            <img src={`/images/products/${product.image}`} alt={product.name} className={classes.productImage} />
                                        </Link>
                                    }
                                </div>
                            ))}
                        </div>
                        {Object.keys(comparePropKeys).map(propKey => {
                            if (showOnlyDifferencies && !comparePropKeys[propKey].isDifferent) {
                                return <React.Fragment key={propKey}></React.Fragment>
                            } else {
                                return (
                                    <div className={classes.row} key={propKey}>
                                        <div className={classnames(classes.cell, classes.cellTitle)}>
                                            {propKey}
                                        </div>
                                        {products.map(product => (
                                            <div className={classes.cell} key={product["id"]}>
                                                {product[propKey] ?? ""}
                                            </div>
                                        ))}
                                    </div>
                                )
                            }
                        })}
                        <div className={classes.row}>
                            <div className={classnames(classes.cell, classes.cellTitle)}></div>
                            {products.map(product => (
                                <div className={classes.cell} key={product.id}>
                                    <ProductButtons productID={product.id} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default CompareListFull;