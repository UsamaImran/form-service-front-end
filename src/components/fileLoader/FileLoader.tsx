import React from 'react'
import { uploadImage } from '../../helpers/helpers'

interface IFileLoader {
  className: string
  folderName: string
  onFileUploaded: (url: string) => void
}
const FileLoader: React.FC<IFileLoader> = ({ className, folderName, onFileUploaded, children }) => {
  const inputFile = React.useRef<HTMLInputElement | null>()
  const uploadPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0]
        const url = await uploadImage(folderName, file)
        onFileUploaded(url)
        console.log(url)
      }
    } catch (err) {}
  }
  return (
    <div
      className={className}
      onClick={() => {
        if (inputFile && inputFile.current) {
          inputFile.current.click()
        }
      }}
    >
      <input
        disabled={false}
        type="file"
        style={{ display: 'none' }}
        value={''}
        accept="image/*"
        onChange={(event) => {
          uploadPhoto(event)
        }}
        ref={(ref) => {
          inputFile.current = ref
        }}
      />
      {children}
    </div>
  )
}

export default FileLoader
