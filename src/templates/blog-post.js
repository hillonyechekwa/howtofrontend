import React, {
    Component
} from 'react';
import Seo from '../components/seo'
import {graphql, Link, navigate} from 'gatsby';
import {Timeline, Power1} from 'gsap/all'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {FiClock, FiTag, FiChevronLeft, FiArrowRight, FiArrowLeft} from 'react-icons/fi';
import {IconContext} from "react-icons";
import { Disqus } from 'gatsby-plugin-disqus'
import '../styles/post.scss'


class BlogPostTemplate extends Component{
    render() {
        const {data} = this.props;
        const post = data.graphCmsPost;
        const siteUrl = data.site.siteMetadata.siteUrl;
        const {previous, next} = this.props.pageContext;
        const {id, title, createdAt, tag, content, description} = post                
        const disqusConfig = {
            url: `${siteUrl+this.props.location.pathname}`,
            identifier: id,
            title: title,
        }
        dayjs.extend(relativeTime)

        return(
            <main className="post-wrapper">
                <header className="post-header">
                <IconContext.Provider value={{ className: "post-icons"}}>
                    <Link to="/" className="backlink" onClick={() => navigate(-1)}> <FiChevronLeft /> back to blog </Link>
                    <h1>{title}</h1>
                    <small className="date"><FiClock /> {dayjs(createdAt).fromNow()}</small>
                    <small className="tag"><FiTag /> <Link to={`/tags/${tag}`}> {tag}</Link> </small>
                </IconContext.Provider>
                </header>
                <article
                dangerouslySetInnerHTML={{__html: content.html}}
                itemProp="article-body"
                className="post-body"
                ></article>
                <section className="post-end">
                <ul className="other-posts">
                    <li className="previous">
                        {
                            previous && (
                                <Link to={`/${previous.slug}`} rel="prev">
                                    <p>Previous Post</p>
                                    <span> <FiArrowLeft /> {previous.title} </span>
                                </Link>
                            )
                        }
                    </li>
                    <li className="next">
                        {
                            next && (
                                <Link to={`/${next.slug}`} rel="next">
                                    <p>Next Post</p>
                                    <span> {next.title}<FiArrowRight /></span>
                                </Link>
                            )
                        }
                    </li>
                </ul>
                <section className="comments">
                    <Disqus config={disqusConfig} />
                </section>
                </section>
            </main>
        )
    }
}


export default BlogPostTemplate;

export const pageQuery = graphql`
    query postQuery($slug: String!) {
        site{
            siteMetadata{
                title
                siteUrl
            }
        }
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

    