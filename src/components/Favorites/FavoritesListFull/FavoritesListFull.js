import React, { useContext, useEffect } from 'react';
import { stringify } from 'query-string';
import FavoritesContext from '../../../contexts/Favorites';
import useFetch from '../../../hooks/useFetch';
import ProductListItemLine from '../../Shop/ProductListItem/ProductListItemLine/ProductListItemLine';
import Loading from '../../Loading/Loading';
const FavoritesListFull = () => {
    const [favoritesItems,] = useContext(FavoritesContext);
    const stringifiedParams = stringify({
        id: favoritesItems
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
    return (
        <div>
            {isLoading && <Loading />}
            {!isLoading && error &&
                <p>
                    {error.message}
                </p>
            }
            {!products && !isLoading && !error &&
                <p>
                    Empty favorites list.
                </p>
            }
            {products &&
                <div className="row">
                    {products.map(product => (
                        <div className="col-sm-12" key={product.id}>
                            <ProductListItemLine product={product} />
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};

export default FavoritesListFull;