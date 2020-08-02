import kebabCase from 'lodash/kebabCase'
import React from 'react'
import { Link, graphql, PageProps } from 'gatsby'
import { Helmet } from 'react-helmet'
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
  readonly pageContext: {
    category?: string
  }
}

const CategoriesRoute : React.FC<Props> = (props) => {
    const { title } = props.data.site.siteMetadata
    const categories = props.data.allMarkdownRemark.group

    return (
      <Layout>
        <div>
          <Helmet title={`All Categories - ${title}`} />
          <Sidebar {...props} />
          <div className="content">
            <div className="content__inner">
              <div className="page">
                <h1 className="page__title">Categories</h1>
                <div className="page__body">
                  <div className="categories">
                    <ul className="categories__list">
                      {categories.map(category => (
                        <li
                          key={category.fieldValue}
                          className="categories__list-item"
                        >
                          <Link
                            to={`/categories/${kebabCase(
                              category.fieldValue
                            )}/`}
                            className="categories__list-item-link"
                          >
                            {category.fieldValue} ({category.totalCount})
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

export default CategoriesRoute

export const pageQuery = graphql`
  query CategoryesQuery {
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
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`
