import { useStaticQuery, graphql } from 'gatsby'

const useSiteMetadata = () => {
  const { site } = useStaticQuery<GatsbyTypes.SiteMetaDataQuery>(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            author {
              name
              bio
              photo
              contacts {
                linkedin
                github
                twitter
              }
            }
            disqusShortname
            copyright
            url
            title
            subtitle
            menu {
              label
              path
            }
          }
        }
      }
    `
  )

  return site?.siteMetadata as GatsbyTypes.SiteSiteMetadata
}

export default useSiteMetadata
