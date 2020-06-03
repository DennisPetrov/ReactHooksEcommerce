import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import './styles.css'

const Layout = ({ children }) => {
    return (
        <div className="page_layout">
            <Header></Header>
            <div className="page_layout__content">
                {children}
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Layout;