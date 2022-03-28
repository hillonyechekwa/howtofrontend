import React from 'react';
import {Link, useStaticQuery, graphql} from 'gatsby'
import '../styles/nav.css';

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
            <div className="logo">
                <h1>{title}</h1>
            </div>
            <Link to="/about">about</Link>
            <Link to="/search">search</Link>
        </nav>
    )
}

export default Nav

