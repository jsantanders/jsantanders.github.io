import React, { useState, useEffect } from "react"
import "./style.scss"

type Theme = 'light' | 'dark'

declare global {
  interface Window {
    __theme: Theme;
    __setPreferredTheme: (theme : Theme) => void
    __onThemeChange: () => void
  }
}

// Adapted from: https://codepen.io/aaroniker/pen/KGpXZo 
const ThemeToggle : React.FC = () =>{
  const initialTheme =  typeof window !== 'undefined' ? window.__theme : 'light'
  const [theme, setTheme] = useState<Theme>(initialTheme) 
  
  useEffect(() => {
    window.__onThemeChange = () => {
      setTheme(window.__theme)
    }
  })

  const toggleTheme = (theme : Theme) => {
    window.__setPreferredTheme(theme)
  }
  
  return (
      <label className="dayNight">
          <input
           type="checkbox"
           onChange={e => toggleTheme(e.target.checked ? 'light' : 'dark')}
           checked={theme === 'light'} 
          />
          <div></div>
      </label>
  )
}
export default ThemeToggle
