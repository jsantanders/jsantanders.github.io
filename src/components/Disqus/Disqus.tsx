import React, { useState  } from 'react'
import ReactDisqusComments from 'react-disqus-comments'

interface Props {
  readonly siteMetadata: {
    disqusShortname: string,
    url: string
  },
  readonly postNode: {
    fields: {
      slug: string
    }
    frontmatter: {
      date: string
      title: string,
      category_id: string
    }
  }
}

const Disqus : React.FC<Props> = (props) =>  {
    const [toasts, setToasts] = useState<Array<{text: string}>>([]);
    
    const notifyAboutComment =  () => {
      const notifications = toasts.slice()
      notifications.push({ text: 'New comment available!' })
      setToasts(notifications)
    }

    const onSnackbarDismiss = () => {
      const [, ...notifications] = toasts
      setToasts(notifications)
    }

    const { postNode, siteMetadata } = props
    if (!siteMetadata.disqusShortname) {
      return null
    }
    const post = postNode.frontmatter
    const url = siteMetadata.url + postNode.fields.slug
    return (
      <ReactDisqusComments
        shortname={siteMetadata.disqusShortname}
        identifier={post.title}
        title={post.title}
        url={url}
        category_id={post.category_id}
        onNewComment={notifyAboutComment}
      />
    )
}

export default Disqus
