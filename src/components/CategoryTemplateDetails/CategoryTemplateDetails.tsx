import React from 'react'
import { PageQuery } from 'types'
import Post from '../Post'

interface Props {
  readonly data: PageQuery
  readonly pageContext: {
    category?: string
  }
}

const CategoryTemplateDetails: React.FC<Props> = (props) => {
  const items: Array<JSX.Element> = []
  const { category } = props.pageContext
  const posts = props.data.allMarkdownRemark.edges
  posts.forEach(post => {
    items.push(<Post data={post.node} key={post.node.fields.slug} />)
  })

  return (
    <div className="content">
      <div className="content__inner">
        <div className="page">
          <h1 className="page__title">{category}</h1>
          <div className="page__body">{items}</div>
        </div>
      </div>
    </div>
  )
}

export default CategoryTemplateDetails
