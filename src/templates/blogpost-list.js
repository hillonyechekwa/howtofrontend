import React, {
    Component
} from 'react';
import {graphql, Link} from 'gatsby'
import {Timeline, Power1} from 'gsap/all'
import Layout from '../components/layout';
import {FiSearch} from 'react-icons/fi';
import About from '../components/about';


class BlogpostList extends Component{
    // constructor(props) {
    //     super(props);
    //     this.timeline = new Timeline({ paused: true });
    //   }

    render() {
        const {data} = this.props;
        const posts = data.allGraphCmsPost.edges;
        const sitename = data.site.siteMetadata.title
        const {currentPage, numPages} = this.props.pageContext;
        const isFirst = currentPage === 1;
        const isLast = currentPage === numPages;
        const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
        const nextPage = (currentPage + 1).toString()
        console.log(data)
        return(
                <main>
                    <h1>Latest Posts</h1>
                    {
                    posts.map(({node}) => {
                        const title = node.title
                        const slug = node.slug
                        const description = node.description
                        const tag = node.tag
                        return(
                            <Link to={slug} key={slug} className="posts">
                                <h2>{title}</h2>
                                <p>{description}</p>
                                <small>{tag}</small>
                            </Link>
                        )
                    })
                }
                </main>
        )
    }
}


export default BlogpostList;


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


