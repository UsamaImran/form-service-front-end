import React, { Fragment } from 'react'
import Head from '../../components/browserHeader/BrowserHeader'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import { DEFAULT_BREADCRUMB_LIST } from '..'
import Log from '../../layouts/log/logLayout/Log'
import LogContextContainer from '../../context/logContainer/LogContainer'
import withAuth from '../../hoc/withAuth'

const LogPage = (): React.ReactElement => {
  return (
    <Fragment>
      <Head />
      <div className="content">
        <Breadcrumb breadcrumbList={DEFAULT_BREADCRUMB_LIST} showBackButton={true} />
        <LogContextContainer>
          <Log />
        </LogContextContainer>
      </div>
    </Fragment>
  )
}

// export default dynamic(() => Promise.resolve(withAuth(LogPage) as any), {
//   ssr: false,
// })

export default withAuth(LogPage)
