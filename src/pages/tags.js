import React from 'react';
import PropTypes from 'prop-types';

import KebabCase from 'lodash/kebabCase'

import {Helmet} from 'react-helmet'
import {Link, graphql} from 'gatsby'

const TagsPage = ({
    data: {
        allGraphCmsPost: {group},
        site: {
            siteMetadata: {title},
        }
    }
}) => {
    return(
        <main>
            <Helmet title={title} />
            <section>
                <h1>Tags</h1>
                <ul>
                    {
                        group.map(tag => (
                            <li key={tag.fieldValue}>
                                <Link to={`/tags/${KebabCase(tag.fieldValue)}/`}>
                                    {tag.fieldValue} ({tag.totalCount})
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </main>
    )
}


TagsPage.propTypes = {
    data: PropTypes.shape({
      allGraphCmsPost: PropTypes.shape({
        group: PropTypes.arrayOf(
          PropTypes.shape({
            fieldValue: PropTypes.string.isRequired,
            totalCount: PropTypes.number.isRequired,
          }).isRequired
        ),
      }),
      site: PropTypes.shape({
        siteMetadata: PropTypes.shape({
          title: PropTypes.string.isRequired,
        }),
      }),
    }),
  }


export default TagsPage

export const pageQuery = graphql`
    query{
        site{
            siteMetadata{
                title
            }
        }
        allGraphCmsPost(limit: 2000) {
            group(field: tag) {
            fieldValue
            totalCount
            }
        }
    }
`




