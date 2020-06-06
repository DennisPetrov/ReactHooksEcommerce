import React, { useEffect, useReducer, useCallback, useState, useRef } from 'react';
import classnames from 'classnames';
import { parse } from 'query-string';

import Checkbox from '../../Inputs/Checkbox/Checkbox';
import Loading from '../../Loading/Loading';
import classes from './ProductFilter.module.css';
import { useLocation } from 'react-router-dom';



const ProductFilter = ({ filters, isLoading, error, updateFilter }) => {
    const [filterState, dispatch] = useReducer(filterInputsReducer, {});
    const [triggersState, dispatchTriggers] = useReducer(triggersReducer, {});
    const [filterOpenSm, setFilterOpenSm] = useState(false);
    const [applyButtonState, setApplyButtonState] = useState({ show: false, offset: 0 });
    const applyButtonTimerRef = useRef();
    const requestParams = useLocation();


    const resetFilter = () => {
        dispatch({
            type: "RESET_FILTER",
            payload: filters,
        });

        updateFilter(generateFilterRequest(filters, false));
        setApplyButtonState(oldState => ({
            ...oldState,
            show: false,
        }));
    };
    const applyFilter = () => {
        updateFilter(generateFilterRequest(filters, filterState));
        setApplyButtonState(oldState => ({
            ...oldState,
            show: false,
        }));
    };
    const switchTriggerState = useCallback((event) => {
        const id = event.target.dataset.id;

        dispatchTriggers({
            type: "SWITCH_TRIGGER",
            payload: id
        })
    }, []);

    const switchCheckboxState = useCallback((event) => {
        const value = event.target.value;
        const name = event.target.name;
        const offset = event.target.parentNode.offsetTop;
        setApplyButtonState({
            show: true,
            offset: offset
        });

        clearTimeout(applyButtonTimerRef.current);
        applyButtonTimerRef.current = setTimeout(() => {
            setApplyButtonState({
                show: false,
                offset: 0
            });
        }, 3000);


        dispatch({
            type: "UPDATE_CHECKBOX",
            payload: name + "-" + value
        });
    }, []);


    useEffect(() => {
        dispatchTriggers({
            type: "INIT_TRIGGERS",
            payload: {
                filters: filters,
                searchString: requestParams.search,
            }
        });
        dispatch({
            type: "INIT_INPUTS",
            payload: {
                filters: filters,
                searchString: requestParams.search,
            }
        });
    }, [filters, requestParams.search]);

    useEffect(() => {
        return () => {
            clearTimeout(applyButtonTimerRef.current);
        }
    }, []);

    return (
        <div className={classnames({
            [classes.root]: true,
            [classes.root_open]: filterOpenSm
        })}>
            <div onClick={() => setFilterOpenSm((isOpen) => !isOpen)}
                className={classes.title}>
                Filter
            </div>
            {!filters && isLoading && <Loading />}
            {!isLoading && error &&
                <p className={classes.error}>
                    {error}
                </p>
            }
            {Object.keys(filterState).length !== 0 &&
                <div className={classes.innerContent}>
                    <div className={classes.filterTriggersWrap}>
                        {Object.keys(filters).map(filterKey => {
                            return (
                                <div
                                    key={filterKey}
                                    className={classnames({
                                        [classes.filterItem]: true,
                                        [classes.filterItem_active]: triggersState[filterKey]
                                    })}>
                                    <div className={classes.filterItem__trigger}
                                        data-id={filterKey}
                                        onClick={switchTriggerState}>
                                        {filters[filterKey]["name"]}
                                    </div>
                                    <div className={classes.filterItem__content}>
                                        {filters[filterKey].type === "checkbox" &&
                                            filters[filterKey].values.map((value, key) => {
                                                return <div key={key} className={classes.inputWrap}>
                                                    <Checkbox
                                                        value={value}
                                                        checked={filterState[filterKey + "-" + value]}
                                                        name={filterKey}
                                                        label={value}
                                                        onChange={switchCheckboxState}
                                                    />
                                                </div>
                                            })}
                                    </div>
                                </div>
                            )
                        })}
                        <button style={{
                            top: applyButtonState.offset,
                            display: applyButtonState.show ? "block" : "none"
                        }}
                            onClick={applyFilter}
                            className={`btn ${classes.applyFlexible}`}>
                            Show
                        </button>
                    </div>
                    <div className={classes.buttons}>
                        <p>
                            <button
                                onClick={applyFilter}
                                className={`btn btn_fullWidth`}>Apply</button>
                        </p>
                        <p>
                            <button
                                onClick={resetFilter}
                                className={`btn btn_transparent btn_fullWidth`}>Reset</button>
                        </p>
                    </div>
                </div>
            }
        </div>
    );
};

export default ProductFilter;

function generateFilterRequest(filters, filterState) {
    let result = {};
    if (filterState) {
        for (const prop in filters) {
            if (filters.hasOwnProperty(prop)) {
                const element = filters[prop];
                switch (element.type) {
                    case "checkbox":
                    default:
                        let checkedVals = element.values.filter((value) => filterState[prop + "-" + value]);
                        if (checkedVals.length) {
                            result[prop] = checkedVals;
                        }
                }
            }
        }
    }
    return result;
}
function createFiltersState(filters, searchString = "") {
    let result = {};
    const searchParams = searchString ? parse(searchString) : {};
    for (const prop in filters) {
        if (filters.hasOwnProperty(prop)) {
            const element = filters[prop];
            switch (element.type) {
                case "checkbox":
                default:
                    element.values.forEach(value => {
                        let checked = false;
                        if (searchParams[prop]) {
                            if (Array.isArray(searchParams[prop])) {
                                checked = searchParams[prop].includes(value);
                            } else {
                                checked = searchParams[prop] === value;
                            }
                        }
                        result[prop + "-" + value] = checked;
                    });
            }
        }
    }
    return result;
}

function filterInputsReducer(state, action){
    switch (action.type) {
        case "INIT_INPUTS":
            if(Object.keys(state).length !== 0){
                return state;
            }
            return createFiltersState(action.payload.filters, action.payload.searchString);
        case "UPDATE_CHECKBOX":
            return {
                ...state,
                [action.payload]: !state[action.payload]
            }
        case "RESET_FILTER":
            return createFiltersState(action.payload);
        default:
            return state;
    }
}
function triggersReducer(state, action) {
    switch (action.type) {
        case "INIT_TRIGGERS":
            if(Object.keys(state).length !== 0){
                return state;
            }
            const initialState = {};
            const searchParams = parse(action.payload.searchString);
            for (const key in action.payload.filters) {
                let open = false;
                if (searchParams[key]) {
                    open = true;
                }
                initialState[key] = open;
            }
            return initialState;
        case "SWITCH_TRIGGER":
            return {
                ...state,
                [action.payload]: !state[action.payload],
            }
        default:
            return state;
    }
}