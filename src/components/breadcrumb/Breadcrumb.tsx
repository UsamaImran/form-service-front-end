import React, { ReactElement } from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { useRouter } from 'next/router'
import styles from './Breadcrumb.module.scss'

interface BreadcrumbProps {
  breadcrumbList: Array<{ label: string; link?: string }>
  showBackButton?: boolean
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbList, showBackButton = false }): ReactElement => {
  const { push } = useRouter()

  const breadcrumbs = breadcrumbList.map(({ label, link }) => {
    return link ? (
      <Link
        style={{ fontSize: '12px' }}
        underline="hover"
        key={label}
        color="primary"
        onClick={() => {
          push(link)
        }}
      >
        {label}
      </Link>
    ) : (
      <Typography style={{ fontSize: '12px' }} key={label} color="disabled">
        {label}
      </Typography>
    )
  })

  const getBreadCrumbs = () => (
    <Stack spacing={2}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  )

  return !showBackButton ? getBreadCrumbs() : <div className={styles['container']}>{getBreadCrumbs()}</div>
}
export default Breadcrumb
