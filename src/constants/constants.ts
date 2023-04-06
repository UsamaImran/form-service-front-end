export const TOKEN = 'AUTH_TOKEN'
export const USER_ID = 'USER_ID'
export const SidebarList = [
  {
    label: 'MY FAVOURITES',
    imgSrc: '/images/favourite.svg',
  },
  {
    label: 'STRATEGY',
    imgSrc: '/images/strategy.svg',
  },
  {
    label: 'FINANCE',
    imgSrc: '/images/finance.svg',
  },
  {
    label: 'OPERATIONS',
    imgSrc: '/images/operations.svg',
    submenu: [
      {
        menuHead: 'Operations-1',
        menu: [{ menuName: 'Operations-i' }, { menuName: 'Operations-ii' }, { menuName: 'Operations-iii' }],
      },
    ],
  },
  {
    label: 'HR',
    imgSrc: '/images/hr.svg',
  },
  {
    label: 'PROCUREMENT',
    imgSrc: '/images/procurement.svg',
    submenu: [
      {
        menuHead: 'Menu level-2',
        menu: [{ menuName: 'Menu level-31' }, { menuName: 'Menu level-32' }, { menuName: 'Menu level-33' }],
      },
      {
        menuHead: 'Menu level-21',
        menu: [{ menuName: 'Menu level-34' }, { menuName: 'Menu level-35' }, { menuName: 'Menu level-36' }],
      },
    ],
  },
  {
    label: 'WIKI',
    imgSrc: '/images/wiki.svg',
  },
  {
    label: 'SETTINGS',
    imgSrc: '/images/user_settings.svg',
  },
]

export const FormListColumns = [
  'Name',
  'Menu',
  'Sub Menu',
  'Last Edited',
  'Edited By',
  'Tags',
  'Created Date',
  'Created By',
]

export const FormSettingActions = ['name', 'db_name', 'menu', 'sub_menu', 'form_purpose', 'tags']

export const FILE_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`

export const ERROR_COLOR = '#d32f2f'

export const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/

export const USERNAME_REGEX = /^[a-zA-Z0-9]+$/
export const PHONE_REGEX = /^\d{11}$/
export const SPLIT_BY_LINE_REGEX = /\r?\n/
export const LOGO_TEXT = '"Out of complexity, find simplicity"'
export const WARNING_BACKGROUND_COLOR = '#E94545'
export const SORTING_TYPE = {
  ASC: 'ascending',
  DSC: 'descending',
}

export const LOOK_UP_RELATIONSHIP_TYPE = {
  PARENT: 'parent',
  CHILD: 'child',
}

export const LOOKUP_OPERATION = {
  ADD: 'add',
  EDIT: 'edit',
}

export const __TYPE_NAME = '___typename'

export const LOOKUP_VALUES_STATE = {
  CHANGE: 'change',
  NEW: 'new',
}
