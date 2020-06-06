import React, { createContext, useEffect, useReducer } from "react";
import useLocalStorage from "../hooks/useLocalStorage";


const reducer = (state, action) => {
    console.log(action);
    let newState = [
        ...state
    ];
    switch (action.type) {
        case "TOGGLE_COMPARE": {
            let index = newState.indexOf(action.payload);
            if (index === -1) {
                newState.push(action.payload);
            } else {
                newState.splice(index, 1);
            }
            return newState;
        }
        case "ADD_TO_COMPARE": {
            if (!newState.includes(action.payload)) {
                newState.push(action.payload);
                return newState;
            } else {
                return state;
            }
        }
        case "REMOVE_FROM_COMPARE": {
            let index = newState.indexOf(action.payload);
            if (index !== -1) {
                newState.splice(index, 1);
                return newState;
            } else {
                return state;
            }
        }
        default:
            return state;
    }
}


const CompareContext = createContext();

export default CompareContext;


export const CompareContextProvider = ({ children }) => {
    const [storageValue, setStorageValue] = useLocalStorage("compare", []);
    const [compareState, dispatchCompare] = useReducer(reducer, [], () => {
        return [
            ...storageValue
        ]
    });

    useEffect(() => {
        setStorageValue(compareState);
    }, [compareState, setStorageValue])

    return (
        <CompareContext.Provider value={[compareState, dispatchCompare]}>
            {children}
        </CompareContext.Provider>
    )
}