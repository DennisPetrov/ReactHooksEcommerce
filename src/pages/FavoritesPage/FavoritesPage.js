import React from 'react';
import PageContentLayout from '../../components/PageContentLayout/PageContentLayout';
import FavoritesListFull from '../../components/Favorites/FavoritesListFull/FavoritesListFull';

const FavoritesPage = () => {
    return (
        <PageContentLayout title="Favorites">
            <FavoritesListFull />
        </PageContentLayout>
    );
};

export default FavoritesPage;