import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Page from '../components/Page';
import Pagination from '../components/Pagination';
import { useSiteMetadata } from '../hooks';

type Props = {
    data: GatsbyTypes.CategoryPageQuery,
    pageContext: GatsbyTypes.SitePageContext
};

const CategoryTemplate = ({ data, pageContext }: Props) => {
    const { title: siteTitle, subtitle: siteSubtitle } =  useSiteMetadata();

    const {
        category,
        currentPage,
        prevPagePath,
        nextPagePath,
        hasPrevPage,
        hasNextPage,
    } = pageContext;

    const { allMarkdownRemark } = data;
    const pageTitle = currentPage && currentPage > 0 ? `${category} - Page ${currentPage} - ${siteTitle}` : `${category} - ${siteTitle}`;

    return (
        <Layout title={pageTitle} description={siteSubtitle}>
            <Sidebar />
            <Page title={category}>
                <Feed edges={allMarkdownRemark.edges} />
                <Pagination
                    prevPagePath={prevPagePath}
                    nextPagePath={nextPagePath}
                    hasPrevPage={hasPrevPage}
                    hasNextPage={hasNextPage}
                />
            </Page>
        </Layout>
    );
};

export const query = graphql`
  query CategoryPage($category: String, $postsLimit: Int!, $postsOffset: Int!, $langKey: String!) {
    allMarkdownRemark(
        limit: $postsLimit,
        skip: $postsOffset,
        filter: { frontmatter: { category: { eq: $category }, layout: { eq: "post" }, draft: { ne: true } }, fields: { langKey: { eq: $langKey } } },
        sort: { order: DESC, fields: [frontmatter___date] }
      ){
      edges {
        node {
          timeToRead
          fields {
            categorySlug
            slug
            langKey
          }
          frontmatter {
            date
            description
            category
            title
          }
        }
      }
    }
  }
`;

export default CategoryTemplate;
