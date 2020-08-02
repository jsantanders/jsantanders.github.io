import React from 'react'
import Sidebar from '../Sidebar'
import { PageProps } from 'gatsby'
import './style.scss'

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
  },
  markdownRemark: {
      frontmatter: {
        date: string
        title: string
      },
      html: string
  }
}

interface Props extends PageProps {
  readonly data: PageQueryData
}

const PageTemplateDetails : React.FC<Props> = (props) => {
    const page = props.data.markdownRemark

    return (
      <div>
        <Sidebar {...props} />
        <div className="content">
          <div className="content__inner">
            <div className="page">
              <h1 className="page__title">{page.frontmatter.title}</h1>
              <div
                className="page__body"
                /* eslint-disable-next-line react/no-danger */
                dangerouslySetInnerHTML={{ __html: page.html }}
              />
            </div>
          </div>
        </div>
      </div>
    )
}

export default PageTemplateDetails
