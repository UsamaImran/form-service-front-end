import useDarkMode from './useDarkMode'
import './darkmode.css'

export default function DarkModeComponent() {
  const [darkMode, setDarkMode] = useDarkMode()

  return (
    <button
      onClick={() => setDarkMode((prevDarkMode) => !prevDarkMode)}
      style={{
        boarder: `1px solid ${darkMode ? 'white' : 'black'}`,
        background: 'none',
        color: darkMode ? 'whit' : 'black',
      }}
    >
      Toggle Dark Mode
    </button>
  )
}
