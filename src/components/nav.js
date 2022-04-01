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
             <Link to="/about" className="nav-item">about</Link>
             <Link to="/subscribe" className="nav-item">subscribe</Link>
             <Link to="/search" className="nav-item">search</Link>
            </nav>
        </nav>
    )
}

export default Nav

