import React, {
    Component
} from 'react';
import Layout from '../components/layout'
import Seo from '../components/seo'
import {graphql} from 'gatsby';


class BlogPostTemplate extends Component{
    render() {
        const {data} = this.props;
        const post = data.graphCmsPost;
        const {previous, next} = this.props.pageContext;
        const {title, createdAt, tag, content, description} = post                

        return(
            <main>
                <header>
                    <h1>{title}</h1>
                    <small>{createdAt}</small>
                    <small>{tag}</small>
                </header>
                <article
                dangerouslySetInnerHTML={{__html: content.html}}
                itemProp="article-body"
                className="post-body"
                ></article>
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

    