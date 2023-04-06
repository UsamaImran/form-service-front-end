import React from 'react'
import { ICompany } from './CompanyInterface'

export const CompanyContext = React.createContext<ICompany | null>(null)
export const CompanyProvider = CompanyContext.Provider
export const CompanyConsumer = CompanyContext.Consumer
