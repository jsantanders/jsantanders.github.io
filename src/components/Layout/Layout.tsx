import React, { ReactNode } from 'react'
import { Helmet } from 'react-helmet'
import { useSiteMetadata } from "../../hooks"
import styles from './Layout.module.scss';

type Props = {
  children: ReactNode,
  title?: string,
  description?: string,
};


const Layout: React.FC<Props> = ({
  children,
  title,
  description,
}: Props) => {

  const { author, url } = useSiteMetadata() || {};
  const metaImage = author?.photo;
  const metaImageUrl = url?.concat(metaImage ?? "");

  return (
    <div
      id="main-layout"
      className={styles.layout}>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:site_name" content={title} />
        <meta property="og:image" content={metaImageUrl} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={metaImageUrl} />
      </Helmet>
      {children}
    </div>
  )
}

export default Layout
