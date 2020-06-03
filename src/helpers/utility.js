import {stringify, parse} from 'query-string';

export const range = (start, end) => {
    return [...Array(end - start + 1).keys()].map(el => el + start)
};

export const addQueryParams = (search, newItems) => {
    let queryParams = parse(search);
    Object.keys(newItems).forEach((key) => {
        queryParams[key] = newItems[key]; 
    });
    return stringify(queryParams);
}