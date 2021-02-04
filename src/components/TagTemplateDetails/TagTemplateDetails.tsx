import React from 'react'
import { PageQuery } from 'types'
import Post from '../Post'

interface Props {
  readonly data: PageQuery
  readonly pageContext: {
    tag?: string
  }
}

const TagTemplateDetails : React.FC<Props> = (props) => {
    const items : Array<JSX.Element> = []
    const tagTitle = props.pageContext.tag
    const posts = props.data.allMarkdownRemark.edges
    posts.forEach(post => {
      items.push(<Post data={post.node} key={post.node.fields.slug} />)
    })

    return (
      <div className="content">
        <div className="content__inner">
          <div className="page">
            <h1 className="page__title">
              All Posts tagged as <br /> &quot;
              {tagTitle}
              &quot;
            </h1>
            <div className="page__body">{items}</div>
          </div>
        </div>
      </div>
    )
}

export default TagTemplateDetails
