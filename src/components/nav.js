import React from 'react';
import {Link, useStaticQuery, graphql} from 'gatsby'
import '../styles/nav.scss';

const Nav = () => {
    const data = useStaticQuery(graphql`
    query{
        site{
            siteMetadata{
                title
            }
        }
    }
    `)

    const {title } = data.site.siteMetadata
    return(
        <nav className="nav">
            <h1 className="logo"><Link to="/">{title} </Link> </h1>
            <nav className="nav-items">
             <Link active to="/about" className="nav-item" activeClassName='active'>about</Link>
             <Link to="/subscribe" className="nav-item" activeClassName='active'>subscribe</Link>
             <Link to="/search" className="nav-item" activeClassName='active'>search</Link>
            </nav>
            <div className="line"></div>
        </nav>
    )
}

export default Nav

