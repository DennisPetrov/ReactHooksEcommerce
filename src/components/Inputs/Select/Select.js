import React from 'react';
import classes from '../Inputs.module.css';

const Select = (props) => {
    const inputClasses=[classes.input];
    const wrapClass = props.wrapClass ? props.wrapClass : classes.wrap;
    const displayErrorText = props.displayErrorText ? props.displayErrorText : false;
    if(props.error) inputClasses.push(classes.error);
    return (
        <div className={wrapClass}>
            {props.labelText && (<label className={classes.label}
                htmlFor={props.id ? props.id : ""}>
                {props.labelText}
            </label>)}
            <select className={inputClasses.join(" ")}
                value={props.value}
                name={props.name}
                id={props.id}
                onChange={props.onChange}
            >
                {props.options.map((item, key) => {
                    if(typeof item === "object"){
                        return <option value={item.value} key={key}>{item.title ? item.title : item.value}</option>; 
                    }else{
                        return <option value={item} key={key}>{item}</option>; 
                    }
                }
                )}
            </select>
            {displayErrorText && props.error ?
                <div className={classes.errorText}>
                    {props.error}
                </div> : ""}
        </div>
    );
};

export default Select;