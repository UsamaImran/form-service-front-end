import { createContext, useState } from 'react'

const IndexViewContext = createContext()

const IndexViewProvider = ({ children }) => {
  const [index, setIndex] = useState(null)
  const [open, setOpen] = useState(true)

  const handleClick = (index) => {
    setOpen(!open)
    setIndex(index)
  }
  
  return (
    <IndexViewContext.Provider
      value={{
        index,
        open,
        handleClick,
      }}
    >
      {children}
    </IndexViewContext.Provider>
  )
}

export { IndexViewContext, IndexViewProvider }
