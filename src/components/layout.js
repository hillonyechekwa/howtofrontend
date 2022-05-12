import React, {useState, useEffect} from 'react';
import Footer from './footer';
import Nav from './nav'
import '../styles/layout.scss'


const Layout = ({children}) => {


    return(<div className="container">
            <div className="wrapper">
                <Nav />
                    <main className="content">
                        {children}
                    </main>
                </div>
            <Footer />
        </div>) 
}

export default Layout