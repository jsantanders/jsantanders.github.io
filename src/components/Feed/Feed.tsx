import { Link } from 'gatsby';
import React from 'react';
import { formatReadingTime } from '../../utils/helpers';

import styles from './Feed.module.scss';

type Props = {
  readonly edges?: GatsbyTypes.IndexTemplateQuery["allMarkdownRemark"]["edges"]
};

const Feed = ({ edges }: Props) => {
  return (
    <div className={styles['feed']}>
      {edges?.map((edge) => (
        <div className={styles['feed__item']} key={edge.node.fields?.slug}>
          <h2 className={styles['feed__item-title']}>
            <Link
              className={styles['feed__item-title-link']}
              to={`${edge.node.fields?.slug}`}>
              {edge.node.frontmatter?.title}
            </Link>
          </h2>
          <div className={styles['feed__item-meta']}>
            <time className={styles['feed__item-meta-time']} dateTime={new Date(edge.node.frontmatter?.date ?? "").toLocaleDateString(edge.node.fields?.langKey, { year: 'numeric', month: 'long', day: 'numeric' })}>
              {new Date(edge.node.frontmatter?.date ?? "").toLocaleDateString(edge.node.fields?.langKey, { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <span className={styles['feed__item-meta-divider']} />
            <span className={styles['feed__item-meta-category']}>
              <Link
                to={`${edge.node.fields?.langKey === "en" ? "" : "/" + edge.node.fields?.langKey}${edge.node.fields?.categorySlug}`}
                className={styles['feed__item-meta-category-link']}>
                {edge.node.frontmatter?.category}
              </Link>
            </span>
            <span className={styles['feed__item-meta-divider']} />
            <span className={styles['feed__item-meta-time-to-read']}>{formatReadingTime(edge.node.timeToRead ?? 0)}</span>
          </div>
          <p className={styles['feed__item-description']}>{edge.node.frontmatter?.description}</p>
        </div>
      ))}
    </div>
  )
}

export default Feed;
