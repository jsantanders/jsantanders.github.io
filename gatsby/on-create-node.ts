import { CreateNodeArgs, PluginCallback, PluginOptions } from 'gatsby'
import { get, kebabCase } from 'lodash'
import path from 'path'

type onCreateNode<TNode extends object = {}> = (
  args: CreateNodeArgs<TNode>,
  options?: PluginOptions,
  callback?: PluginCallback
) => void

const onCreateNode: onCreateNode<any> = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    createNodeField({
      node,
      name: 'directoryName',
      value: path.basename(
        path.dirname(get(node, 'fileAbsolutePath') as string)
      ),
    })

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(
        (tag) => `/tag/${kebabCase(tag)}/`
      )
      createNodeField({ node, name: 'tagSlugs', value: tagSlugs })
    }

    if (node.frontmatter.category) {
      const categorySlug = `/category/${kebabCase(node.frontmatter.category)}/`
      createNodeField({ node, name: 'categorySlug', value: categorySlug })
    }
  }
}

export default onCreateNode
