import React, { useEffect, useState, useRef, useCallback, useReducer } from 'react';
import { stringify, parse } from 'query-string'
import { useHistory } from 'react-router-dom'

import ProductList from '../ProductList/ProductList';
import ProductFilter from '../ProductFilter/ProductFilter';
import ProductListControls from '../ProductListControls/ProductListControls';
import useFetch from '../../../hooks/useFetch';
import { productListLimits, orderTypes } from '../../../config/shopConfig';
import Pagination from '../../Pagination/Pagination';



const ProductListWithControls = ({ location }) => {
    const queryParams = parse(location.search);
    const page = queryParams['page'] ? Number(queryParams['page']) : 1;
    const wrapRef = useRef(null);
    
    const [productListLimit, setProductListLimit] = useState(productListLimits.default);
    const [orderBy, setOrderBy] = useState(orderTypes.default);
    const [viewType, setViewType] = useState('tile');
    const history = useHistory();
    const [filterUrl, setFilterUrl] = useState({});

    let stringifiedParams = stringify({
        limit: productListLimit,
        order: orderBy,
        page: page,
        ...filterUrl,
        ...queryParams
    }, {
        arrayFormat: 'bracket'
    });

    const apiUrl = `/products?${stringifiedParams}`;
    const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);
    const products = response && response.data;

    const filterApiUrl = `/filter`;
    const [{
        response: filterResponse,
        isLoading: isFilterLoading,
        error: filterError
    }, doFilterFetch] = useFetch(filterApiUrl);
    
    const updateOrderBy = (event) => {
        const queryParams = parse(location.search);
        queryParams['order'] = event.target.value;
        delete queryParams['page'];
        history.push({
            pathname: location.pathname,
            search: "?" + stringify(queryParams),
        });
        setOrderBy(event.target.value);
    };
    

    const updateFilter = (object) => {
        let queryParams = parse(location.search);
        delete queryParams['page'];
        for (const key in queryParams) {
            if(!object[key]){
                delete queryParams[key];
            }
        }
        queryParams = {
            ...queryParams,
            ...object
        }
        history.push({
            pathname: location.pathname,
            search: "?" + stringify(queryParams),
        });
        setFilterUrl(object);
    };



    useEffect(() => {
        doFilterFetch();
    }, [doFilterFetch]);

    useEffect(() => {
        const wrapOffset = wrapRef.current.offsetTop;
        if ((wrapOffset < window.pageYOffset ||
            wrapOffset > window.pageYOffset + window.innerHeight)) {
            window.scrollTo({
                top: wrapOffset,
                behavior: "smooth"
            });
        }
    }, [products]);

    useEffect(() => {
        doFetch();
    }, [doFetch, stringifiedParams]);

    return (
        <div className="row" ref={wrapRef}>
            <div className="col-lg-3">
                <ProductFilter
                    filters={filterResponse}
                    isLoading={isFilterLoading}
                    error={filterError}
                    updateFilter={updateFilter}
                />
            </div>
            <div className="col-lg-9">
                <ProductListControls
                    setViewType={setViewType}
                    viewType={viewType}
                    showBy={productListLimit}
                    setShowBy={setProductListLimit}
                    orderBy={orderBy}
                    location={location}
                    setOrderBy={updateOrderBy}
                />
                <ProductList
                    products={products}
                    viewType={viewType}
                    isLoading={isLoading}
                    error={error} />
                <Pagination
                    limit={productListLimit}
                    currentPage={page}
                    location={location}
                    total={response && response.total} />
            </div>
        </div>
    );
};

export default ProductListWithControls;