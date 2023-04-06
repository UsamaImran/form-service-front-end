import React, { Fragment } from 'react'
import Head from '../../components/browserHeader/BrowserHeader'
import Error from '../../components/errors/error'
import { useRouter } from 'next/router'

const ErrorPage = (): React.ReactElement => {
  const router = useRouter()
  const code = router.query.code ?? 500
  return (
    <Fragment>
      <Head />
      <div className="content mt-80">
        <Error code={code as string} />
      </div>
    </Fragment>
  )
}

export default ErrorPage
