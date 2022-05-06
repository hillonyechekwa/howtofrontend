import React, {useState} from 'react';
import {useStaticQuery, graphql, Link} from 'gatsby'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {FiClock, FiTag, FiChevronRight, FiChevronLeft} from 'react-icons/fi';
import { IconContext } from "react-icons";

const SearchPage = () => {
    const emptyQuery = ""
    const [search, setSearch ] = useState({
        filteredData: [],
        query: emptyQuery
    })

    const data = useStaticQuery(graphql`
        query SearchQuery {
        allGraphCmsPost {
            edges {
            node {
                id
                title
                slug
                description
                tag
                date: createdAt
                }
            }
         }
        }
    `)

    const allPosts = data.allGraphCmsPost.edges

    const handleSearch = event => {
        event.preventDefault()
        //handler function for search logic.
        //get input value
        const query = event.traget.value
        //get all of our posts
        const posts = data.allGraphCmsPost.edges || []

        //return all filtered posts
        const filteredData = posts.filter(post => {
            //destructure data from post node
            const {title, description, tag} = post.node
            //standardize data with .lowerCase()
            //return true if description, title or tags
            //contain the query string
            description.toLowerCase().includes(query.toLowerCase()) ||
            title.toLowerCase().includes(query.toLowerCase()) ||
            tag.toLowerCase().includes(query.toLowerCase()) //tag is done like this because
            //i set my tag to be just one tag per post,
            //instead of an array of tags per post.
        })
        //update State according to latest query results
        setSearch({
            query, //with current query string from the input event
            filteredData //with filtered data from posts.filter(post => //filterdData)
        })
    }

    const {filteredData, query} = search
    const hasSearchResults = filteredData && query !== emptyQuery
    const posts = hasSearchResults ? filteredData : []

    return(
        <main className="search-wrapper" >
        <form action="" className="search-form" onSubmit={handleSearch}>
            <header>
                Search
            </header>on/>
            <input type="submit" value="Search"></input> //replace value with search feather icon
        </form>
        <section className="search-results"> 
        {posts.map(({node}) => {
            const {title, id, slug, description, tag, date} = node
            //add return value here
            return(
                <li className="" key={id}>
                    <span className="">
                    <Link className="" to={`/${slug}`} key={`post-${slug}`}>
                        <h2>{title}</h2>
                    </Link>
                    <IconContext.Provider value={{ className: "" }}>
                        <small>
                                <FiTag/> <Link to={`/tags/${tag}`}> {tag} </Link> <span>.</span> <FiClock /> {
                            dayjs(date).fromNow()
                                }
                        </small>
                    </IconContext.Provider>
                    </span>
                        <p>{description}</p>
                        <Link to={`/${slug}`} className="read-more">Read More <FiChevronRight/></Link>
                                
                </li>
            )
        })}
        </section>
        </main>
    )
}


export default SearchPage;