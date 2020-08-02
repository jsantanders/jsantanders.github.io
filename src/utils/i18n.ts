import { supportedLanguages }  from './../../i18n';

// This is kind of a mess for some languages.
// Try to be as short as possible.
// Make sure you use a real code (e.g. "ja", not "jp").
// Some resources:
// http://www.rfc-editor.org/rfc/bcp/bcp47.txt
// https://www.w3.org/International/articles/language-tags/
// https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
// https://discuss.httparchive.org/t/what-are-the-invalid-uses-of-the-lang-attribute/1022

const supportedLanguagesTyped = supportedLanguages as { [key: string]: string}


export const codeToLanguage = (code : string) =>
  supportedLanguagesTyped[code].replace(/ /g, ' ' /* nbsp */);


// TODO: the curried signature is weird.
export const createLanguageLink = (slug : string, lang: string) => {
  const rawSlug = slug.replace(`${lang}/`, '');

  return (targetLang : string) =>
    targetLang === 'en' ? rawSlug : `/${targetLang}${rawSlug}`;
};

export const replaceAnchorLinksByLanguage = (html: string, code: string) => {
  // Match any link using https://regexr.com/4airl
  const matches = html.match(/https?:\/\/(www)?[^\/\s)"?]+/gm);

  // Return same html if no matches were found
  // or code isn't supported
  if (!matches || !supportedLanguagesTyped[code]) {
    return html;
  }

  return html;
};
