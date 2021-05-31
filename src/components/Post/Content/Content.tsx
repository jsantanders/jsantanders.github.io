import Translations from '../../Translations';
import React from 'react';
import styles from './Content.module.scss';
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';

deckDeckGoHighlightElement();

type Props = {
    body: string,
    title: string,
    translationsList: string[],
    languageLink: (code: string) => string,
    lang: string,
    editUrl: string
};

const Content = ({ body, title, translationsList, lang, editUrl, languageLink }: Props) => (
    <div className={styles['content']}>
        <h1 className={styles['content__title']}>{title}</h1>
        <div className={styles['content__body']}>
            {translationsList.length > 0 && (
                <Translations
                    translations={translationsList}
                    editUrl={editUrl}
                    languageLink={languageLink}
                    lang={lang}
                />
            )}
        </div>
        <div className={styles['content__body']} dangerouslySetInnerHTML={{ __html: body }} />
    </div>
);

export default Content;
