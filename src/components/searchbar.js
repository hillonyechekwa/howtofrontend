import React from 'react';
// import {FiSearch} from 'react-icons/fi';

const Search = (props) => {
    return(
        <form action="" className="search-form">
            <header>
                Search
            </header>
            <input type="text" placeholder="Whacha looking for?" aria-label="Search" onKeyDown={props.searchPosts} />
        </form>
    )
}

export default Search