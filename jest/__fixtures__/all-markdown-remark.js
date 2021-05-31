'use strict';

module.exports = {
  allMarkdownRemark: {
    group: [
      {
        fieldValue: 'test_0',
        totalCount: 1
      },
      {
        fieldValue: 'test_1',
        totalCount: 2
      }
    ],
    edges: [
      {
        node: {
          fields: {
            slug: '/test_0',
            categorySlug: '/test',
            langKey: 'en'
          },
          frontmatter: {
            date: '2016-09-01',
            description: 'test_0',
            category: 'test',
            title: 'test_0',
            tags: ['tag_1', 'tag_2']
          },
          timeToRead: 100,
          title: 'title_0',
          html: '<div></div>',
          id: '1'
        }
      },
      {
        node: {
          fields: {
            slug: '/test_1',
            categorySlug: '/test',
            langKey: 'en'
          },
          frontmatter: {
            date: '2016-09-01',
            description: 'test_1',
            category: 'test',
            title: 'test_1',
            tags: ['tag_1', 'tag_2']
          },
          timeToRead: 100,
          title: 'title_1',
          html: '<div></div>',
          id: '2'
        }
      }
    ]
  }
};
