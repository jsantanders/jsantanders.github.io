import { GatsbyNode } from 'gatsby'
import { each, get, reduce } from 'lodash'
import * as path from 'path'
import slash from 'slash'

import supportedLanguages from '../src/i18n'

import {
  createCategoriesPages,
  createPostsPages,
  createTagsPages,
} from './pagination'

const createPages: GatsbyNode['createPages'] = async (args) => {
  const { graphql, actions } = args
  const { createPage } = actions

  const pageTemplate = path.resolve('./src/templates/page-template.tsx')
  const PostTemplate = path.resolve('./src/templates/post-template.tsx')

  // 404
  createPage({
    path: '/404',
    component: path.resolve('./src/templates/not-found-template.tsx'),
    context: '',
  })

  // pages from markdown
  const result = await graphql<any>(`
    {
      allMarkdownRemark(filter: { frontmatter: { draft: { ne: true } } }) {
        edges {
          node {
            fields {
              slug
              directoryName
              langKey
            }
            frontmatter {
              tags
              layout
              category
              path
            }
          }
        }
      }
    }
  `)

  if (result.data) {
    const { edges } = result.data.allMarkdownRemark
    const translationsByDirectory = reduce(
      edges,
      (result, post) => {
        const directoryName = get(post, 'node.fields.directoryName')
        const langKey = get(post, 'node.fields.langKey')

        if (directoryName && langKey && langKey !== 'en') {
          ;(result[directoryName] || (result[directoryName] = [])).push(langKey)
        }

        return result
      },
      {}
    )
    for (const lang in supportedLanguages) {
      const locEdges = edges.filter((edge) => edge.node.fields.langKey === lang)
      each(locEdges, (edge) => {
        const translations =
          translationsByDirectory[get(edge, 'node.fields.directoryName')] || []

        if (get(edge, 'node.frontmatter.layout') === 'page') {
          createPage({
            path: edge.node.fields.slug,
            component: slash(pageTemplate),
            context: { slug: edge.node.fields.slug },
          })
        } else if (get(edge, 'node.frontmatter.layout') === 'post') {
          createPage({
            path: edge.node.fields.slug,
            component: slash(PostTemplate),
            context: {
              slug: edge.node.fields.slug,
              translations,
            },
          })
        }
      })

      const pathBase = lang === 'en' ? '' : `/${lang}`

      // Tags list
      createPage({
        path: `${pathBase}/tags`,
        component: path.resolve('./src/templates/tags-list-template.tsx'),
        context: '',
      })

      // Categories list
      createPage({
        path: `${pathBase}/categories`,
        component: path.resolve('./src/templates/categories-list-template.tsx'),
        context: '',
      })
    }
  }

  // Feeds
  if (createTagsPages && createCategoriesPages && createPostsPages) {
    await createTagsPages(args)
    await createCategoriesPages(args)
    await createPostsPages(args)
  }
}

export default createPages
