import React, {
    Component,
    createRef
} from 'react';
import {graphql, Link, navigate} from 'gatsby'
import {gsap} from 'gsap'
import Loader from '../components/loader'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {FiClock, FiTag, FiChevronRight, FiChevronLeft} from 'react-icons/fi';
import { IconContext } from "react-icons";
import About from '../components/about';
import "../styles/list.scss"


class BlogList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
        this.headingRef = createRef()
        this.postsRef = createRef()
      }
    
      componentDidMount() {
        // this.setState({isLoading: true})
        // gsap.from('.list-wrapper', {
        //     opacity: 0,
        //     duration: 1,
        //     ease: 'power3.out',
        //     delay: 1
        // })
        // window.addEventListener('load', (event) => {
            gsap.from([this.headingRef, this.postsRef],{
                duration: 0.8,
                dealy: 0.6,
                ease: "power3.easeOut",
                y: 100,
                stagger:{
                    amount: 0.15
                }
            })
        // })
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

        if(this.state.isLoading){
            return <Loader />
        }

        return (
                <main className="list-wrapper">
                    {
                        isFirst && (
                    <h1 className="page-heading" ref={el => this.headingRef = el}>Latest Posts</h1>
                        )
                    }
                    {
                        !isFirst && (
                    <h1 className="page-heading" ref={el => this.headingRef = el}>Posts</h1>
                        )
                    }
                    <ul className="post-list">
                    {
                    posts.map(({node}) => {
                        // const id = node.id
                        // const title = node.title
                        // const slug = node.slug
                        // const description = node.description
                        // const tag = node.tag
                        // const date = node.createdAt
                        const {id, title, slug, description, tag, date} = node

                        return(
                            <li className="posts" key={id} ref={el => this.postsRef = el}>
                                <span className="title-wrapper">
                                <Link className="post-title" to={`/${slug}`} key={`post-${slug}`}>
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
                    date: createdAt
                }
            }
        }
    }`


