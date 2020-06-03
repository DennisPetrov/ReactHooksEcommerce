import React from 'react';
import classes from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div className="container-fluid container-max-width">
                <div className="row">
                    <div className="col">
                        React hooks E-commerce application. Developed for educational purposes only.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;