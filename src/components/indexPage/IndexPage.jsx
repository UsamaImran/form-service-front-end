import Breadcrumb from '../breadcrumb/Breadcrumb'
import { IndexViewProvider } from '../../context/view/IndexViewContext'
import Header from './Header'
import { data } from './indexPageData'
import TableIndex from './TableIndex'

function IndexPage() {
  return (
    <>
      <IndexViewProvider>
        <Breadcrumb breadcrumbList={data.breadCrumb} />
        <Header title={data.title} btnText={data.mainButton.text} btnIcon={data.mainButton.icon} />
        <TableIndex />
      </IndexViewProvider>
    </>
  )
}

export default IndexPage
