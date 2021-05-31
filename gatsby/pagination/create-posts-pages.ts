import { GatsbyNode } from 'gatsby'
import * as path from 'path'
import slash from 'slash'

import supportedLanguages from '../../src/i18n'
import { siteConfig } from '../settings'

const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { createPage } = actions

  for (const lang in supportedLanguages) {
    const result = await graphql<any>(`
      {
        allMarkdownRemark(
          filter: {
            frontmatter: { layout: { eq: "post" }, draft: { ne: true } }
            fields: { langKey: { eq: "${lang}" } }
          }
        ) {
          totalCount
        }
      }
    `)

    const { postsPerPage } = siteConfig
    const numPages = Math.ceil(
      Number(result.data?.allMarkdownRemark.totalCount) / postsPerPage
    )
    const pathLangSlug = lang === 'en' ? '' : `${lang}`
    for (let i = 0; i < numPages; i += 1) {
      createPage({
        path: i === 0 ? `${pathLangSlug}/` : `${pathLangSlug}/page/${i}`,
        component: slash(path.resolve('./src/templates/index-template.tsx')),
        context: {
          currentPage: i,
          postsLimit: postsPerPage,
          postsOffset: i * postsPerPage,
          prevPagePath: i <= 1 ? `/${pathLangSlug}` : `page/${i - 1}`,
          nextPagePath: `page/${i + 1}`,
          hasPrevPage: i !== 0,
          hasNextPage: i !== numPages - 1,
          langKey: lang,
        },
      })
    }
  }
}

export default createPages
