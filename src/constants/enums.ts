export enum ButtonTypes {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
}

export enum ButtonIconDirection {
  LEFT = 'left',
  RIGHT = 'right',
}

export enum EventTypes {
  MOUSE_LEAVE = 'mouseleave',
}

export enum PopupAction {
  CLOSE = 'close',
  CONFIRM = 'confirm',
}

export enum ActionType {
  ADD_REMOVE_TAGS = 'Add/Remove Tags',
  ADD_REMOVE_PERMISSIONS = 'Add/Remove Permissions',
  EDIT = 'Edit',
  DUPLICATE = 'Duplicate',
  DELETE = 'Delete',
  Table = 'Table Icon',
  Setting = 'Setting',
  Log = 'Log',
}

export enum ErrorsStatusCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  ACCESS_FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNSUPPORTED_MEDIA_TYPE = 415,
  INTERNAL_SERVER_ERROR = 500,
  PAGE_UNAVAILABLE = 503,
  SERVER_ERROR = 504,
  INFINITED_LOOP = 508,
}

// export enum ActionType {
//   ADD_REMOVE_TAGS_MODAL_TYPE = 'Add/Remove_Tags_Modals',
//   ADD_REMOVE_PERMISSIONS_MODAL_TYPE = 'Add/Remove Permissions_Modals',
//   EDIT_MODAL_TYPE = 'Edit_Modals',
//   DUPLICATE_MODAL_TYPE = 'Duplicate_Modals',
//   DELETE_MODAL_TYPE = 'Delete_Modals',
// }
