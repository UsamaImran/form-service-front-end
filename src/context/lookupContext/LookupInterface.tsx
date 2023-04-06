import React from 'react'
import { ILookup, ILookupValue } from '../../graphql/types/ApiTypes'
import { ILookupValueExtended } from './LookupContainer'

export interface ILookupContext {
  lookups: ILookup[]
  tempLookupId: string
  lookupValues: ILookupValueExtended[]
  setLookupValues: React.Dispatch<React.SetStateAction<ILookupValueExtended[]>>
  getLookupValues: (id: string) => Promise<void>
  setTempLookupId: React.Dispatch<React.SetStateAction<string>>
  updateLookups: React.Dispatch<React.SetStateAction<ILookup[]>>
  getLookupById: (id: string) => ILookup | undefined
  getLookupValueById: (lookupId: string, valueId: string) => ILookupValue | undefined
  getLookupIndexById: (id: string) => number
  getLookupValueIndexById: (lookupId: string, valueId: string) => number
}
