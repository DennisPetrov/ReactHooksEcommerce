import React, { useState, useEffect, useRef } from 'react';
import classes from './QuantityControls.module.css';


const QuantityControls = ({ defaultCount, changeCallback, stock, changeCallbackData }) => {
    const [count, setCount] = useState(defaultCount);
    const firstRender = useRef(false);
    const decreaseCount = () => {
        setCount(prevCount => prevCount - 1);
    };
    const increaseCount = () => {
        setCount(prevCount => prevCount + 1);
    };
    const changeCount = (event) => {
        const value = event.target.value;
        if(/^\d+$/.test(value)){
            if(Number(value) > stock){
                setCount(Number(stock));
            }else{
                setCount(Number(value));
            }
        }
    } 

    useEffect(() => {
        if(firstRender.current && changeCallback){
            changeCallback(count, changeCallbackData);
        }else{
            firstRender.current = true;
        }
    }, [count, changeCallbackData, changeCallback]);

    return (
        <div className={classes.wrap}>
            <button
                onClick={decreaseCount}
                className={classes.buttonDecrease}>-</button>
            <input type="text"
            value={count}
            onChange={changeCount} 
            className={classes.input} />
            <button
                onClick={increaseCount}
                disabled={count === Number(stock) ? true : false}
                className={classes.buttonIncrease}>+</button>
            <span className={classes.infoLabel}>
                {count === Number(stock) ? "max" : ""}
            </span>
        </div>
    );
};

export default QuantityControls;