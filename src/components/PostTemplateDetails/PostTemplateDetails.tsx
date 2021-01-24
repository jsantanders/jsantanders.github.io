import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import Disqus from '../Disqus'
import './style.scss'
import { replaceAnchorLinksByLanguage, codeToLanguage, createLanguageLink } from '../../utils/i18n'
import Translations from '../Translations'
import ScrollButton from "../ScrollButton"
import { formatReadingTime } from '../../utils/helpers'
import ColorModeToggle from '../ThemeToggle'

interface PageQueryData {
  site: {
    siteMetadata: {
      disqusShortname: string,
      url: string,
      subtitle: string,
      author: {
        name: string,
        twitter: string,
        github: string,
        stackoverflow: string,
      },
    }
  },
  markdownRemark: {
    fields: {
      slug: string,
      tagSlugs: Array<string>,
      categorySlug: string,
      langKey: string
    }
    timeToRead: number,
    frontmatter: {
        date: string
        title: string,
        category_id: string,
        tags: Array<string>
      },
    html: string
  }
}

interface Props {
  readonly data: PageQueryData,
  readonly pageContext :{
    previous: string,
    next: string,
    slug: string,
    translations: Array<string>,
    translatedLinks: Array<string>,
  }
}

const PostTemplateDetails : React.FC<Props> = (props) => {
    const { subtitle, author } = props.data.site.siteMetadata
    const post = props.data.markdownRemark
    const tags = post.fields.tagSlugs
    const lang = post.fields.langKey
    const timeToRead = post.timeToRead
    let {
      previous,
      next,
      slug,
      translations,
      translatedLinks,
    } = props.pageContext;

    // Replace original links with translated when available.
    let html = post.html;

    // Replace original anchor links by lang when available in whitelist
    // see utils/whitelist.js
    html = replaceAnchorLinksByLanguage(html, lang);

    translatedLinks.forEach(link => {
      // jeez
      function escapeRegExp(str: string) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }
      let translatedLink = '/' + lang + link;
      html = html.replace(
        new RegExp('"' + escapeRegExp(link) + '"', 'g'),
        '"' + translatedLink + '"'
      );
    });

    translations = translations.slice();
    translations.sort((a, b) => {
      return codeToLanguage(a) < codeToLanguage(b) ? -1 : 1;
    });

    // TODO: this curried function is annoying
    const languageLink = createLanguageLink(slug, lang);
    const enSlug = languageLink('en');
    const editUrl = `https://github.com/${author.github}/jsantanders.github.io/edit/master/src/pages/${enSlug.slice(
      1,
      enSlug.length - 1
    )}/index${lang === 'en' ? '' : '.' + lang}.md`;
    const discussUrl = `https://mobile.twitter.com/search?q=${encodeURIComponent(
      `https://overreacted.io${enSlug}`
    )}`;

    const homeBlock = (
      <div>
        <Link className="post-single__home-button" to="/">
          All Articles
        </Link>
      </div>
    )

    const translationBlock = (
      <div>
        {translations.length > 0 && (
          <Translations
            translations={translations}
            editUrl={editUrl}
            languageLink={languageLink}
            lang={lang}
          />
        )}
      </div>
    )

    const tagsBlock = (
      <div className="post-single__tags">
        <ul className="post-single__tags-list">
          {tags &&
            tags.map((tag, i) => (
              <li className="post-single__tags-list-item" key={tag}>
                <Link to={tag} className="post-single__tags-list-item-link">
                  {post.frontmatter.tags[i]}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    )

    const commentsBlock = (
      <div>
        <Disqus
          postNode={post}
          siteMetadata={props.data.site.siteMetadata}
        />
      </div>
    )

    return (
      <div>
        {homeBlock}
        <div className="post-single">
          <div className="post-single__inner">
            <h1 className="post-single__title">{post.frontmatter.title}</h1>
            <div className="post-single__subtitle">
              {moment(post.frontmatter.date).format('DD MMM YYYY')} • {`${formatReadingTime(timeToRead)}`}
            </div>
            <div className="post-single__body">
              {translationBlock}
            </div>
            <div
              className="post-single__body"
              /* eslint-disable-next-line react/no-danger */
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>
          <div className="post-single__footer">
            {tagsBlock}
            <hr />
            {commentsBlock}
          </div>
          <div>
            {<ScrollButton scrollStepInPx={50} delayInMs={16.66} />}
          </div>
        </div>
      </div>
    )
}

export default PostTemplateDetails
