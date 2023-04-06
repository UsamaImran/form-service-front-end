import { createContext, useState } from 'react'

const NavContext = createContext()

const NavProvider = ({ children }) => {
  const [openA, setOpenA] = useState(false)
  const [openB, setOpenB] = useState(false)
  const [openC, setOpenC] = useState(false)
  const [index, setIndex] = useState(null)

  const handleClickA = (index) => {
    setOpenA(!openA)
    setIndex(index)
  }
  const handleClickB = (index) => {
    setOpenB(!openB)
    setIndex(index)
  }
  const handleClickC = () => {
    setOpenC(!openC)
  }
  return (
    <NavContext.Provider
      value={{
        openA,
        openB,
        openC,
        index,
        handleClickA,
        handleClickB,
        handleClickC,
      }}
    >
      {children}
    </NavContext.Provider>
  )
}

export { NavContext, NavProvider }
