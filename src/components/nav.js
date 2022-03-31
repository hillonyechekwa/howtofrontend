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
            <h1 className="logo">{title}</h1>
            <nav className="nav-items">
             <Link to="/about" className="nav-item">about</Link>
             <Link to="/search" className="nav-item">search</Link>
            </nav>
            <div id="line"></div>
        </nav>
    )
}

export default Nav

