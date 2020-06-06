import React, { createContext, useReducer, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const reducer = (state, action) => {
    let newState = {
        ...state
    };
    switch (action.type) {
        case "ADD_TO_CART":
            newState[action.payload] = state[action.payload] ? state[action.payload] + 1 : 1;
            return newState;
        case "REDUCE_AMOUNT":
            if(newState[action.payload]){
                if(newState[action.payload] === 1){
                    delete newState[action.payload];
                }else{
                    newState[action.payload]--;
                }
            }
            return newState;
        case "REMOVE_FROM_CART":
            if(newState[action.payload]){
                delete newState[action.payload];
            }
            return newState;
        case "INIT_CART":
            return {
                ...action.payload
            }
        default:
            return state;
    }
}
const CartContext = createContext();
export default CartContext;


export const CartContextProvider = ({ children }) => {
    const [storageValue, setStorageValue] = useLocalStorage("cart", {});
    const [cartState, dispatchCart] = useReducer(reducer, {}, () => {
        return {
            ...storageValue
        }
    });

    useEffect(() => {
        setStorageValue(cartState);
    }, [cartState, setStorageValue])
    return (
        <CartContext.Provider value={[cartState, dispatchCart]}>
            {children}
        </CartContext.Provider>
    )
}