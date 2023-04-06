import React from 'react'
import { Avatar } from '@mui/material'

interface ITableColumnProps {
  id: string
  name: string
  menu: string
  sub_menu: string
  last_edited: string
  avatar: JSX.Element
  tags: Array<string>
}

export const TableColumn: Array<ITableColumnProps> = [
  {
    id: '1',
    name: 'Text',
    menu: 'Basic Elements',
    sub_menu: 'Basic Elements',
    last_edited: '30/06/2020',
    avatar: <Avatar key="avatar" />,
    tags: ['Tag', 'HR', 'Tag1', 'NGN42', 'Tag2'],
  },
  {
    id: '2',
    name: 'Tab',
    menu: 'Tab Elements',
    sub_menu: 'Tab Elements',
    last_edited: '20/06/2020',
    avatar: <Avatar key="avatar" />,
    tags: ['Tag', 'HR', 'Tag1'],
  },
  {
    id: '3',
    name: 'Element',
    menu: 'Elements',
    sub_menu: 'Sub Elements',
    last_edited: '10/06/2020',
    avatar: <Avatar key="avatar" />,
    tags: ['Tag', 'HR'],
  },
]
