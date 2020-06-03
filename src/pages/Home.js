import React from 'react';
import ProductListWithControls from '../components/Shop/ProductListWithControls/ProductListWithControls';

const Home = ({location}) => {
    return (
        <div>
            <div className="container-fluid container-max-width">
                    <ProductListWithControls location={location}></ProductListWithControls>
            </div>
        </div>
    );
};

export default Home;