import React from 'react'
import { graphql, PageProps } from 'gatsby'
import Sidebar from '../components/Sidebar'
import Layout from '../components/Layout'

interface PageQueryData {
  site: {
    siteMetadata: {
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
  }
}

interface Props extends PageProps {
  readonly data: PageQueryData
}


const NotFoundRoute : React.FC<Props> = (props) => {
    return (
      <Layout>
        <div>
          <Sidebar {...props} />
          <div className="content">
            <div className="content__inner">
              <div className="page">
                <h1 className="page__title">NOT FOUND</h1>
                <div className="page__body">
                  <p>
                    You just hit a route that doesn&#39;t exist... the sadness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
}

export default NotFoundRoute

export const pageQuery = graphql`
  query NotFoundQuery {
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
  }
`
