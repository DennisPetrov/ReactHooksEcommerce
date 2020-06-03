import React, {useState} from 'react';
import classes from './HeaderNavigation.module.css'
import pages from '../../../config/pages';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';

const HeaderNavigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapClass = classnames({
        [classes.menu_open]: isOpen,
    });
    return (
        <div className={wrapClass}>
            <button 
            onClick={() => setIsOpen((isOpen) => !isOpen)}
            className={classnames(classes.trigger, 'buttonReset')}>
                <span className="material-icons">
                    menu
                </span>
            </button>
            <ul className={classes.list}>
                {Object.keys(pages).map(key => pages[key]).filter(page => page.displayInMenu === true).map((page) => {
                    return <li className={classes.list__item} key={page.url}>
                        <NavLink to={page.url} exact className={classes.link} activeClassName={classes.linkActive}>{page.name}</NavLink>
                    </li>
                })}
            </ul>
        </div>
    );
};

export default HeaderNavigation;