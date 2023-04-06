import React from 'react'
import { useRouter } from 'next/router'
import withAuth from '../../hoc/withAuth'
import Button from '../../components/shared/Button'

const Demo = () => {
  const { push } = useRouter()
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
      <Button
        onClick={() => {
          push('/demo/icons')
        }}
      >
        Open Form Setting
      </Button>

      <Button
        onClick={() => {
          push('/uikit')
        }}
      >
        Ui-Kit
      </Button>
      <Button
        onClick={() => {
          push('/demo/all-ui-Components')
        }}
      >
        All UI Elements
      </Button>
    </div>
  )
}

export default withAuth(Demo)
