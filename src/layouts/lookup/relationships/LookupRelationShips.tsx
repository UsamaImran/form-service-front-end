import Add from '@mui/icons-material/Add'
import { Button } from '@mui/material'
import React from 'react'
import HeaderMenus from '../../../components/dataGrid/headerMenus/HeaderMenus'
import { LOOK_UP_RELATIONSHIP_TYPE } from '../../../constants/constants'
import { IMenuOption } from '../../../graphql/types/ApiTypes'
import styles from '../LookupIndex.module.scss'
import ParentChildTree from './ParentChildTree'
import RelationshipMappingModal from './RelationshipMappingModal'

const menus: IMenuOption[] = [
  {
    id: 1,
    label: 'Add Parent',
    type: LOOK_UP_RELATIONSHIP_TYPE.PARENT,
    logo: '',
  },
  {
    id: 2,
    label: 'Add Child',
    type: LOOK_UP_RELATIONSHIP_TYPE.CHILD,
    logo: '',
  },
]

const menuIcon = <Button startIcon={<Add />}>Add Relationship</Button>
function LookupRelationShips() {
  const [showModal, setShowModal] = React.useState(false)
  const [relationshipType, setRelationshipType] = React.useState('')
  const handleModal = (type: string) => {
    setRelationshipType(type)
    setShowModal(true)
  }

  const getRelationshipBody = () => {
    return (
      <div>
        <ParentChildTree />
      </div>
    )
  }

  return (
    <div className={styles['relationship-container']}>
      <span className={styles['relationship-header']}>
        <span className={styles['relationship-heading']}>Relationships with other lookups</span>
        <HeaderMenus menuIcon={menuIcon} menus={menus} handleModal={handleModal} />
      </span>
      {showModal && <RelationshipMappingModal handleClose={setShowModal} type={relationshipType} />}
      {getRelationshipBody()}
    </div>
  )
}

export default LookupRelationShips
