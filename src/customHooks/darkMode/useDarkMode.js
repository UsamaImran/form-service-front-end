import { useEffect } from 'react'
import { useMediaQuery } from './useMediaQuery'
import { useLocalStorage } from './useLocalStorage'

function useDarkMode() {
  const [darkMode, setDarkMode] = useLocalStorage('useDarkMode')
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)') //use the user browser default settings
  const enabled = darkMode ?? prefersDarkMode

  useEffect(() => {
    document.body.classList.toggle('dark-mode', enabled)
  }, [enabled])

  return [enabled, setDarkMode]
}

export default useDarkMode
