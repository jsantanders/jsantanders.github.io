// @flow strict
import { useStaticQuery, graphql } from 'gatsby'

const useCategoriesList = () => {
  const { allMarkdownRemark } = useStaticQuery<GatsbyTypes.CategoriesListQueryQuery>(
    graphql`
      query CategoriesListQuery {
        allMarkdownRemark(
          filter: {
            frontmatter: { layout: { eq: "post" }, draft: { ne: true } }
          }
        ) {
          group(field: frontmatter___category) {
            fieldValue
            totalCount
          }
        }
      }
    `
  )

  return allMarkdownRemark.group
}

export default useCategoriesList
