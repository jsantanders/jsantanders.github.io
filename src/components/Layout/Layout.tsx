import React from 'react'
import { Helmet } from 'react-helmet'
import '../../assets/scss/init.scss'
import ThemeToggle from '../ThemeToggle'
import './style.scss'

const Layout: React.FC = (props) => {
    const { children } = props

    return (
      <div
        id="main-layout"
        style={{
          color: 'var(--textNormal)',
          background: 'var(--bg)',
          transition: 'color 0.2s ease-out, background 0.2s ease-out',
        }}
      >
        <div className="layout">
          <Helmet defaultTitle="Blog by Jesus Santander" />
          <div className="toggle-button">
              <ThemeToggle />
          </div>
          {children}
        </div>
      </div>
    )
}

export default Layout
