import { Add, Save } from '@mui/icons-material'
import { Button } from '@mui/material'
import React, { Fragment, useState } from 'react'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import HeaderMenus from '../../components/dataGrid/headerMenus/HeaderMenus'
import LookupPageTable from '../../components/lookUpPageTable/LookupPageTable'
import { ActionType } from '../../constants/enums'
import { ILookup, IMenuOption } from '../../graphql/types/ApiTypes'
import { DEFAULT_BREADCRUMB_LIST } from '../../pages'
import styles from './LookupIndex.module.scss'
import { useRouter } from 'next/router'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import LookupSettingsModal from './lookupsIndex/LookupSettingsModal'
import ModifyLookup from './lookupsIndex/ModifyLookup'
import { ROUTE_LOOK_UP } from '../../constants/routes'
import { LOOKUP_VALUES_STATE, SPLIT_BY_LINE_REGEX } from '../../constants/constants'
import { ILookupValueExtended, useLookupContext } from '../../context/lookupContext/LookupContainer'
import { createLookupValues, updateLookupValue } from 'service/Lookup.services'
import { LookupValueInput, LookupValueUpdateInput } from 'graphql/types/graphql-global-types'

const BUTTON_TYPES = {
  CREATE: 'create',
  SAVE: 'save',
}

const menus: IMenuOption[] = [
  { id: 0, label: 'Logs', type: ActionType.Log, logo: '/images/log.svg' },
  { id: 1, label: 'Settings', logo: '/images/settingsIcon.svg', type: ActionType.Setting },
]

const Lookup: React.FC<{}> = () => {
  const {
    getLookupById,
    updateLookups,
    getLookupIndexById,
    lookups,
    lookupValues,
    getLookupValueIndexById,
    setLookupValues,
  } = useLookupContext()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [buttonType, setButtonType] = useState(BUTTON_TYPES.CREATE)
  const [displaySettingModal, setDisplaySettingModal] = useState(false)
  const [displayLogModal, setDispalyLogModal] = useState(false)
  const [lookupName, setLookupName] = React.useState('')
  const [tempLookup, setTempLookup] = React.useState<ILookup | undefined>(undefined)
  const [isSaved, setIsSaved] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    if (!router.query.id) {
      setIsOpen(false)
    }
  }, [router.query])

  const buttonClickHandler = (type: string) => {
    setButtonType(type)
    switch (type) {
      case BUTTON_TYPES.CREATE:
        handleCreate()
        break
      case BUTTON_TYPES.SAVE:
        handleSave()
        break
    }
  }

  const handleCreate = () => {
    // const id = nanoid()
    // const newLookup: ILookup = {
    //   name: lookupName,
    //   childs: [],
    //   parents: [],
    //   tags: [],
    //   id: id,
    //   description: '',
    //   isActive: true,
    //   last_edited: new Date().toISOString(),
    //   permissions: [],
    //   values: [],
    //   canDuplicate: false,
    //   canView: false,
    //   relationships: [],
    // }
    // setTempLookup({ ...newLookup })
    // updateLookups((prevState) => {
    //   const prev = [...prevState]
    //   prev.push(newLookup as ILookup)
    //   return prev
    // })
    // setIsOpen(true)
    // router.push(`${ROUTE_LOOK_UP}?id=${id}`)
  }
  const handleSave = () => {
    try {
      setLookupValues((prev) => {
        addValuesToDb(prev)
        updateValuesToDb(prev)
        return prev
      })
      setIsSaved(true)
    } catch (err) {
      console.log(err)
    }

    setIsOpen(false)

    console.log('handle Save')
  }

  const addValuesToDb = async (values: ILookupValueExtended[]) => {
    const payload: LookupValueInput[] = values
      .filter((value) => value.state !== LOOKUP_VALUES_STATE.CHANGE)
      .map((value: ILookupValueExtended) => ({
        name: value.name,
        isActive: value.isActive,
        icon: value.icon,
        order: value.order,
        lookupId: router.query.id as string,
      }))
    await createLookupValues({ input: [...payload] })
  }

  const updateValuesToDb = async (values: ILookupValueExtended[]) => {
    const payload: LookupValueUpdateInput[] = values
      .filter((value) => value.state !== LOOKUP_VALUES_STATE.NEW)
      .map((value: ILookupValueExtended) => ({
        id: value.id,
        name: value.name,
        isActive: value.isActive,
        icon: value.icon,
        order: value.order,
      }))

    await Promise.all(payload.map(async (current) => await updateLookupValue({ input: { ...current } })))
  }

  const goBackHandler = () => {
    if (!isSaved) {
      updateLookups((prevState) => {
        const prev = [...prevState]
        return prev.filter((lookup) => lookup.id !== (tempLookup?.id as string))
      })
    }
    setIsOpen(false)
    router.replace(ROUTE_LOOK_UP)
  }

  const getButton = () => {
    const title = isOpen ? 'Save' : 'New'
    const icon = isOpen ? <Save /> : <Add />
    const type = isOpen ? BUTTON_TYPES.SAVE : BUTTON_TYPES.CREATE
    const variant = !isOpen ? 'outlined' : 'contained'
    return (
      <Button
        className={'mt-2 mb-2 ml-2 buttonStyle'}
        variant={variant}
        color={'primary'}
        startIcon={icon}
        onClick={() => buttonClickHandler(type)}
      >
        {title}
      </Button>
    )
  }

  const getTitle = () => {
    const isQuery = router.query.id ? true : false
    const lookupName = getLookupById(router.query.id as string)?.name as string
    const title = isQuery ? lookupName : isOpen ? 'Untitled' : 'Lookups Index'
    const untitledColor = '#bfbfbf'
    return (
      <p
        contentEditable={isOpen}
        suppressContentEditableWarning={true}
        className="indexHeading"
        style={{ color: !isOpen || isQuery ? 'black' : untitledColor, display: 'flex' }}
        onInput={(e: any) => {
          const value = e.target.innerText
          const again = value.split(SPLIT_BY_LINE_REGEX).join('')
          console.log(again, 'dD')
        }}
      >
        {title}
      </p>
    )
  }

  const handleModal = (type: string) => {
    switch (type) {
      case ActionType.Log:
        setDispalyLogModal(true)
        break
      case ActionType.Setting:
        setDisplaySettingModal(true)
        break
      default:
        return
    }
  }

  return (
    <Fragment>
      <div className="content">
        <div className={styles['top-bar']}>
          <span>
            <Breadcrumb breadcrumbList={DEFAULT_BREADCRUMB_LIST} />
          </span>
          {isOpen && (
            <span
              className={styles['back-button']}
              onClick={() => {
                goBackHandler()
              }}
            >
              {'< Back'}
            </span>
          )}
        </div>
        <div className="indexHeadingContainer">
          {getTitle()}
          <span className={styles['options-container']}>
            {getButton()}
            <HeaderMenus menuIcon={<MoreVertIcon />} menus={menus} handleModal={handleModal} />
          </span>
        </div>

        {!isOpen && <LookupPageTable isOpen={isOpen} setIsOpen={setIsOpen} />}
        {isOpen && <ModifyLookup />}
      </div>
      {displaySettingModal && <LookupSettingsModal handleClose={setDisplaySettingModal} />}
    </Fragment>
  )
}

export default Lookup
