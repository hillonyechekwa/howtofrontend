import React from 'react';
import {Link, useStaticQuery, graphql} from 'gatsby'
import {FiSearch} from 'react-icons/fi'
import {IconContext} from 'react-icons'
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
             <Link to="/search" className="search-link" activeClassName='active'>
                 <IconContext.Provider value={{className: "home-search-icon", size: '1.8em'}}>
                     <FiSearch />
                 </IconContext.Provider>
             </Link>
           
        </nav>
    )
}

export default Nav

