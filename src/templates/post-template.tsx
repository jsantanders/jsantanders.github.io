import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, PageProps } from 'gatsby'
import Layout from '../components/Layout'
import PostTemplateDetails from '../components/PostTemplateDetails'
import { PageContext, PageQuery } from 'types'

interface Props extends PageProps {
  readonly data: PageQuery
  readonly pageContext: PageContext
}

const PostTemplate: React.FC<Props> = (props) => {
  const { title, subtitle } = props.data.site.siteMetadata
  const post = props.data.markdownRemark
  const { title: postTitle, description: postDescription } = post.frontmatter
  const description = postDescription !== null ? postDescription : subtitle

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{`${postTitle} - ${title}`}</title>
          <meta name="description" content={description} />
        </Helmet>
        <PostTemplateDetails {...props} />
      </div>
    </Layout>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        subtitle
        copyright
        author {
          name
          twitter
        }
        disqusShortname
        url
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        tagSlugs
        langKey
        slug
      }
      timeToRead
      frontmatter {
        title
        tags
        date
        description
      }
    }
  }
`
