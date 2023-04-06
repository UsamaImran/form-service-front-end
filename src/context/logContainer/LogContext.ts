import React from 'react'
import { ILogContext } from './LogInterface'

export const LogContext = React.createContext<ILogContext | null>(null)
export const LogProvider = LogContext.Provider
export const LogConsumer = LogContext.Consumer
