import React, { ReactElement, useState, useEffect } from 'react'
import DataGridHeaderStyles from './DataGridHeader.module.scss'
import { GridSelectionModel } from '@mui/x-data-grid'

interface IDataGridSelectedHeaderProps {
  selectionModel: GridSelectionModel
  headerAction: IHeaderDataProps[]
}

interface IHeaderDataProps {
  label?: string
  icon?: string
  onClick: () => void
}

const DataGridSelectedHeader: React.FC<IDataGridSelectedHeaderProps> = ({
  headerAction = [],
  selectionModel,
}): ReactElement => {
  const [headerData, setHeaderData] = useState<IHeaderDataProps[]>([])
  useEffect(() => {
    setHeaderData([...headerAction])
  }, [headerAction])

  return (
    <div className={DataGridHeaderStyles['container']}>
      <div style={{ display: 'flex' }}>
        <div className={DataGridHeaderStyles['container--headerTitleContainer']}>
          <p className={DataGridHeaderStyles['container--headerTitleContainer--header']}>
            {selectionModel.length} selected
          </p>
        </div>
        <div className={DataGridHeaderStyles['container__triangle']}></div>
        {headerData.map(({ label, icon, onClick }: IHeaderDataProps) => (
          <div
            key={`${label}`}
            onClick={() => {
              onClick()
            }}
            role="button"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: '32px',
              cursor: 'pointer',
            }}
          >
            <img height={16} width={16} src={icon} style={{ marginRight: 4 }} />
            <p style={{ fontSize: '14px' }}>{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DataGridSelectedHeader
