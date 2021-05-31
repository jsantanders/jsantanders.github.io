import React from 'react';
import { Link } from 'gatsby';
import styles from './Tags.module.scss';

type Props = {
    tags: readonly string[],
    tagSlugs: readonly string[]
    lang?: string
};

const Tags = ({ tags, tagSlugs, lang }: Props) => {
    const langSlug = lang === "en" ? "" : `/${lang}`
    return (
        <div className={styles['tags']}>
            <ul className={styles['tags__list']}>
                {tags && tagSlugs && tagSlugs?.map((slug, i) => (
                    <li className={styles['tags__list-item']} key={tags[i]}>
                        <Link to={langSlug + slug} className={styles['tags__list-item-link']}>
                            {tags[i]}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Tags;
