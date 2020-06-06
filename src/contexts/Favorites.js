import React, { createContext, useEffect, useReducer } from "react";
import useLocalStorage from "../hooks/useLocalStorage";


const reducer = (state, action) => {
    let newState = [
        ...state
    ];
    switch (action.type) {
        case "TOGGLE_FAVORITE": {
            let index = newState.indexOf(action.payload);
            if (index === -1) {
                newState.push(action.payload);
            } else {
                newState.splice(index, 1);
            }
            return newState;
        }
        case "ADD_TO_FAVORITES": {
            if (!newState.includes(action.payload)) {
                newState.push(action.payload);
                return newState;
            } else {
                return state;
            }
        }
        case "REMOVE_FROM_FAVORITES": {
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


const FavoritesContext = createContext();

export default FavoritesContext;


export const FavoritesContextProvider = ({ children }) => {
    const [storageValue, setStorageValue] = useLocalStorage("favorites", []);
    const [favoritesState, dispatchFavorites] = useReducer(reducer, [], () => {
        return [
            ...storageValue
        ]
    });

    useEffect(() => {
        setStorageValue(favoritesState);
    }, [favoritesState, setStorageValue])

    return (
        <FavoritesContext.Provider value={[favoritesState, dispatchFavorites]}>
            {children}
        </FavoritesContext.Provider>
    )
}