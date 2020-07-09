import React, { useEffect } from 'react';
import { stringify } from 'query-string';


import useFetch from '../../hooks/useFetch';
import Loading from '../../components/Loading/Loading';
import NoResults from '../../components/NoResults/NoResults';
import PageContentLayout from '../../components/PageContentLayout/PageContentLayout';

const StaticPage = ({ match }) => {
    const stringifiedParams = stringify({
        slug: match.path.replace(/\//gi, "")
    }, {
        arrayFormat: 'bracket'
    });
    const apiUrl = `/resources/?${stringifiedParams}`;
    const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);
    useEffect(() => {
        doFetch();
    }, [doFetch, apiUrl]);
    const pageLoadSuccessfull = Boolean(!isLoading && !error && response && response.data && response.data.length !== 0);
    const pageData = pageLoadSuccessfull ? response.data[0] : null;
    return (
        <PageContentLayout title={(pageData && pageData.title) ? pageData.title : null}>
            <React.Fragment>
                {isLoading && <Loading />}
                {Boolean(!isLoading && error && error.response) &&
                    <NoResults error={error} />
                }
                {pageLoadSuccessfull &&
                    <div dangerouslySetInnerHTML={{ __html: pageData.content }}></div>
                }
            </React.Fragment>
        </PageContentLayout>
    );
};

export default StaticPage;