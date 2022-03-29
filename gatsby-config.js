require('dotenv').config()


module.exports = {
    siteMetadata: {
      title: `staqsnqs`,
      author: `Hill Onyechekwa`,
      description: 'A blog about software development, programming, and life.',
      siteUrl: `https://staqsnqs.netlify.app/`,
      twitterUsername: '@madeofhill'
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sass',
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
        'gatsby-plugin-offline',
        'gatsby-plugin-sitemap',
        'gatsby-plugin-image',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'src',
                path: `${__dirname}/src/`
            }
        },
        {
            resolve: 'gatsby-source-graphcms',
            options: {
                endpoint: process.env.GRAPHCMS_ENDPOINT,
            }
        },
        // {
        //     resolve: `gatsby-plugin-manifest`,
        //     options: {
        //       name: `GatsbyJS`,
        //       short_name: `GatsbyJS`,
        //       start_url: `/`,
        //       background_color: `#f7f0eb`,
        //       theme_color: `#a2466c`,
        //       display: `standalone`,
        //     },
        //   },
          {
              resolve: 'gatsby-plugin-web-font-loader',
              options:{
                  google:{
                      families: ['Inter:400,600,700', 'IBM Plex Sans:400,500,600,700', 'Nanum Gothic:400,700']
                  }
              }
          },
          {
              resolve: 'gatsby-plugin-disqus',
                options: {
                    shortname: 'staqsnqs',
                },
          },
        //   {
        //     resolve: 'gatsby-plugin-robots-txt',
        //     options: {
        //       host: 'https://staqsnqs.netlify.app',
        //       sitemap: 'https://staqsnqs.netlify.app/sitemap.xml',
        //       policy: [{userAgent: '*', allow: '/'}]
        //     }
        //   },
        //   {
        //     resolve: `gatsby-plugin-feed`,
        //     options: {
        //       query: `
        //         {
        //           site {
        //             siteMetadata {
        //               title
        //               description
        //               siteUrl
        //               site_url: siteUrl
        //             }
        //           }
        //         }
        //       `,
        //       feeds: [
        //         {
        //           serialize: ({ query: { site, allGraphcmsPost } }) => {
        //             return allGraphcmsPost.edges.map(edge => {
        //               return Object.assign({}, edge.node.frontmatter, {
        //                 description: edge.node.excerpt,
        //                 date: edge.node.frontmatter.date,
        //                 url: site.siteMetadata.siteUrl + edge.node.fields.slug,
        //                 guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
        //                 custom_elements: [{ "content:encoded": edge.node.html }],
        //               })
        //             })
        //           },
        //           query: `
        //             {
        //               allMarkdownRemark(
        //                 sort: { order: DESC, fields: [frontmatter___date] },
        //               ) {
        //                 edges {
        //                   node {
        //                     excerpt
        //                     html
        //                     fields { slug }
        //                     frontmatter {
        //                       title
        //                       date
        //                     }
        //                   }
        //                 }
        //               }
        //             }
        //           `,
        //           output: "/rss.xml",
        //           title: "Your Site's RSS Feed",
        //         },
        //       ],
        //     },
        //   },
    ]
}