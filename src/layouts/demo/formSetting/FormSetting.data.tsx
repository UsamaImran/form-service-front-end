import { makeStyles } from '@mui/styles'
import { PRIMARY_BLACK } from '../../../constants/color'
import { IForm } from '../../../graphql/types/ApiTypes'
import { PermissionType } from '../../../graphql/types/graphql-global-types'

export const AvailableColumnData = [
  {
    name: 'name',
    defaultLabel: 'Name',
    label: 'Name',
    hidden: true,
    maxWidth: '170px',
  },
  {
    name: 'menu',
    defaultLabel: 'Menu',
    label: 'Menu',
    hidden: true,
    maxWidth: 'auto',
  },
  {
    name: 'submenu',
    defaultLabel: 'Sub Menu',
    label: 'Sub Menu',
    hidden: false,
    maxWidth: 'auto',
  },
  {
    name: 'lastEdited',
    defaultLabel: 'Last Edited',
    label: 'Last Edited',
    hidden: false,
    maxWidth: 'auto',
  },
  {
    name: 'editedBy',
    defaultLabel: 'Edited By',
    label: 'Edited By',
    hidden: false,
    maxWidth: 'auto',
  },
  {
    name: 'tags',
    defaultLabel: 'Tags',
    label: 'Tags',
    hidden: false,
    maxWidth: 'auto',
  },
  {
    name: 'createdBy',
    defaultLabel: 'Created By',
    label: 'Created By',
    hidden: true,
    maxWidth: 'auto',
  },
  {
    name: 'createdDate',
    defaultLabel: 'Created Date',
    label: 'Created Date',
    hidden: true,
    maxWidth: 'auto',
  },
  {
    name: 'name',
    defaultLabel: 'Name',
    label: 'Name',
    hidden: false,
    maxWidth: 'auto',
  },
]

export const PermissionModalData: IForm[] = [
  {
    id: '61b6f901ecbf2275f07111bb',
    name: 'New Form 5',
    menu: 'menu',
    subMenu: 'Sub Menu',
    tags: ['1'],
    canDuplicate: true,
    canView: true,
    lastEdited: '2021-12-13T07:40:49.823Z',
    createdDate: '2021-12-13T07:40:49.823Z',
    createdBy: {
      __typename: 'User',
      email: 'bilal@gmail.com',
      username: 'bilal@gmail.com',
      avatar:
        'https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png',
    },
    permission: [
      {
        __typename: 'FormPermission',
        access: PermissionType.owner,
        user: {
          __typename: 'User',
          _id: '61a9fd547070280009873364',
          username: 'bilal@gmail.com',
          avatar:
            'https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png',
          email: 'bilal@gmail.com',
        },
      },
    ],
  },
  {
    id: '61b6f902ecbf2275f07111bd',
    name: 'New Form 5',
    menu: 'menu',
    subMenu: 'Sub Menu',
    tags: [],
    canDuplicate: true,
    canView: true,
    lastEdited: '2021-12-13T07:40:50.719Z',
    createdDate: '2021-12-13T07:40:50.719Z',
    createdBy: {
      __typename: 'User',
      email: 'bilal@gmail.com',
      username: 'bilal@gmail.com',
      avatar:
        'https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png',
    },
    permission: [
      {
        __typename: 'FormPermission',
        access: PermissionType.owner,
        user: {
          __typename: 'User',
          _id: '61a9fd547070280009873364',
          username: 'bilal@gmail.com',
          avatar:
            'https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png',
          email: 'bilal@gmail.com',
        },
      },
    ],
  },
]

export const FormSettingStyles = makeStyles(() => ({
  root: {
    '& .MuiPaper-root': {
      height: '890px',
      maxHeight: '890px',
      width: '720px',
      margin: 0,
    },
    '& .css-ypiqx9-MuiDialogContent-root': {
      padding: 0,
      overflowX: 'hidden',
    },
    '& .MuiSelect-root': {},
    '& .Mui-selected': {
      color: `${PRIMARY_BLACK} !important`,
      fontWeight: 500,
      fontSize: '14px',
      fontFamily: 'Open Sans',
    },
    '& .MuiSelect-select': {
      padding: '8.5px 10px !important',
    },
    '& .css-19kzrtu': {
      padding: '24px 1px 0 1px',
    },
    '& .MuiDialogTitle-root': {
      padding: '32px 32px 0px 32px',
    },
    '& .MuiTabs-flexContainer .MuiButtonBase-root': {
      padding: '0 8px',
      minHeight: 'unset',
      textTransform: 'none',
      '&:not(:last-child)': {
        marginRight: '8px',
      },
    },
    '& .MuiTabs-indicator': {
      width: '130px',
    },
    '& .Accordion_container .MuiPaper-root': {
      height: 'auto',
      width: '100%',
      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
      padding: 0,
      overflow: 'hidden',
    },
    '& .Accordion_container .MuiPaper-root:not(:first-child)': {
      marginTop: '1px',
    },
    '& .Accordion_container .MuiPaper-root .MuiPaper-root': {
      borderColor: 'primary',
      height: '100%',
      width: '100%',
      boxShadow: 'none',
    },
    '& .css-o4b71y-MuiAccordionSummary-content': {
      margin: 0,
      '& .MuiTypography-root': {
        color: `${PRIMARY_BLACK}`,
        fontFamily: 'Open sans',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '16px',
      },
    },
    '& .MuiAccordionSummary-expandIconWrapper': {
      marginRight: '8px',
    },
    '& .css-15v22id-MuiAccordionDetails-root': {
      padding: '0',
    },
    '& .MuiTableCell-root': {},
    '& .PermissionModal--container__ButtonContainer--position': {
      position: 'absolute',
      bottom: '20px',
      right: '32px',
    },
    '& .Accordion_container .RowAction--container .MuiPaper-root ': {
      width: '461px',
      height: '319px',
      boxShadow: 'none',
      overflow: 'hidden',
    },
    '& .Accordion_container .RowAction--container .MuiTableCell-root': {
      padding: '12px !important',
    },
    '& .RowAction--container .css-41abqd-MuiTableContainer-root': {
      overflow: 'hidden',
    },
    '& .AvailableColumn_container .MuiButton-root': {
      padding: '12px 0',
    },
  },
}))

export interface IBaseLevelProps {
  label: string
  children?: Array<IBaseLevelProps>
  iId?: number
  cId?: number
  path?: string
}

export interface INestedDropdownDataProps {
  label: string
  children?: Array<IBaseLevelProps>
  mId?: number
}

export const DropdownData: Array<INestedDropdownDataProps> = [
  {
    label: 'MY FAVORITES',
    children: [
      {
        label: 'Daily Input',
        children: [],
        iId: 11,
        path: '',
      },
      {
        label: 'Month Summary report',
        children: [],
        iId: 12,
        path: '',
      },
      {
        label: 'Form Canvas',
        children: [],
        iId: 13,
        path: '',
      },
    ],
    mId: 1,
  },
  {
    label: 'STRATEGY',
    children: [
      {
        label: 'Reports',
        children: [
          {
            label: 'Reports Index',
            children: [],
            iId: 211,
            path: '',
          },
          {
            label: 'Report Creator',
            children: [],
            iId: 212,
            path: '',
          },
        ],
        iId: 21,
        path: '',
      },
      {
        label: 'Dashboard',
        children: [],
        iId: 22,
        path: '',
      },
      {
        label: 'Smart Insights',
        children: [],
        iId: 23,
        path: '',
      },
    ],
    mId: 2,
  },
  {
    label: 'FINANCE',
    children: [],
    mId: 3,
  },
  {
    label: 'OPERATIONS',
    children: [],
    mId: 4,
  },
  {
    label: 'HR',
    children: [],
    mId: 5,
  },
  {
    label: 'PROCUREMENT',
    children: [],
    mId: 6,
  },
  {
    label: 'WIKI',
    children: [
      {
        label: 'HR',
        children: [],
        cId: 5,
      },
      {
        label: 'PROCUREMENT',
        children: [],
        cId: 6,
      },
      {
        label: 'WIKI',
        children: [],
        cId: 7,
      },
    ],
    mId: 7,
  },
]
