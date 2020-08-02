import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, PageProps } from 'gatsby'
import Layout from '../components/Layout'
import PageTemplateDetails from '../components/PageTemplateDetails'

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
  },
  markdownRemark: {
      frontmatter: {
        date: string
        title: string,
        description: string
      },
      html: string
  }
}

interface Props extends PageProps {
  readonly data: PageQueryData
}

const PageTemplate : React.FC<Props> = (props) => {
    const { title, subtitle } = props.data.site.siteMetadata
    const page = props.data.markdownRemark
    const { title: pageTitle, description: pageDescription } = page.frontmatter
    const description = pageDescription !== null ? pageDescription : subtitle

    return (
      <Layout>
        <div>
          <Helmet>
            <title>{`${pageTitle} - ${title}`}</title>
            <meta name="description" content={description} />
          </Helmet>
          <PageTemplateDetails {...props} />
        </div>
      </Layout>
    )
}

export default PageTemplate

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date
        description
      }
    }
  }
`
