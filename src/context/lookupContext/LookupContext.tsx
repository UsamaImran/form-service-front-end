import React from 'react'
import { ILookupContext } from './LookupInterface'

export const LookupContext = React.createContext<ILookupContext | null>(null)
export const LookupProvider = LookupContext.Provider
export const LookupConsumer = LookupContext.Consumer
