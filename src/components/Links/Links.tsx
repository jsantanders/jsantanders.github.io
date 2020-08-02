import React from 'react'
import './style.scss'
import '../../assets/fonts/fontello-771c82e0/css/fontello.css'

interface Props {
  readonly data: {
    twitter: string,
    github: string,
    stackoverflow: string
  }
}

const Links : React.FC<Props> = (props) => {
    const author = props.data
    const links = {
      twitter: author.twitter,
      github: author.github,
      stackoverflow: author.stackoverflow,
    }

    return (
      <div className="links">
        <ul className="links__list">
          <li className="links__list-item">
            <a
              href={`https://www.twitter.com/${links.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="icon-twitter" />
            </a>
          </li>
          <li className="links__list-item">
            <a
              href={`https://www.github.com/${links.github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="icon-github" />
            </a>
          </li>
          <li className="links__list-item">
            <a
              href={`https://www.stackoverflow.com/${links.stackoverflow}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="icon-stackoverflow" />
            </a>
          </li>
        </ul>
      </div>
    )
}

export default Links
