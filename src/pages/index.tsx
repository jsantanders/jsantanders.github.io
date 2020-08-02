import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, PageProps } from 'gatsby'
import Layout from '../components/Layout'
import Post from '../components/Post'
import Sidebar from '../components/Sidebar'

interface PageQueryData {
  site: {
    siteMetadata: {
      disqusShortname: string,
      url: string,
      title: string,
      subtitle: string,
      author: {
        name: string,
        twitter: string,
        github: string,
        stackoverflow: string,
      },
      menu: Array<{label: string, path: string}>,
      copyright: string
    }
  }
  allMarkdownRemark: {
    totalCount: number
    edges: {
      node: {
        excerpt: string
        fields: {
          slug: string,
          categorySlug: string
        }
        timeToRead: number,
        frontmatter: {
          date: string
          title: string,
          category: string,
          description: string
        }
      }
    }[]
  }
}

interface Props extends PageProps {
  readonly data: PageQueryData
}

const IndexRoute : React.FC<Props> = (props) => {
    const items : Array<JSX.Element> = []
    const { title, subtitle } = props.data.site.siteMetadata
    const posts = props.data.allMarkdownRemark.edges
    posts.forEach(post => {
      items.push(<Post data={post} key={post.node.fields.slug} />)
    })

    return (
      <Layout>
        <div>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={subtitle} />
          </Helmet>
          <Sidebar {...props} />
          <div className="content">
            <div className="content__inner">{items}</div>
          </div>
        </div>
      </Layout>
    )
}

export default IndexRoute

export const pageQuery = graphql`
  query($langKey: String!) {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        menu {
          label
          path
        }
        author {
          name
          twitter
          github
          stackoverflow
        }
      }
    }
    allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } }, fields: { langKey: { eq: $langKey } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
            categorySlug
            langKey
          }
          timeToRead
          frontmatter {
            title
            date
            category
            description
          }
        }
      }
    }
  }
`
