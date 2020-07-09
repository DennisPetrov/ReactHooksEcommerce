import React from 'react';
import classnames from 'classnames'
import classes from './Tabs.module.css';

const Tabs = ({ tabsData, activeTab, setActiveTab }) => {

    return (
        <div className={classes.wrap}>
            {Object.keys(tabsData).length !== 0 &&
                <React.Fragment>
                    <div className={classes.buttonsWrap}>
                        {Object.keys(tabsData["items"]).map(tabKey => (
                            <button
                                key={tabKey}
                                onClick={() => setActiveTab(tabKey)}
                                className={classnames(classes.button, (tabKey === activeTab ? classes.buttonActive : ""))}>
                                {tabsData["items"][tabKey]["name"]}
                            </button>
                        ))}
                    </div>
                    <div className={classes.contentWrap}>
                        {Object.keys(tabsData["items"]).map(tabKey => (
                            <div
                            key={tabKey} 
                            className={classnames(classes.content, (tabKey === activeTab ? classes.contentActive : ""))}>
                                {tabsData["items"][tabKey]["content"]}
                            </div>
                        ))}
                    </div>
                </React.Fragment>
            }
        </div>
    );
};

export default Tabs;