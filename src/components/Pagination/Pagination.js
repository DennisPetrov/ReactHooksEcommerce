import React from 'react';
import classes from './Pagination.module.css';
import { Link } from 'react-router-dom';
import { range, addQueryParams } from '../../helpers/utility';
import { paginationWindow } from '../../config/shopConfig';
import classnames from 'classnames';


const PaginationItem = ({ location, page, currentPage, children }) => {
    const link = location.pathname + "?" + addQueryParams(location.search, { page: page });
    const linkClasses = classnames({
        [classes.pageItem]: true,
        [classes.pageItem_active]: page === currentPage
    });
    return (<li className={linkClasses}>
        <Link to={link}>
            {children}
        </Link>
    </li>);
}
const Pagination = ({ limit, currentPage, total, location }) => {
    if (!total) {
        return null;
    }
    const pagesCount = Math.ceil(total / limit);


    let firstPage = currentPage - paginationWindow / 2;
    firstPage = firstPage < 1 ? 1 : firstPage;

    let lastPage = firstPage + paginationWindow;
    lastPage = lastPage > pagesCount ? pagesCount : lastPage;

    const pages = range(firstPage, lastPage);
    return (
        <React.Fragment>
            {pagesCount > 1 &&
                <ul className={classes.wrap}>
                    {currentPage > 1 &&
                        <PaginationItem page={1} currentPage={currentPage} location={location}>
                            <span className="material-icons">
                                first_page
                            </span>
                        </PaginationItem>}
                    {currentPage > 1 &&
                        <PaginationItem page={currentPage - 1} currentPage={currentPage} location={location} >
                            <span className="material-icons">
                                chevron_left
                            </span>
                        </PaginationItem>}
                    {pages.map((page) =>
                        <PaginationItem page={page} currentPage={currentPage} location={location} key={page}>
                            {page}
                        </PaginationItem>)}
                    {currentPage !== pagesCount &&
                        <PaginationItem page={currentPage + 1} currentPage={currentPage} location={location}>
                            <span className="material-icons">
                                chevron_right
                            </span>
                        </PaginationItem>}
                    {currentPage !== pagesCount &&
                        <PaginationItem page={pagesCount} currentPage={currentPage} location={location}>
                            <span className="material-icons">
                                last_page
                            </span>
                        </PaginationItem>}
                </ul>
            }
        </React.Fragment>
    );
};

export default Pagination;