import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, PageProps } from 'gatsby'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import CategoryTemplateDetails from '../components/CategoryTemplateDetails'

interface PageQueryData {
  site: {
    siteMetadata: {
      title: string,
      disqusShortname: string,
      url: string,
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
  },
  allMarkdownRemark: {
    totalCount: number
    edges: {
      node: {
        excerpt: string
        fields: {
          slug: string,
          categorySlug: string
        }
        timeToRead: number
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
  readonly pageContext: {
    category?: string
  }
}

const CategoryTemplate : React.FC<Props> = (props) => {
  console.log(props);
    const { title } = props.data.site.siteMetadata
    const { category } = props.pageContext

    return (
      <Layout>
        <div>
          <Helmet title={`${category} - ${title}`} />
          <Sidebar {...props} />
          <CategoryTemplateDetails {...props} />
        </div>
      </Layout>
    )
}

export default CategoryTemplate

export const pageQuery = graphql`
  query CategoryPage($category: String) {
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
      filter: {
        frontmatter: {
          category: { eq: $category }
          layout: { eq: "post" }
          draft: { ne: true }
        }
        fields: { langKey: { eq: "en" } }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
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
