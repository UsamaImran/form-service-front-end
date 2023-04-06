import React from 'react'

interface ToggleMenuProps {
  className?: string
}

export default function ToggleMenu(props: ToggleMenuProps) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4 24H28V21.3333H4V24ZM4 17.3333H28V14.6667H4V17.3333ZM4 8V10.6667H28V8H4Z" fill="#8C8C8C" />
    </svg>
  )
}
