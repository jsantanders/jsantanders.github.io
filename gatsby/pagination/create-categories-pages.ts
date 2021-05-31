import { GatsbyNode } from 'gatsby'
import { each, kebabCase } from 'lodash'
import * as path from 'path'
import slash from 'slash'

import supportedLanguages from '../../src/i18n'
import { siteConfig } from '../settings'

const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
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
        group(field: frontmatter___category) {
          fieldValue
          totalCount
        }
      }
    }
    `)

    const langSlug = lang === 'en' ? '' : `${lang}`
    each(result.data?.allMarkdownRemark.group, (category) => {
      const numPages = Math.ceil(category.totalCount / postsPerPage)
      const categorySlug = `${langSlug}/category/${kebabCase(
        category.fieldValue
      )}`

      for (let i = 0; i < numPages; i += 1) {
        createPage({
          path: i === 0 ? categorySlug : `${categorySlug}/page/${i}`,
          component: slash(
            path.resolve('./src/templates/category-template.tsx')
          ),
          context: {
            category: category.fieldValue,
            currentPage: i,
            postsLimit: postsPerPage,
            postsOffset: i * postsPerPage,
            prevPagePath:
              i <= 1 ? categorySlug : `${categorySlug}/page/${i - 1}`,
            nextPagePath: `${categorySlug}/page/${i + 1}`,
            hasPrevPage: i !== 0,
            hasNextPage: i !== numPages - 1,
            langKey: lang,
          },
        })
      }
    })
  }
}

export default createPages
