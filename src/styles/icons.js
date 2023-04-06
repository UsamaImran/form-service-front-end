/*
 *import:  import {iconName} from 'styles/icons'
 * Add icon to file:
 * update [groupName]Icons array
 * update [groupName]Names array
 * Add Group:
 * create [groupName]Icons array
 * create [groupName]Names array
 * add the group name, the icons and name array to the 'obj' object at the end of the file
 */

//* General
import CalendarIcon from '@mui/icons-material/CalendarTodayOutlined'
import ClockIcon from '@mui/icons-material/AccessTimeOutlined'
import FilterIcon from '@mui/icons-material/FilterAltOutlined'
import GroupIcon from '@mui/icons-material/GroupOutlined'
import TagsIcon from '@mui/icons-material/LocalOfferOutlined'
import LoginIcon from '@mui/icons-material/LoginOutlined'
import LogoutIcon from '@mui/icons-material/LogoutOutlined'
import MenuIcon from '@mui/icons-material/MenuOutlined'
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined'
import SearchIcon from '@mui/icons-material/SearchOutlined'
import SettingsIcon from '@mui/icons-material/SettingsOutlined'
import UserIcon from '@mui/icons-material/PersonOutlined'
import UserOffIcon from '@mui/icons-material/PersonOffOutlined'
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOffOutlined'

const generalIcons = [
  CalendarIcon,
  ClockIcon,
  FilterIcon,
  GroupIcon,
  TagsIcon,
  SettingsIcon,
  LoginIcon,
  LogoutIcon,
  MenuIcon,
  NotificationsIcon,
  SearchIcon,
  UserIcon,
  UserOffIcon,
  VisibilityIcon,
  VisibilityOffIcon,
]

const generalNames = [
  'CalendarIcon',
  'ClockIcon',
  'FilterIcon',
  'GroupIcon',
  'TagsIcon',
  'SettingsIcon',
  'LoginIcon',
  'LogoutIcon',
  'MenuIcon',
  'NotificationsIcon',
  'SearchIcon',
  'UserIcon',
  'UserOffIcon',
  'VisibilityIcon',
  'VisibilityOffIcon',
]

//* Actions
import CloseIcon from '@mui/icons-material/CloseOutlined'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import DragIcon from '@mui/icons-material/DragIndicatorOutlined'
import DuplicateIcon from '@mui/icons-material/ContentCopyOutlined'
import DoneIcon from '@mui/icons-material/CheckOutlined'
import EditIcon from '@mui/icons-material/EditOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVertOutlined'
import PlusIcon from '@mui/icons-material/AddOutlined'
import SaveIcon from '@mui/icons-material/SaveOutlined'
import OpenInNewIcon from '@mui/icons-material/OpenInNewOutlined'
import PlayIcon from '@mui/icons-material/PlayArrowOutlined'
import PrintIcon from '@mui/icons-material/PrintOutlined'
import RemoveIcon from '@mui/icons-material/RemoveOutlined'
import ShareIcon from '@mui/icons-material/ShareOutlined'

const actionIcons = [
  CloseIcon,
  DeleteIcon,
  DragIcon,
  DuplicateIcon,
  DoneIcon,
  EditIcon,
  MoreVertIcon,
  PlusIcon,
  SaveIcon,
  OpenInNewIcon,
  PlayIcon,
  PrintIcon,
  RemoveIcon,
  ShareIcon,
]

const actionNames = [
  'CloseIcon',
  'DeleteIcon',
  'DragIcon',
  'DuplicateIcon',
  'DoneIcon',
  'EditIcon',
  'MoreVertIcon',
  'PlusIcon',
  'SaveIcon',
  'OpenInNewIcon',
  'PlayIcon',
  'PrintIcon',
  'RemoveIcon',
  'ShareIcon',
]

//* Arrows
import ArrowRightIcon from '@mui/icons-material/ArrowForwardOutlined'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeftOutlined'
import ChevronRightIcon from '@mui/icons-material/ChevronRightOutlined'
import ExpandLessIcon from '@mui/icons-material/ExpandLessOutlined'
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreOutlined'
import SortIcon from '@mui/icons-material/SwapVertOutlined'
const arrowsIcons = [ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, ExpandLessIcon, ExpandMoreIcon, SortIcon]
const arrowsNames = [
  'ArrowRightIcon',
  'ChevronLeftIcon',
  'ChevronRightIcon',
  'ExpandLessIcon',
  'ExpandMoreIcon',
  'SortIcon',
]

//* Security
import KeyIcon from '@mui/icons-material/VpnKeyOutlined'
import LockOpenIcon from '@mui/icons-material/LockOpenOutlined'
import LockIcon from '@mui/icons-material/LockOutlined'
const securityIcons = [KeyIcon, LockOpenIcon, LockIcon]
const securityNames = [KeyIcon, LockOpenIcon, LockIcon]

//* Files and Folders
import ArticleIcon from '@mui/icons-material/ArticleOutlined'
import AttachFileIcon from '@mui/icons-material/AttachFileOutlined'
import DescriptionIcon from '@mui/icons-material/DescriptionOutlined'
import FolderMoveIcon from '@mui/icons-material/DriveFileMoveOutlined'
import FileDownloadIcon from '@mui/icons-material/FileDownloadOutlined'
import FileUploadIcon from '@mui/icons-material/FileUploadOutlined'
import FolderIcon from '@mui/icons-material/FolderOutlined'
import LinkIcon from '@mui/icons-material/LinkOutlined'

const filesAndFoldersIcons = [
  ArticleIcon,
  AttachFileIcon,
  DescriptionIcon,
  FolderMoveIcon,
  FileDownloadIcon,
  FileUploadIcon,
  FolderIcon,
  LinkIcon,
]
const filesAndFoldersNames = [
  'ArticleIcon',
  'AttachFileIcon',
  'DescriptionIcon',
  'FolderMoveIcon',
  'FileDownloadIcon',
  'FileUploadIcon',
  'FolderIcon',
  'LinkIcon',
]

//* Communication
import ChatBubbleIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import MailIcon from '@mui/icons-material/MailOutlined'
import PhoneIcon from '@mui/icons-material/PhoneOutlined'
const communicationIcons = [ChatBubbleIcon, ChatOutlinedIcon, MailIcon, PhoneIcon]
const communicationNames = ['ChatBubbleIcon', 'ChatOutlinedIcon', 'MailIcon', 'PhoneIcon']

//* Layout and Tables
import BuildingBlockIcon from '@mui/icons-material/Crop169Outlined'
import ColumnsIcon from '@mui/icons-material/ViewWeekOutlined'
import DashboardIcon from '@mui/icons-material/DashboardOutlined'
import TableChartIcon from '@mui/icons-material/TableChartOutlined'
import PivotTableIcon from '@mui/icons-material/PivotTableChartOutlined'
const layoutAndTablesIcons = [BuildingBlockIcon, ColumnsIcon, DashboardIcon, TableChartIcon, PivotTableIcon]
const layoutAndTablesNames = ['BuildingBlockIcon', 'ColumnsIcon', 'DashboardIcon', 'TableChartIcon', 'PivotTableIcon']

//* Signals
import HelpIcon from '@mui/icons-material/HelpOutlineOutlined'
import InfoIcon from '@mui/icons-material/InfoOutlined'
import WarningIcon from '@mui/icons-material/WarningAmberOutlined'
const signalsIcons = [HelpIcon, InfoIcon, WarningIcon]
const signalsNames = ['HelpIcon', 'InfoIcon', 'WarningIcon']

//* Multimedia
import MovieIcon from '@mui/icons-material/MovieOutlined'
import VideocamIcon from '@mui/icons-material/VideocamOutlined'
const multimediaIcons = [MovieIcon, VideocamIcon]
const multimediaNames = ['MovieIcon', 'VideocamIcon']

//* Company Departments
import AccountBalanceIcon from '@mui/icons-material/AccountBalanceOutlined'
const companyDepartmentsIcons = [AccountBalanceIcon]
const companyDepartmentsNames = ['AccountBalanceIcon']

//* Emoji
import VerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined'
import VeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined'
import NeutralIcon from '@mui/icons-material/SentimentNeutralOutlined'
import SatisfiedIcon from '@mui/icons-material/SentimentSatisfiedOutlined'
import DissatisfiedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined'

const emojiIcons = [VerySatisfiedIcon, VeryDissatisfiedIcon, NeutralIcon, SatisfiedIcon, DissatisfiedIcon]
const emojiNames = ['VerySatisfiedIcon', 'VeryDissatisfiedIcon', 'NeutralIcon', 'SatisfiedIcon', 'DissatisfiedIcon']

//* Others
import AccountTreeIcon from '@mui/icons-material/AccountTreeOutlined'
import BuildIcon from '@mui/icons-material/BuildOutlined'
import CategoryIcon from '@mui/icons-material/CategoryOutlined'
import CelebrationIcon from '@mui/icons-material/CelebrationOutlined'
import CodeIcon from '@mui/icons-material/CodeOutlined'
import StarIcon from '@mui/icons-material/StarOutlined'
import StarEmptyIcon from '@mui/icons-material/StarOutlineOutlined'
import StarHalfIcon from '@mui/icons-material/StarHalfOutlined'
import FunctionIcon from '@mui/icons-material/FunctionsOutlined'
// import NumbersIcon from '@mui/icons-material/NumbersOutlined'
import ThumbUpIcon from '@mui/icons-material/ThumbUpAltOutlined'
import { tableBodyClasses } from '@mui/material'

const othersIcons = [
  AccountTreeIcon,
  BuildIcon,
  CategoryIcon,
  CelebrationIcon,
  CodeIcon,
  StarIcon,
  StarEmptyIcon,
  StarHalfIcon,
  FunctionIcon,
  ThumbUpIcon,
]
const othersNames = [
  'AccountTreeIcon',
  'BuildIcon',
  'CategoryIcon',
  'CelebrationIcon',
  'CodeIcon',
  'StarIcon',
  'StarEmptyIcon',
  'StarHalfIcon',
  'FunctionIcon',
  'ThumbUpIcon',
]

const obj = {
  icons: [
    generalIcons,
    actionIcons,
    arrowsIcons,
    securityIcons,
    communicationIcons,
    filesAndFoldersIcons,
    layoutAndTablesIcons,
    signalsIcons,
    multimediaIcons,
    companyDepartmentsIcons,
    emojiIcons,
    othersIcons,
  ],
  names: [
    generalNames,
    actionNames,
    arrowsNames,
    securityNames,
    communicationNames,
    filesAndFoldersNames,
    layoutAndTablesNames,
    signalsNames,
    multimediaNames,
    companyDepartmentsNames,
    emojiNames,
    othersNames,
  ],

  groups: [
    'General',
    'Actions',
    'Arrows',
    'Security',
    'Communication',
    'File and Folders',
    'Layout and table',
    'Signals',
    'Multimedia',
    'Company  Departments',
    'Emoji',
    'Others',
  ],
}

export { obj }
