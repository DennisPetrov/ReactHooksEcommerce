import React from 'react';
import classes from './ProductListControls.module.css';
import classnames from 'classnames';
import {productListLimits, orderTypes} from '../../../config/shopConfig'
import Select from '../../Inputs/Select/Select';

const ProductListControls = ({ setViewType, viewType, setShowBy, showBy, orderBy, setOrderBy }) => {
    return (
        <div className={classes.wrap}>
            <div className="row">
                <div className={`col-sm-3 ${classes.viewType}`}>
                    <button
                        onClick={() => setViewType('tile')}
                        className={
                            classnames(
                                'buttonReset',
                                classes.viewType__item,
                                { [classes.viewType__item_active]: (viewType === 'tile') })
                        }>
                        <span className="material-icons">
                            view_module
                    </span>
                    </button>
                    <button
                        onClick={() => setViewType('line')}
                        className={
                            classnames(
                                'buttonReset',
                                classes.viewType__item,
                                { [classes.viewType__item_active]: (viewType === 'line') })
                        }>
                        <span className="material-icons">
                            view_stream
                    </span>
                    </button>
                </div>
                <div className={`col-sm-4`}>
                    <Select
                        labelText="Show by:" 
                        value={showBy}
                        wrapClass={classes.selectWrap}
                        onChange={(event) => {
                            setShowBy(event.target.value);
                        }}
                        options={productListLimits.values} 
                    />
                </div>
                <div className={`col-sm-5`}>
                    <Select
                        labelText="Sort:" 
                        value={orderBy}
                        wrapClass={classes.selectWrap}
                        onChange={setOrderBy}
                        options={orderTypes.values} 
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductListControls;