import React, { ReactElement } from 'react'

interface ImageProps {
  src?: string
  className?: string
}

const Avatar = ({ src, className }: ImageProps): ReactElement => (
  <img className={className} style={{ borderRadius: '50%' }} src={src} height={40} width={40} />
)

export default Avatar
