import React, {useState} from 'react';
import {useStaticQuery, graphql, Link} from 'gatsby'
import {FiSearch} from 'react-icons/fi'
import {IconContext} from "react-icons";
import dayjs from 'dayjs'
import '../styles/search.scss'


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
        <main className="search-wrapper">
        <form className="search-form">
            <div className="form-control">
                    <label htmlFor="search">
                        
                    </label>
                <input
                    type="text"
                    aria-label="Search"
                    id="search"
                    placeholder="whatcha looking for?"
                    onChange={handleSearch}
                    />
            </div>
         </form>
        {
            posts.map(({node}) => {
                const {title, slug, description, tag , date} = node
                return(
                    <section className="search-results">
                        <Link className="result-title" key={`post-${slug}`} to={`/${slug}`}>
                            <h2>{title}</h2>
                        </Link>
                        <p>{description}</p>
                        <span> <Link to={`/tags/${tag}`}>{tag}</Link> | {dayjs(date).fromNow()} </span>
                    </section>
                )
            })
        }
        </main>
    )
}

export default SearchPage;