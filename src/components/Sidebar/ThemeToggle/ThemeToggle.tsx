import React, { useState, useEffect } from "react"
import Toggle from 'react-toggle'
import './ThemeToggle.css';
import sun from '../../../assets/sun.png';
import moon from '../../../assets/moon.png';

type Theme = 'light' | 'dark'

declare global {
  interface Window {
    __theme: Theme;
    __setPreferredTheme: (theme: Theme) => void
    __onThemeChange: () => void
  }
}
type Props = {
  className?: string
}
const ThemeToggle: React.FC<Props> = ({ className }) => {
  const initialTheme = typeof window !== 'undefined' ? window.__theme : 'light'
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    window.__onThemeChange = () => {
      setTheme(window.__theme)
    }
  })

  const toggleTheme = (theme: Theme) => {
    window.__setPreferredTheme(theme)
  }

  return (
    <Toggle
      id='theme-status'
      className={className}
      icons={{
        checked: (
          <img
            src={sun}
            width="16"
            height="16"
            role="presentation"
            style={{ pointerEvents: 'none' }}
          />
        ),
        unchecked: (
          <img
            src={moon}
            width="16"
            height="16"
            role="presentation"
            style={{ pointerEvents: 'none' }}
          />
        ),
      }}
      defaultChecked={theme === 'light'}
      onChange={e => toggleTheme(e.target.checked ? 'light' : 'dark')} />
  )
}

export default ThemeToggle
