import React, { ReactElement } from 'react'

interface ImageProps {
  src?: string
}

const Icon = ({ src }: ImageProps): ReactElement => <img src={src} />

export default Icon
