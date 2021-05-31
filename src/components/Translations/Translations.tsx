import React from 'react';
import { Link } from 'gatsby';
import { codeToLanguage } from '../../utils/i18n';

const systemFont = `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif`;

interface Props{
  translations : Array<string>
  lang: string,
  languageLink: (code: string) => string,
  editUrl: string
}

const Translations : React.FC<Props> = (props) => {
    let { translations, lang, languageLink, editUrl } = props;
    translations.unshift("en")
    return (
      <div className="translations">
        <Panel style={{ fontFamily: systemFont }}>
          {translations.length > 0 && (
            <span>
              <span> Available in: </span>
              {translations.map((l, i) => (
                <React.Fragment key={l}>
                  {l === lang ? (
                    <b>{codeToLanguage(l)}</b>
                  ) : (
                    <Link to={languageLink(l)}>{codeToLanguage(l)}</Link>
                  )}
                  {i === translations.length - 1 ? '' : ' • '}
                </React.Fragment>
              ))}
            </span>
          )}
        </Panel>
      </div>
    );
}

const Panel : React.FC<{style: {}}> = ({ children, style = {} }) => {
  return (
    <p
      style={{
        fontSize: '0.9em',
        border: '1px solid var(--hr)',
        borderRadius: '0.75em',
        padding: '0.75em',
        background: 'var(--inlineCode-bg)',
        wordBreak: 'keep-all',
        ...style,
      }}
    >
      {children}
    </p>
  );
}

export default Translations
