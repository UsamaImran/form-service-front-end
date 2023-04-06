import React from 'react'
import { LOOKUP_VALUES_STATE, __TYPE_NAME } from 'constants/constants'
import { ILookup, ILookupValue } from 'graphql/types/ApiTypes'
import { excludeField } from 'helpers/helpers'
import { fetchLookup, fetchLookupValue } from 'service/Lookup.services'
import { LookupContext, LookupProvider } from './LookupContext'
import { ILookupContext } from './LookupInterface'
export interface ILookupValueExtended extends ILookupValue {
  state: string
}
const LookupContainer: React.FC = ({ children }) => {
  const [lookups, updateLookups] = React.useState<ILookup[]>([])
  const [lookupValues, setLookupValues] = React.useState<ILookupValueExtended[]>([])
  const [lookupRelationships, setLookupRelationships] = React.useState([])

  const [tempLookupId, setTempLookupId] = React.useState('')

  React.useEffect(() => {
    getAllLookups()
  }, [])

  const getAllLookups = async () => {
    const allLookups = await fetchLookup({})
    const newState = allLookups.map((item: any) => excludeField(item, __TYPE_NAME))
    updateLookups(newState)
  }

  const getLookupValues = async (id: string) => {
    try {
      const values = await fetchLookupValue({ id })
      const newState: ILookupValueExtended[] = values.map((value: any) => ({
        ...excludeField(value, __TYPE_NAME),
        state: LOOKUP_VALUES_STATE.CHANGE,
      }))
      const currentValues = newState.filter((item) => item.lookupId === id)
      setLookupValues(currentValues)
    } catch (err) {
      console.log(err, 'ERROR while fetching the values')
    }
  }

  const getLookupById = (id: string) => {
    const lookup = lookups.find((lookup) => lookup.id === id)
    return lookup
  }

  const getLookupIndexById = (id: string) => {
    const index = lookups.findIndex((lookup) => lookup.id === id)
    return index
  }

  const getLookupValueById = (lookupId: string, valueId: string) => {
    const currentLookup = getLookupById(lookupId)
    let value = undefined as ILookupValue | undefined
    if (currentLookup) {
      value = lookupValues.find((val) => val.id === valueId)
    }

    return value
  }

  const getLookupValueIndexById = (lookupId: string, valueId: string) => {
    const currentLookup = getLookupById(lookupId)
    let value = -1
    if (currentLookup) {
      value = lookupValues.findIndex((val) => val.id === valueId)
    }

    return value
  }

  return (
    <LookupProvider
      value={{
        lookups,
        tempLookupId,
        lookupValues,
        getLookupValues,
        setLookupValues,
        setTempLookupId,
        updateLookups,
        getLookupById,
        getLookupValueById,
        getLookupIndexById,
        getLookupValueIndexById,
      }}
    >
      {children}
    </LookupProvider>
  )
}

export default LookupContainer

export const useLookupContext = () => {
  return React.useContext(LookupContext) as ILookupContext
}
