const path = require('path')
const _ = require('lodash')
// const createFilePath = require('gatsby-source-filesystem')

exports.createPages = async ({graphql, actions}) => {
    const {createPage} = actions
    const blogPost = path.resolve(`./src/templates/blog-post.js`)
    const tagTemplate = path.resolve('./src/templates/tags.js')
    return await graphql(`
    {
        cmsPosts: allGraphCmsPost(
            sort: {fields: date, order: DESC}
            limit: 2000
            ) {
          edges {
            node {
              title
              slug
              tag
            }
          }
        }
        cmsTags: allGraphCmsPost(
            limit: 2000
            ){
            group(field: tag) {
                fieldValue
                }
            }
      }
    `).then(result => {
        if(result.errors){
            throw result.errors
        }

        const posts = result.data.cmsPosts.edges

        posts.forEach((post,index) => {
            const next = index === 0 ? null : posts[index - 1].node
            const previous = index === posts.length - 1 ? null : posts[index + 1].node

            createPage({
                path: post.node.slug,
                component: blogPost,
                context: {
                    slug: post.node.slug,
                    previous,
                    next
                }
            })
        })

        const postsPerPage = 5
        const numPages = Math.ceil(posts.length/postsPerPage);

        Array.from({length: numPages}).forEach((_, index) => {
            createPage({
                path: index === 0 ? `/`:`/${index + 1}`,
                component: path.resolve('./src/templates/blog-list.js'),
                context: {
                    limit: postsPerPage,
                    skip: index * postsPerPage,
                    numPages,
                    currentPage: index + 1
                }
            })
    })

        const tags = result.data.cmsTags.group

        tags.forEach(tag => {
            createPage({
                path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
                component: tagTemplate,
                context: {
                    tag: tag.fieldValue
                }
            })
        })
})

}