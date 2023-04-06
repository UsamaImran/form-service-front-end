import React from 'react'
import { IAuth } from './AuthInterface'

export const AuthContext = React.createContext<IAuth | null>(null)
export const AuthProvider = AuthContext.Provider
export const AuthConsumer = AuthContext.Consumer
