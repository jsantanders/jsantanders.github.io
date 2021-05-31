// @flow strict
import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Post from '../components/Post';
import { useSiteMetadata } from '../hooks';

type Props = {
  data: GatsbyTypes.PostBySlugQuery,
  pageContext: GatsbyTypes.SitePageContext
};

const PostTemplate = ({ data, pageContext }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata() || {};
  const { frontmatter } = data.markdownRemark || {};
  const { title: postTitle, description: postDescription = '' } = frontmatter || {};
  const metaDescription = postDescription || siteSubtitle;

  return (
    <Layout title={`${postTitle} - ${siteTitle}`} description={metaDescription} >
      <Post post={data.markdownRemark} pageContext={pageContext} />
    </Layout>
  );
};

export const query = graphql`
  query PostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      fields {
        slug
        tagSlugs
        langKey
      }
      frontmatter {
        date
        description
        tags
        title
      }
    }
  }
`;

export default PostTemplate;
