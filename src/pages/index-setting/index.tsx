import React, { Fragment, useState } from 'react'
import Add from '@mui/icons-material/Add'
// import Head from '../components/browserHeader/BrowserHeader'
// import withAuth from '../hoc/withAuth'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import IndexPageTable from '../../components/indexPageTable/IndexPageTable'
import ConfirmationPopup from '../../layouts/popup/ConfirmationPopup'
import withAuth from '../../hoc/withAuth'
import Button from '../../components/shared/Button'

export const DEFAULT_BREADCRUMB_LIST = [
  { label: 'Home', link: '/' },
  { label: 'System management', link: '/demo' },
  { label: 'Form Elements' },
]

const Home: React.FC = (): JSX.Element => {
  const [isOpen, showPopup] = useState<boolean>(false)

  return (
    <Fragment>
      {/* <Head /> */}
      <div className="content">
        <Breadcrumb breadcrumbList={DEFAULT_BREADCRUMB_LIST} />
        <div className="indexHeadingContainer">
          <p className="indexHeading">Employee Files Index</p>
          <Button
            className={'mt-2 mb-2 ml-2 buttonStyle'}
            variant="contained"
            color={'primary'}
            startIcon={<Add></Add>}
            onClick={() => {
              showPopup(true)
            }}
          >
            New
          </Button>
        </div>
        <IndexPageTable />
        {isOpen ? (
          <ConfirmationPopup
            handleClose={() => {
              showPopup(false)
            }}
          >
            <Button
              onClick={() => {
                showPopup(false)
              }}
            >
              Confirm
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                showPopup(false)
              }}
            >
              Cancel
            </Button>
          </ConfirmationPopup>
        ) : null}
      </div>
    </Fragment>
  )
}

// const App = () => {
//   return (
//     <FileLoader
//       folderName="avatar"
//       onFileUploaded={(url) => {
//         console.log(url)
//       }}
//     >
//       <Avatar />
//     </FileLoader>
//   )
// }

// export default dynamic(() => Promise.resolve(withAuth(Home) as any), {
//   ssr: false,
// })
export default withAuth(Home)
