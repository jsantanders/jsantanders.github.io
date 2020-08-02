import React from 'react'
import { Link } from 'gatsby'
import './style.scss'

interface Props {
  readonly data: Array<{
    path: string,
    label: string
  }>
}

const Menu : React.FC<Props> = (props) => {
    const menu = props.data

    const menuBlock = (
      <ul className="menu__list">
        {menu.map(item => (
          <li className="menu__list-item" key={item.path}>
            <Link
              to={item.path}
              className="menu__list-item-link"
              activeClassName="menu__list-item-link menu__list-item-link--active"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    )

    return <nav className="menu">{menuBlock}</nav>
}

export default Menu
