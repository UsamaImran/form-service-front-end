import * as React from 'react'
import { TreeItem, TreeView } from '@mui/lab'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useLookupContext } from '../../context/lookupContext/LookupContainer'
import { ILookup } from '../../context/lookupContext/LookupInterface'
import { useRouter } from 'next/router'
import styles from './TreeView.module.scss'
import { Tooltip } from '@mui/material'
import { nanoid } from 'nanoid'
export default function MultiSelectTreeView() {
  const { lookups, getLookupById, getLookupIndexById } = useLookupContext()
  const [currentLookup, setCurrentLookup] = React.useState<ILookup | undefined>(undefined)
  const [childs, setChilds] = React.useState<ILookup[]>([])
  const [parents, setParents] = React.useState<ILookup[]>([])
  const [parentHoverIndex, setParentHoverIndex] = React.useState(-1)
  const [childHoverIndex, setChildHoverIndex] = React.useState(-1)
  const router = useRouter()

  React.useEffect(() => {
    getCurrentLookup()
  }, [lookups, router])

  React.useEffect(() => {
    getChilds()
    getParents()
  }, [currentLookup, lookups])

  const getCurrentLookup = () => {
    const current = getLookupById(router.query.id as string)
    setCurrentLookup(current)
  }

  const getChilds = () => {
    const childsIds = currentLookup?.childs.map((child) => child)
    const set = new Set(childsIds)
    const allChilds = Array.from(set).map((child) => getLookupById(child as string)) as ILookup[]

    setChilds(allChilds)
  }

  const getParents = () => {
    const parentsIds = currentLookup?.parents.map((current) => current)
    const set = new Set(parentsIds)
    const allParents = Array.from(set)?.map((parent) => getLookupById(parent as string)) as ILookup[]

    setParents(allParents)
  }

  return (
    <>
      {!parents?.length && !childs?.length && (
        <small className={styles['note']}>This list has no relatopnships yet</small>
      )}
      <TreeView
        aria-label="multi-select"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        multiSelect
        sx={{ height: 216, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      >
        {parents?.length > 0 && (
          <TreeItem nodeId="unique1" label="Parents">
            {parents?.map(
              (parent, index) =>
                parent?.id !== currentLookup?.id && (
                  <div
                    onMouseEnter={() => setParentHoverIndex(index)}
                    onMouseLeave={() => setParentHoverIndex(-1)}
                    className={styles['tree-item-container']}
                    key={index}
                  >
                    <TreeItem nodeId={index + ''} label={parent?.name || ''} />
                    {index === parentHoverIndex && (
                      <div>
                        <Tooltip title="Edit Relationship" placement="top" className="mr-1">
                          <img src="/images/edit_gray.svg" className={styles['actions']} />
                        </Tooltip>
                        <Tooltip title="Delete Relationship" placement="top">
                          <img src="/images/delete_black.svg" className={styles['actions']} />
                        </Tooltip>
                      </div>
                    )}
                  </div>
                ),
            )}
          </TreeItem>
        )}

        {childs?.length > 0 && (
          <TreeItem nodeId={'unique2'} label="Childs">
            {childs?.map(
              (child, index) =>
                child?.id !== currentLookup?.id && (
                  <div
                    className={styles['tree-item-container']}
                    onMouseEnter={() => setChildHoverIndex(index)}
                    onMouseLeave={() => setChildHoverIndex(-1)}
                    key={index}
                  >
                    <TreeItem nodeId={index + ''} label={child?.name || ''} />
                    {index === childHoverIndex && (
                      <div>
                        <Tooltip title="Edit Relationship" arrow placement="top" className="mr-1">
                          <img src="/images/edit_gray.svg" className={styles['actions']} />
                        </Tooltip>
                        <Tooltip title="Delete Relationship" placement="top">
                          <img src="/images/delete_black.svg" className={styles['actions']} />
                        </Tooltip>
                      </div>
                    )}
                  </div>
                ),
            )}
          </TreeItem>
        )}
      </TreeView>
    </>
  )
}
