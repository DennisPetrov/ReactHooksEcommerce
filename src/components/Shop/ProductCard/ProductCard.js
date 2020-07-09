import React, { useState } from 'react';
import classnames from 'classnames';
import classes from './ProductCard.module.css';
import ProductButtons from '../ProductButtons/ProductButtons';
import Tabs from '../../Tabs/Tabs';


const Specifications = ({ product, displayPropKeys }) => {
    return (
        <div className={classes.specsWrap}>
            {displayPropKeys.map(propKey => {
                if (product[propKey]) {
                    return (
                        <div className={classes.specsItem} key={propKey}>
                            <div className={classes.specsName}>
                                {propKey}:
                    </div>
                            <div className={classes.dots}></div>
                            <div className={classes.specsValue}>
                                {product[propKey]}
                            </div>
                        </div>
                    );
                } else {
                    return null;
                }
            })}
        </div>
    )
}
const ProductReviews = () => {
    return (<div>Reviews</div>)
}
const ProductDescription = ({ description }) => {
    return (
        <div className={classes.description}>
            {description}
        </div>
    );
}
function createTabsData(product, displayPropKeys){
    const tabsData = {
        defaultActive: "",
        items: {}
    };
    if (product.description) {
        tabsData.items["description"] = {
            name: "Description",
            content: (
                <ProductDescription description={product["description"]} />
            )
        }
        tabsData["defaultActive"] = "description";
    } else {
        tabsData["defaultActive"] = "specs";
    }
    tabsData.items["specs"] = {
        name: "Specifications",
        content: (
            <Specifications product={product} displayPropKeys={displayPropKeys} />
        )
    };
    tabsData.items["reviews"] = {
        name: "Reviews",
        content: (
            <ProductReviews />
        )
    };
    return tabsData;
}
const ProductCard = ({ product }) => {
    const displayPropKeys = ["color", "display", "hdd", "ram"];
    const tabsData = createTabsData(product, displayPropKeys);
    const [activeTab, setActiveTab] = useState(tabsData["defaultActive"]);

    return (
        <div>
            <div className={classnames("row", classes.topSection)}>
                <div className={classnames("col-sm-6", classes.topSectionLeft)}>
                    {product.image &&
                        <div className={classes.mainImageWrap}>
                            <img src={`/images/products/${product.image}`} alt={product.name} className={classes.mainImage} />
                        </div>
                    }
                </div>
                <div className={classnames("col-sm-6", classes.topSectionRight)}>
                    <h1 className={classes.mainTitle}>
                        {product["name"]}
                    </h1>
                    <div className={classes.controlsWrap}>
                        {product["price"] &&
                            <div className={classes.mainPrice}>
                                {product["price"]} $
                        </div>
                        }
                        <ProductButtons
                            productID={product["id"]}
                            wrapClass={classes.buttonsWrap}
                        />
                    </div>
                    {product["stock"] &&
                        <div className={classes.stock}>
                            Now in stock: {product["stock"]}
                        </div>
                    }
                    <div className={classes.specsMain}>
                        <div className={classes.specsMainHead}>
                            Main specifications
                            <button href="#" className={classnames(classes.specsMainLink, "buttonReset")} onClick={() => setActiveTab("specs")}>
                                Show all
                            </button>
                        </div>
                        <Specifications
                            product={product}
                            displayPropKeys={displayPropKeys}
                        />
                    </div>
                </div>
            </div>
            <div className={classes.bottomSection}>
                <Tabs
                    tabsData={tabsData}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </div>
        </div>
    );
};

export default ProductCard;