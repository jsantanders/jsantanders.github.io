import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, PageProps } from 'gatsby'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import TagTemplateDetails from '../components/TagTemplateDetails'
import { PageContext, PageQuery } from 'types'

interface Props extends PageProps {
  readonly data: PageQuery
  readonly pageContext: PageContext
}

const TagTemplate : React.FC<Props> = (props) => {
    const { title } = props.data.site.siteMetadata
    const { tag } = props.pageContext

    return (
      <Layout>
        <div>
          <Helmet title={`All Posts tagged as "${tag}" - ${title}`} />
          <Sidebar {...props} />
          <TagTemplateDetails {...props} />
        </div>
      </Layout>
    )
}

export default TagTemplate

export const pageQuery = graphql`
  query TagPage($tag: String) {
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
          tags: { in: [$tag] }
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
