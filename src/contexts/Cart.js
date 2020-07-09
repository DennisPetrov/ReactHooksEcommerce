import React, { createContext, useReducer, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const reducer = (state, action) => {
    let newState = {
        ...state
    };
    switch (action.type) {
        case "ADD_TO_CART":{
            const count = Number(action.payload.count);
            newState[action.payload.id] = state[action.payload.id] ? state[action.payload.id] + count : count;
            return newState;
        }
        case "SET_QUANTITY":{
            const count = Number(action.payload.count);
            if((!count || count < 1) && newState[action.payload.id]){
                delete newState[action.payload.id];
            }else{
                newState[action.payload.id] = count;
            }
            return newState;
        }
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