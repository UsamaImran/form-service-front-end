import React from 'react'
import { Box, Divider, IconButton } from '@mui/material'
import { Clear as ClearIcon, Search as SearchIcon } from '@mui/icons-material'
import TableSearchbar from '../../searchbar/TableSearchbar'
import styles from './QuickSearchbarToolbar.module.scss'
import { QuickSearchbarStyle } from './QuickSearchbar.style'
import { ActionType } from '../../../constants/enums'
import HeaderMenus from '../headerMenus/HeaderMenus'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IMenuOption } from '../../../graphql/types/ApiTypes'
interface IQuickSearchToolbarProps {
  clearSearch: () => void
  handleModal: (action: string) => void
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  value: string
  showModalIcons?: boolean
  placeholder?: string
  showMenu?: boolean
}

const menus: IMenuOption[] = [
  { id: 0, label: 'Logs', type: ActionType.Log, logo: '/images/log.svg' },
  { id: 1, label: 'Settings', logo: '/images/settingsIcon.svg', type: ActionType.Setting },
]

const QuickSearchToolbar = ({
  value,
  onChange,
  clearSearch,
  handleModal,
  showModalIcons = true,
  placeholder = 'Search...',
  showMenu = true,
}: IQuickSearchToolbarProps) => {
  return (
    <Box className={styles['QuickSearchbarTool--container']}>
      <TableSearchbar
        variant="outlined"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        InputProps={{
          className: styles['QuickSearchbarTool--container--input'],
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: value ? 'visible' : 'hidden' }}
              onClick={clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{ ...QuickSearchbarStyle }}
      />
      {showModalIcons && (
        <div className={styles['container__QuickSearchtoolbar--images']}>
          <Divider orientation="vertical" color="#bfbfbf" style={{ height: 27 }} />
          <img className={styles['icon']} height={13} width={19} src="/images/filter.svg" />
          <img
            className={styles['icon']}
            onClick={() => {
              if (handleModal) handleModal(ActionType.Table)
            }}
            height={18}
            width={19}
            src="/images/table_chart.svg"
          />
          {showMenu && <Divider orientation="vertical" color="#bfbfbf" style={{ height: 27 }} />}

          {showMenu && <HeaderMenus menuIcon={<MoreVertIcon />} menus={menus} handleModal={handleModal} />}
        </div>
      )}
    </Box>
  )
}
export default QuickSearchToolbar
