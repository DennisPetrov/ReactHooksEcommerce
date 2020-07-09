import React, { useEffect } from 'react';
import { stringify } from 'query-string';

import PageContentLayout from '../../components/PageContentLayout/PageContentLayout';
import useFetch from '../../hooks/useFetch';
import Loading from '../../components/Loading/Loading';
import NoResults from '../../components/NoResults/NoResults';
import ProductCard from '../../components/Shop/ProductCard/ProductCard';

const ProductPage = ({ match }) => {
    const stringifiedParams = stringify({
        slug: match.params["slug"]
    }, {
        arrayFormat: 'bracket'
    });
    const apiUrl = `/products/?${stringifiedParams}`;
    const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);
    useEffect(() => {
        doFetch();
    }, [doFetch, apiUrl]);
    const pageLoadSuccessfull = Boolean(!isLoading && !error && response && response.data && response.data.length !== 0);
    const pageData = pageLoadSuccessfull ? response.data[0] : null;
 
    return (
        <PageContentLayout>
            <React.Fragment>
                {isLoading && <Loading />}
                {Boolean(!isLoading && error) &&
                    <NoResults error={error} />
                }
                {pageLoadSuccessfull &&
                    <ProductCard product={pageData}/>
                }
            </React.Fragment>
        </PageContentLayout>
    );
};

export default ProductPage;