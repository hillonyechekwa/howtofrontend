import React from 'react';
import PropTypes from 'prop-types' 

import {Link, graphql} from 'gatsby';

import '../styles/tag.scss'

const Tags = ({pageContext, data}) => {
    const { tag }= pageContext
    const {edges, totalCount} = data.allGraphCmsPost
    const tagHeader = `${totalCount} post${
        totalCount === 1 ? "" : "s"
      } tagged with "${tag}"`

      return(
          <main className="tag-wrapper">
              <h1 className="tag-heading">{tagHeader}</h1>
              <ul className="tag-info">
                  {
                      edges.map(({node}) => {
                          const {slug, title} = node
                          return(
                              <li key={slug} >
                                  <Link to={slug}>{title}</Link>
                              </li>
                          )
                      })
                  }
              </ul>
              <Link className="all-tags" to="/tags">All Tags</Link>
          </main>
      )
}

Tags.propTypes = {
    pageContext: PropTypes.shape({
      tag: PropTypes.string.isRequired,
    }),
    data: PropTypes.shape({
      allGraphCmsPost: PropTypes.shape({
        totalCount: PropTypes.number.isRequired,
        edges: PropTypes.arrayOf(
          PropTypes.shape({
            node: PropTypes.shape({
                title: PropTypes.string.isRequired,
                slug: PropTypes.string.isRequired,
            }),
          }).isRequired
        ),
      }),
    }),
  }

export default Tags


export const pageQuery = graphql`
query MyQuery($tag: String) {
    allGraphCmsPost(
        limit: 2000
        sort: {fields: date, order: DESC}
        filter: {tag: {in: [$tag]}}
    ) {
        totalCount
        edges {
        node {
            title
            slug
        }
        }
    }
}
`


