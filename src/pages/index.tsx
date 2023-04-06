import React from 'react'
import { useRouter } from 'next/router'
import BrowserHeader from '../components/browserHeader/BrowserHeader'
import { ROUTE_INDEX_SETTING } from '../constants/routes'

export const DEFAULT_BREADCRUMB_LIST = [
  { label: 'Home', link: '/' },
  { label: 'System management', link: '/' },
  { label: 'Form Elements' },
  // { label: 'Lookups', link: '/lookup' },
]

const PageIndex: React.FC = (): JSX.Element => {
  const router = useRouter()

  React.useEffect(() => {
    router.replace(ROUTE_INDEX_SETTING)
  })
  return <BrowserHeader />
  // return (
  //   <Fragment>
  //     <ThemeProvider theme={theme}>
  //       <Head />
  //       <Layout>
  //         <div className="content">
  //           <Breadcrumb breadcrumbList={DEFAULT_BREADCRUMB_LIST} />
  //           <div className="indexHeadingContainer">
  //             <p className="indexHeading">Employee Files Index</p>
  //             <Button
  //               className={'mt-2 mb-2 ml-2 buttonStyle'}
  //               variant="contained"
  //               color={'primary'}
  //               startIcon={<Add></Add>}
  //               onClick={() => {
  //                 showPopup(true)
  //               }}
  //             >
  //               Create New Form
  //             </Button>
  //           </div>
  //           <IndexPageTable />
  //           {isOpen ? (
  //             <ConfirmationPopup
  //               handleClose={() => {
  //                 showPopup(false)
  //               }}
  //             >
  //               <Button
  //                 onClick={() => {
  //                   showPopup(false)
  //                 }}
  //               >
  //                 Confirm
  //               </Button>
  //               <Button
  //                 variant="outlined"
  //                 onClick={() => {
  //                   showPopup(false)
  //                 }}
  //               >
  //                 Cancel
  //               </Button>
  //             </ConfirmationPopup>
  //           ) : null}
  //         </div>
  //       </Layout>
  //     </ThemeProvider>
  //   </Fragment>
  // )
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
export default PageIndex
