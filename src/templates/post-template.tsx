import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, PageProps } from 'gatsby'
import Layout from '../components/Layout'
import PostTemplateDetails from '../components/PostTemplateDetails'

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
    }
  },
  markdownRemark: {
    fields: {
      slug: string,
      tagSlugs: Array<string>,
      categorySlug: string,
      langKey: string
    }
    timeToRead: number,
    frontmatter: {
      date: string
      title: string,
      description: string
      category_id: string,
      tags: Array<string>
      },
    html: string
  }
}

interface Props extends PageProps {
  readonly data: PageQueryData
  readonly pageContext :{
    previous: string,
    next: string,
    slug: string,
    translations: Array<string>,
    translatedLinks: Array<string>,
  }
}

const PostTemplate : React.FC<Props> = (props) => {
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
