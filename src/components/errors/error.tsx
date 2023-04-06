import React, { Fragment } from 'react'
import { ErrorsStatusCode } from '../../constants/enums'
import styles from './error.module.scss'
import NotFound from './statusCodeError/NotFound'
import BadRequest from './statusCodeError/BadRequest'
import NotAuthorized from './statusCodeError/NotAuthorized'
import AccessForbidden from './statusCodeError/AccessForbidden'
import InfiniteLoop from './statusCodeError/InfiniteLoop'
import TemporaryError from './statusCodeError/TemporaryError'
import TemporaryUnavailable from './statusCodeError/TemporaryUnavailable'
import InternalServerError from './statusCodeError/InternalServerError'

const ErrorTitle = {
  [ErrorsStatusCode.BAD_REQUEST]: 'Sorry, there was a problem with your request',
  [ErrorsStatusCode.UNAUTHORIZED]: 'Sorry, you are unauthorized',
  [ErrorsStatusCode.ACCESS_FORBIDDEN]: 'Sorry, you don’t have permissions to access the requested page',
  [ErrorsStatusCode.NOT_FOUND]: 'Sorry, we can’t seem to find the page you’re looking for',
  [ErrorsStatusCode.UNSUPPORTED_MEDIA_TYPE]: 'Unsupported Media Type',
  [ErrorsStatusCode.INTERNAL_SERVER_ERROR]: 'Sorry, something went wrong on our side ',
  [ErrorsStatusCode.PAGE_UNAVAILABLE]: 'Sorry, this page is temporarily unavailable',
  [ErrorsStatusCode.SERVER_ERROR]: 'Sorry, the server has encountered a temporary error',
  [ErrorsStatusCode.INFINITED_LOOP]: 'Sorry, our server has entered an infinite loop',
}

const ERRORS_COMPONENTS = {
  [ErrorsStatusCode.BAD_REQUEST]: <BadRequest />,
  [ErrorsStatusCode.UNAUTHORIZED]: <NotAuthorized />,
  [ErrorsStatusCode.ACCESS_FORBIDDEN]: <AccessForbidden />,
  [ErrorsStatusCode.NOT_FOUND]: <NotFound />,
  [ErrorsStatusCode.UNSUPPORTED_MEDIA_TYPE]: <></>,
  [ErrorsStatusCode.INFINITED_LOOP]: <InfiniteLoop />,
  [ErrorsStatusCode.SERVER_ERROR]: <TemporaryError />,
  [ErrorsStatusCode.PAGE_UNAVAILABLE]: <TemporaryUnavailable />,
  [ErrorsStatusCode.INTERNAL_SERVER_ERROR]: <InternalServerError />,
}

type Props = {
  code: string
}

const getCodeEnum = (code: number): ErrorsStatusCode => {
  switch (code) {
    case 400:
      return ErrorsStatusCode.BAD_REQUEST
    case 401:
      return ErrorsStatusCode.UNAUTHORIZED
    case 403:
      return ErrorsStatusCode.ACCESS_FORBIDDEN
    case 404:
      return ErrorsStatusCode.NOT_FOUND
    case 415:
      return ErrorsStatusCode.UNSUPPORTED_MEDIA_TYPE
    case 503:
      return ErrorsStatusCode.PAGE_UNAVAILABLE
    case 504:
      return ErrorsStatusCode.SERVER_ERROR
    case 508:
      return ErrorsStatusCode.INFINITED_LOOP
    default:
      return ErrorsStatusCode.INTERNAL_SERVER_ERROR
  }
}

const codesArray = [400, 401, 403, 404, 415, 503, 504, 508, 500]

const Error: React.FunctionComponent<Props> = ({ code }): React.ReactElement => {
  const defaultCode = code ? parseInt(code) : 500
  const statusEnum = getCodeEnum(defaultCode)

  return (
    <Fragment>
      <p className={styles['error-title']}>{ErrorTitle[statusEnum]}</p>
      <p className={`${styles['error-title']} ${styles['error-code']}`}>
        Error code: {codesArray.indexOf(defaultCode) > -1 ? defaultCode : 500}
      </p>
      {ERRORS_COMPONENTS[statusEnum]}
    </Fragment>
  )
}

export default Error
