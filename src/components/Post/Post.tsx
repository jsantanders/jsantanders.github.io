import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import './style.scss'
import { formatReadingTime } from '../../utils/helpers'
import { Node } from 'types'

interface Props {
  readonly data: Node
}

const Post: React.FC<Props> = (props) => {
  const {
    title,
    date,
    category,
    description,
  } = props.data.frontmatter
  const { timeToRead } = props.data

  let { slug, categorySlug } = props.data.fields
  categorySlug = categorySlug === undefined ? "" : categorySlug;

  return (
    <div className="post">
      <h2 className="post__title">
        <Link className="post__title-link" to={slug}>
          {title}
        </Link>
      </h2>
      <div className="post__meta">
        <time
          className="post__meta-time"
          dateTime={moment(date).format('MMMM D, YYYY')}
        >
          {moment(date).format('D MMMM YYYY')}
        </time>
        <span className="post__meta-divider" />
        <span className="post__meta-time">
          {`${formatReadingTime(timeToRead)}`}
        </span>
        <span className="post__meta-divider" />
        <span className="post__meta-category" key={categorySlug}>
          <Link to={categorySlug} className="post__meta-category-link">
            {category}
          </Link>
        </span>
      </div>
      <p className="post__description">{description}</p>
      <Link className="post__readmore" to={slug}>
        Read
        </Link>
    </div>
  )
}

export default Post
