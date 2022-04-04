import React, {
    Component
} from 'react';
import {graphql, Link, navigate} from 'gatsby'
import {gsap} from 'gsap'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {FiClock, FiTag, FiChevronRight, FiChevronLeft} from 'react-icons/fi';
import { IconContext } from "react-icons";
import About from '../components/about';
import "../styles/list.scss"


class BlogList extends Component{
    constructor(props) {
        super(props);
      }


    render() {
        const {data} = this.props;
        const posts = data.allGraphCmsPost.edges;
        const sitename = data.site.siteMetadata.title
        const {currentPage, numPages} = this.props.pageContext;
        const isFirst = currentPage === 1;
        const isLast = currentPage === numPages;
        const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
        const nextPage = (currentPage + 1).toString()
        dayjs.extend(relativeTime)
        return(
                <main className="list-wrapper">
                    {
                        isFirst && (
                    <h1 className="page-heading">Latest Posts</h1>
                        )
                    }
                    {
                        !isFirst && (
                    <h1 className="page-heading">Posts</h1>
                        )
                    }
                    <ul className="post-list">
                    {
                    posts.map(({node}) => {
                        const id = node.id
                        const title = node.title
                        const slug = node.slug
                        const description = node.description
                        const tag = node.tag
                        const date = node.createdAt

                        return(
                            <li className="posts" key={id}>
                                <span className="title-wrapper">
                                <Link className="post-title" to={`/${slug}`} key={`post-${slug}`} onClick={e => this.changePage(e, `/${slug}`)}>
                                    <h2>{title}</h2>
                                </Link>
                                <IconContext.Provider value={{ className: "small-icons" }}>
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
                    })
                }
                </ul>
                <About />
                <nav className="pagination">
                    {!isFirst && (
                        <Link to={prevPage} className="prevpage" rel='prev'>
                           <FiChevronLeft />  newer
                        </Link>
                    )}
                    {!isLast && (
                        <Link to={nextPage} className="nextpage" rel='next'>
                            older <FiChevronRight/>
                        </Link>
                    )}
                </nav>
                </main>
        )
    }
}


export default BlogList;


export const query = graphql`
    query($skip: Int!, $limit: Int!) {
        site{
            siteMetadata{
                title
            }
        }
        allGraphCmsPost(
            sort: {fields: date, order: DESC}
            limit: $limit
            skip: $skip
        ){
            edges{
                node{
                    id
                    title
                    slug
                    description
                    tag
                    createdAt
                }
            }
        }
    }`


