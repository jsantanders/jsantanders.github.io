import { GatsbyNode } from 'gatsby'
import * as path from 'path'
import { each, kebabCase } from 'lodash'
import slash from 'slash'

import supportedLanguages from '../../src/i18n'
import { siteConfig } from '../settings'

const createTagsPage: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions
  const { postsPerPage } = siteConfig

  for (const lang in supportedLanguages) {
    const result = await graphql<any>(`
    {
      allMarkdownRemark(
        filter: {
          frontmatter: { layout: { eq: "post" }, draft: { ne: true } }
          fields: { langKey: { eq: "${lang}" } }
        }
      ) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `)

    const langSlug = lang === 'en' ? '' : `${lang}`
    each(result.data?.allMarkdownRemark.group, (tag) => {
      const numPages = Math.ceil(tag.totalCount / postsPerPage)
      const tagSlug = `${langSlug}/tag/${kebabCase(
        tag.fieldValue
      )}`

      for (let i = 0; i < numPages; i += 1) {
        createPage({
          path: i === 0 ? tagSlug : `${tagSlug}/page/${i}`,
          component: slash(path.resolve('./src/templates/tag-template.tsx')),
          context: {
            tag: tag.fieldValue,
            currentPage: i,
            postsLimit: postsPerPage,
            postsOffset: i * postsPerPage,
            prevPagePath:
              i <= 1 ? tagSlug : `${tagSlug}/page/${i - 1}`,
            nextPagePath: `${tagSlug}/page/${i + 1}`,
            hasPrevPage: i !== 0,
            hasNextPage: i !== numPages - 1,
            langKey: lang,
          },
        })
      }
    })
  }
}

export default createTagsPage
