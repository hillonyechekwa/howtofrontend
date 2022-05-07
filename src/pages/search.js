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
    console.log('allposts', allPosts)


    const handleSearch = event => {
        const query = event.target.value
        console.log(event.target.value)

        const posts = data.allGraphCmsPost.edges || []
        console.log('posts in handler', posts)

        const filteredData = posts.filter(post => {
            const {description, title, tag} = post.node
            return(
                description.toLowerCase().includes(query.toLowerCase()) ||
                title.toLowerCase().includes(query.toLowerCase()) ||
                tag.toLowerCase().includes(query.toLowerCase())
            )
        })
        setSearch({
            query,
            filteredData
        })
    }

    const {filteredData, query} = search
    const hasSearchResults = filteredData && query !== emptyQuery
    const posts = hasSearchResults ? filteredData : []



    return(
        <>
        <form>
            <label htmlFor="search"></label>
        <input
            type="text"
            aria-label="Search"
            id="search"
            placeholder="whatcha looking for?"
            onChange={handleSearch}
            />
            </form>
        {
            posts.map(({node}) => {
                const {id, title, slug, description, tag , date} = node
                return(
                    <section>
                    <Link key={`post-${slug}`} to={`/${slug}`}>
                        <h2>{title}</h2>
                    </Link>
                    <p>{description}</p>
                    <span> <Link to={`/tags/${tag}`}>{tag}</Link> | {dayjs(date).fromNow()} </span>
                    </section>
                )
            })
        }
        </>
    )
}

export default SearchPage;