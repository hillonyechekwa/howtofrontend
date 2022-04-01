import React, {
    Component
} from 'react';
import Seo from '../components/seo'
import {graphql, Link} from 'gatsby';
import {Timeline, Power1} from 'gsap/all'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {FiClock, FiTag, FiChevronLeft, FiArrowRight, FiArrowLeft} from 'react-icons/fi';
import {IconContext} from "react-icons";
import { Disqus, commentCount} from 'gatsby-plugin-disqus'
import '../styles/post.scss'


class BlogPostTemplate extends Component{
    render() {
        const {data} = this.props;
        const post = data.graphCmsPost;
        const {previous, next} = this.props.pageContext;
        const {title, createdAt, tag, content, description} = post                
        dayjs.extend(relativeTime)

        return(
            <main className="post-wrapper">
                <header className="post-header">
                <IconContext.Provider value={{ className: "post-icons"}}>
                    <Link to="/" className="backlink"> <FiChevronLeft /> go back </Link>
                    <h1>{title}</h1>
                    <small className="date"><FiClock /> {dayjs(createdAt).fromNow()}</small>
                    <small className="tag"><FiTag /> {tag}</small>
                </IconContext.Provider>
                </header>
                <article
                dangerouslySetInnerHTML={{__html: content.html}}
                itemProp="article-body"
                className="post-body"
                ></article>
                <ul className="other-posts">
                    <li className="previous">
                        previous
                        {
                            previous && (
                                <Link to={previous.slug} rel="prev">
                                    <FiArrowLeft /> {previous.title}
                                </Link>
                            )
                        }
                    </li>
                    <li className="next">
                        next
                        {
                            next && (
                                <Link to={next.slug} rel="next">
                                    <FiArrowRight /> {next.title}
                                </Link>
                            )
                        }
                    </li>
                </ul>
            </main>
        )
    }
}


export default BlogPostTemplate;

export const pageQuery = graphql`
    query postQuery($slug: String!) {
        graphCmsPost(slug: {eq: $slug}) {
        id
        title
        description
        content{
            html
        }
        tag
        createdAt
        }
    }`

    