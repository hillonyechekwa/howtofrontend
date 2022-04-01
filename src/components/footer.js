import React from 'react';
import {Link} from 'gatsby'
import "../styles/footer.scss"

const Footer = () => {
    return(
        <footer>
            <nav className="footer-nav">
                    <Link to="/">Home</Link>
                    <Link to="/subscribe">Subscribe</Link>
                    <Link to="/search">search</Link>
            </nav>
        </footer>
    )
}

export default Footer