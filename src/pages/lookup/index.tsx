import { useRouter } from 'next/router'
import React, { Fragment, useState } from 'react'
import LookupContainer from '../../context/lookupContext/LookupContainer'
import withAuth from '../../hoc/withAuth'
import LookupIndexPage from '../../layouts/lookup/LookupIndex'
function Lookup() {
  const router = useRouter()
  React.useEffect(() => {
    router.push({ query: undefined })
  }, [])

  return (
    <LookupContainer>
      <LookupIndexPage />
    </LookupContainer>
  )
}

export default withAuth(Lookup)
