import { Fragment } from 'react'
import IndexPage from '../../components/indexPage/IndexPage'

const IndexLayout = () => {
  return (
    <>
      <Fragment>
        <div className="content">
          <IndexPage />
        </div>
      </Fragment>
    </>
  )
}

export default IndexLayout
