import React from 'react';
import PageContentLayout from '../../components/PageContentLayout/PageContentLayout';
import CompareListFull from '../../components/Compare/CompareListFull/CompareListFull';

const ComparePage = () => {
    return (
        <PageContentLayout title="Compare">
                <CompareListFull />
        </PageContentLayout>
    );
};

export default ComparePage;