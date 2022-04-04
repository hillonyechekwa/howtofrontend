import React from 'react';
import {useStaticQuery, graphql, Link} from 'gatsby'
import '../styles/about.scss'


const About = () =>{
    const data = useStaticQuery(graphql`
        query{
            site{
                siteMetadata{
                    title
                    description
                }
            }
            allGraphCmsAuthor {
                edges {
                    node {
                        id
                        name
                        bio{
                            html
                        }
                    }
                }
            }
        }
    `)

    const { title, description } = data.site.siteMetadata
    const authorData = data.allGraphCmsAuthor.edges
    
    return(
        <section className="about-wrapper">
           <section className="about-blog">
               <h2>About the blog</h2>
               <p>{description}</p> 
           </section>
           <section className="about-author">
               <h2>About the author</h2>
               <article className="author-info">
                     {authorData.map(({node}) =>{
                            return(
                                <div key={node.id}>
                                    <p className="author-intro">HI my name is {node.name}! ✨</p>
                                    <p className="author-bio" dangerouslySetInnerHTML={{__html: node.bio.html}}></p>
                                </div>
                            )
                     }
                        )}
                        </article>
           </section>
        </section>
    )
}


export default About

