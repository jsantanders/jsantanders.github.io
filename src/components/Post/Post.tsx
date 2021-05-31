import React from 'react'
import { Link } from 'gatsby'
import Author from './Author';
import Comments from './Comments';
import Content from './Content';
import Meta from './Meta';
import Tags from './Tags';
import styles from './Post.module.scss';
import { codeToLanguage, createLanguageLink, replaceAnchorLinksByLanguage } from '../../utils/i18n';
import { useSiteMetadata } from '../../hooks';

type Props = {
  post: GatsbyTypes.PostBySlugQuery["markdownRemark"]
  pageContext: GatsbyTypes.SitePageContext
};

const Post: React.FC<Props> = ({ post, pageContext }: Props) => {
  let html = post?.html || "";
  const tagSlugs = post?.fields?.tagSlugs;
  const tags = post?.frontmatter?.tags;
  const slug = post?.fields?.slug ?? "";
  const title = post?.frontmatter?.title ?? "";
  const date = post?.frontmatter?.date ?? "";
  const lang = post?.fields?.langKey ?? "en";
  const { author } = useSiteMetadata() || {};
  const allArticleSlug = lang === "en" ? "/" : `/${lang}`
  let {
    translations,
  } = pageContext;

  // Replace original anchor links by lang when available in whitelist
  // see utils/whitelist.js
  html = replaceAnchorLinksByLanguage(html, lang);


  let translationsList = translations?.slice() as string[];
  translationsList.sort((a, b) => {
    return codeToLanguage(a) < codeToLanguage(b) ? -1 : 1;
  });

  // TODO: this curried function is annoying
  const languageLink = createLanguageLink(slug, lang);
  const enSlug = languageLink('en');
  const editUrl = `https://github.com/${author?.contacts?.github}/jsantanders.dev/edit/master/src/pages/posts/${enSlug.slice(
    1,
    enSlug.length - 1
  )}/index${lang === 'en' ? '' : '.' + lang}.md`;

  return (
    <div className={styles['post']}>
      <Link className={styles['post__home-button']} to={allArticleSlug}>All Articles</Link>
      <div className={styles['post__content']}>
        <Content
          body={html}
          title={title}
          editUrl={editUrl}
          languageLink={languageLink}
          translationsList={translationsList}
          lang={lang} />
      </div>

      <div className={styles['post__footer']}>
        <Meta date={date} />
        {tags && tagSlugs && <Tags tags={tags as string[]} tagSlugs={tagSlugs as string[]} lang={lang} />}
        <Author />
      </div>

      <div className={styles['post__comments']}>
        <Comments postSlug={slug} postTitle={title} />
      </div>
    </div>
  );
}

export default Post
