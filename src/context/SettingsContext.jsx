import { createContext, useContext, useState, useEffect } from 'react'

const SettingsContext = createContext()

const DEFAULTS = { theme: 'Dark', language: 'English', timezone: 'CST' }

function resolveTheme(theme) {
  if (theme === 'System') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return theme.toLowerCase()
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('taskme_settings')
      return saved ? JSON.parse(saved) : DEFAULTS
    } catch {
      return DEFAULTS
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', resolveTheme(settings.theme))
  }, [settings.theme])

  // Apply on first mount
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', resolveTheme(settings.theme))
  }, [])

  const saveSettings = (newSettings) => {
    setSettings(newSettings)
    localStorage.setItem('taskme_settings', JSON.stringify(newSettings))
  }

  return (
    <SettingsContext.Provider value={{ settings, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  return useContext(SettingsContext)
}
