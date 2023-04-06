import React, { MouseEventHandler, useState, useEffect, ReactElement } from 'react'
import { Chip as ChipMui } from '@mui/material'
import Stack from '@mui/material/Stack'
import ChipStyles from './Chip.module.scss'

interface IChipsProps {
  chipArray: Array<string> | []
  showPaginatedData?: boolean
  handleDeleteTag?: (deletedIndex: number, tableRowId: string) => void
  remaining?: any
  style?: React.CSSProperties
}

const Chips: React.FC<IChipsProps> = ({
  chipArray = [],
  showPaginatedData = true,
  handleDeleteTag,
  remaining,
  style,
}: IChipsProps): ReactElement => {
  const [data, setData] = useState<Array<string>>(chipArray)
  const [paginatedData, setPaginatedData] = useState<Array<string>>([])
  const [remainingData, setRemainingData] = useState<Array<string>>([])

  const [allTags, showAllTags] = useState(false)

  useEffect(() => setData(chipArray), [chipArray.length, chipArray])

  useEffect(() => {
    if (showPaginatedData) {
      setPaginatedData([...data?.slice(0, 2)])
      setRemainingData([...data?.slice(2, data.length)])
    } else {
      setPaginatedData([...data])
    }
  }, [data, data.length])

  const handleDelete = (index: number): void => {
    if (handleDeleteTag) handleDeleteTag(index, remaining?.id || null)
  }

  const handleShowRemainingTags: MouseEventHandler = (e) => {
    if (e.type == 'mouseenter') {
      showAllTags(true)
    } else {
      showAllTags(false)
    }
  }
  const getChipsStyle = () => (style ? { ...style } : undefined)
  return (
    <Stack direction="row" spacing={1}>
      <div
        className={[!showPaginatedData ? ChipStyles['flex-wrap'] : '', ChipStyles['container']].join(' ')}
        style={getChipsStyle()}
      >
        {paginatedData.map((item, index) => (
          <div style={{ margin: '5px 5px' }} key={`chip_${item}_${Math.random()}`}>
            <ChipMui
              className={ChipStyles['overflow-ellipsis']}
              style={{ borderRadius: '4px', padding: '4px' }}
              label={item}
              onDelete={() => handleDelete(index)}
              deleteIcon={<p style={{ fontSize: '18px' }}>x</p>}
            />
          </div>
        ))}
        {data.length > 2 && showPaginatedData ? (
          <div>
            <div
              className={ChipStyles['container__visibleTags']}
              onMouseEnter={handleShowRemainingTags}
              onMouseLeave={handleShowRemainingTags}
            >
              +{data.length - paginatedData.length}
            </div>
            {allTags ? (
              <div
                onMouseEnter={handleShowRemainingTags}
                onMouseLeave={handleShowRemainingTags}
                className={ChipStyles['container__remainingTags']}
              >
                {remainingData.map((item, index) => (
                  <div key={`chip${item}_${Math.random()}`}>
                    <ChipMui
                      style={{ borderRadius: '4px' }}
                      label={item}
                      onDelete={() => handleDelete(index + 2)}
                      deleteIcon={<p style={{ fontSize: '18px' }}>x</p>}
                    />
                  </div>
                ))}
              </div>
            ) : (
              ''
            )}
          </div>
        ) : null}
      </div>
    </Stack>
  )
}
export default Chips
