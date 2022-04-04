import React, {useState} from 'react';
import Footer from './footer';
import Nav from './nav'
import Loader from './loader';
import '../styles/layout.scss'


const Layout = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    if(isLoading){
        return (<div className="contiainer">
            <Loader />
        </div>)
    }
    return(
        <div className="container">
            <div className="wrapper">
                <Nav />
                    <main className="content">
                        {children}
                    </main>
                </div>
            <Footer />
        </div>
    )
}

export default Layout