import React from 'react'
import { GridColumnHeaderParams } from '@mui/x-data-grid'
import styles from './CustomHeader.module.scss'
import { SORTING_TYPE } from '../../../constants/constants'
import { IForm } from '../../../graphql/types/ApiTypes'
import SortingMenu from './SortingMenus'
import FilterMenu from './FilterMenu'
interface ICustomHeader {
  params: GridColumnHeaderParams
  data: IForm[]

  setData: React.Dispatch<React.SetStateAction<IForm[]>>
  setFilter: React.Dispatch<React.SetStateAction<boolean>>
}

const CustomHeader: React.FC<ICustomHeader> = ({ params, data, setData, setFilter }) => {
  const { colDef, field } = params

  const [isHover, setIsHover] = React.useState(false)
  const [sortingType, setSortingType] = React.useState('')
  const [dataState, setDataState] = React.useState([...data])
  const [filterEnabled, setFilterEnabled] = React.useState(false)

  React.useEffect(() => {
    setDataState([...data])
  }, [data])

  const allKeys = Object.keys(data[0] || [''])
  const key = allKeys.includes(field) ? field : 'name'
  const keyValues = data.map((item: any) => item[key])

  const handleSorting = (type: string) => {
    setSortingType(type)

    setFilter(true)

    setData((prevState: IForm[]) => {
      const prev = [...prevState]
      prev.sort((a: any, b: any) =>
        type === SORTING_TYPE.ASC
          ? a[key].toLowerCase().trim().localeCompare(b[key].toLowerCase().trim())
          : b[key].toLowerCase().trim().localeCompare(a[key].toLowerCase().trim()),
      )
      return [...prev]
    })
  }

  const handleFilter = (indexes: number[], filter: boolean) => {
    setFilter(filter)

    setFilterEnabled(indexes.length > 0 ? true : false)

    if (filter) {
      setData(() => {
        return dataState.filter((_, idx) => indexes.includes(idx))
      })
    } else {
      setData([...dataState])
    }
  }

  const getSortImage = () => {
    const isDSC = sortingType === SORTING_TYPE.DSC
    const src = '/images/arrow_down.svg'
    const rotate = isDSC ? 'rotate(0deg)' : 'rotate(180deg)'
    return <>{sortingType && <img src={src} style={{ transform: rotate }} height={13} />} </>
  }

  const getFilterImage = () => filterEnabled && <img src="/images/filterEnable.svg" />

  return (
    <div
      className={styles['header-container']}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <span>{colDef.headerName}</span> &nbsp; {getSortImage()} &nbsp; {getFilterImage()}
      {isHover && <SortingMenu handleSorting={handleSorting} />}
      {isHover && <FilterMenu data={keyValues} handleFilter={handleFilter} />}
    </div>
  )
}

export default CustomHeader
