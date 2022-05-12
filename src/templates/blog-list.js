import React, {
    Component,
} from 'react';
import {graphql, Link} from 'gatsby'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {FiClock, FiTag, FiChevronRight, FiChevronLeft} from 'react-icons/fi';
import { IconContext } from "react-icons";
import About from '../components/about';
import Form from '../components/form';
import "../styles/list.scss"


class BlogList extends Component{
    constructor(props) {
        super(props);
      }
    render() {
        const {data} = this.props;
        const posts = data.allGraphCmsPost.edges;
        const {currentPage, numPages} = this.props.pageContext;
        const isFirst = currentPage === 1;
        const isLast = currentPage === numPages;
        const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
        const nextPage = (currentPage + 1).toString()
        dayjs.extend(relativeTime)


              return  (<main className="list-wrapper">
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
                        
                        const {id, title, slug, description, tag, date} = node

                        return(
                            <li className="posts" key={id} ref={(el) => {this.postsRef = el}}>
                                <IconContext.Provider value={{ className: "small-icons", size: '1.5em' }}>

                                <span className="title-wrapper">
                                <Link className="post-title" to={`/${slug}`} key={`post-${slug}`}>
                                    <h2>{title}</h2>
                                </Link>
                                    <small>
                                         <FiTag/> <Link to={`/tags/${tag}`}> {tag} </Link> <span>.</span> <FiClock /> {
                                        dayjs(date).fromNow()
                                         }
                                    </small>
                                
                                </span>
                                    <p>{description}</p>
                                    <Link to={`/${slug}`} className="read-more">Read More <FiChevronRight/></Link>
                                </IconContext.Provider>
                            </li>
                        )
                    })
                }
                </ul>
                <nav className="pagination">
                    <IconContext.Provider value={{className: "pag-icons", size: "1.8em"}}>
                    {!isFirst && (
                        <Link to={prevPage} className="prevpage pag" rel='prev'>
                           <FiChevronLeft />  newer
                        </Link>
                    )}
                    {!isLast && (
                        <Link to={nextPage} className="nextpage pag" rel='next'>
                            older <FiChevronRight/>
                        </Link>
                    )}
                    </IconContext.Provider>
                </nav>
                <About />
                <Form />
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
                    date: createdAt
                }
            }
        }
    }`


