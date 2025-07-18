"use client"
import Image from 'next/image'
import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {convertFileToUrl} from '@/lib/utils'

type FileUploaderProps ={
    files: File[] | undefined,
    onChange: (files: File[]) => void
}

const FileUploader = ({files, onChange} : FileUploaderProps) => {
  const onDrop = useCallback((acceptedFile : File[])  => {
    onChange(acceptedFile)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='file-upload'>
      <input {...getInputProps()} />
      {files && files.length > 0 ? (
        <Image
            src={convertFileToUrl(files[0])}
            width={1000}
            height={1000}
            alt='uploaded file'    
        />
      ) : (
        <>
            <Image
                src="/assets/icons/upload.svg"
                width={40}
                height={40}
                alt='upload placeholder'
            />
            <div className='file-upload_label'>
                <p className='text-14-regular'>
                    <span className='text-green-500'> Click to upload</span> or drag and upload
                </p>
                <p>
                   SVG, PNG, JPG, Gif (max 800x400)
                </p>
            </div>
        </>
      )}
    </div>
  )
}

export default FileUploader
