import React from 'react';
import classes from './Checkbox.module.css';


const Checkbox = (props) => {
    return (
        <div className={classes.wrap}>
            <label className={classes.label}>
                <input type="checkbox"
                    className={classes.input}
                    checked={props.checked}
                    {...props.dataAttributes}
                    value={props.value}
                    name={props.name}
                    onChange={props.onChange} />
                <span className={classes.styledCheckbox}>
                    {props.label}
                </span>
            </label>
        </div>
    );
};

export default Checkbox;