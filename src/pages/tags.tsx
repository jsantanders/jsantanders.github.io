import React from 'react'
import { Link, graphql, PageProps } from 'gatsby'
import { Helmet } from 'react-helmet'
import kebabCase from 'lodash/kebabCase'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'

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
        frontmatter: {
          date: string
          title: string,
          category: string,
          description: string
        }
      }
    }[],
    group: Array<{fieldValue: string, totalCount: number}>
  }
}

interface Props extends PageProps {
  readonly data: PageQueryData
}

const TagsRoute : React.FC<Props> = (props) => {
    const { title } = props.data.site.siteMetadata
    const tags = props.data.allMarkdownRemark.group

    return (
      <Layout>
        <div>
          <Helmet title={`All Tags - ${title}`} />
          <Sidebar {...props} />
          <div className="content">
            <div className="content__inner">
              <div className="page">
                <h1 className="page__title">Tags</h1>
                <div className="page__body">
                  <div className="tags">
                    <ul className="tags__list">
                      {tags.map(tag => (
                        <li key={tag.fieldValue} className="tags__list-item">
                          <Link
                            to={`/tags/${kebabCase(tag.fieldValue)}/`}
                            className="tags__list-item-link"
                          >
                            {tag.fieldValue} ({tag.totalCount})
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
}

export default TagsRoute

export const pageQuery = graphql`
  query TagsQuery {
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
      limit: 2000
      filter: { frontmatter: { layout: { eq: "post" }, draft: { ne: true } }, fields: { langKey: { eq: "en" } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
