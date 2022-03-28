const path = require('path')
// const createFilePath = require('gatsby-source-filesystem')

exports.createPages = async ({graphql, actions}) => {
    const {createPage} = actions
    const blogPost = path.resolve(`./src/templates/blog-post.js`)

    return await graphql(`
    {
        allGraphCmsPost(
            sort: {fields: date, order: DESC}
            limit: 1000
            ) {
          edges {
            node {
              title
              slug
            }
          }
        }
      }
    `).then(result => {
        if(result.errors){
            throw result.errors
        }

        const posts = result.data.allGraphCmsPost.edges

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
                component: path.resolve('./src/templates/blogpost-list.js'),
                context: {
                    limit: postsPerPage,
                    skip: index * postsPerPage,
                    numPages,
                    currentPage: index + 1
                }
            })
    })
})

}