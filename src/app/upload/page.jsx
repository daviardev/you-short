'use client'

import { useState } from 'react'

import { AiOutlineCheckCircle } from 'react-icons/ai'
import { BiCloudUpload, BiLoaderCircle } from 'react-icons/bi'

import useSession from '@/hooks/useSession'

import Loader from '@/components/Utils/Load'

import { db, storage } from '@/firebase'

import { collection, addDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { useDynamicIsland } from '@/context/DynamicIslandProvider'

export default function Upload () {
  const [caption, setCaption] = useState('')
  const [fileDisplay, setFileDisplay] = useState('')

  const [uploading, setUploading] = useState(false)

  const [file, setFile] = useState(null)

  const { session } = useSession()

  const { showLoading, showCompleted, showError } = useDynamicIsland()

  const validateFile = file => {
    const validTypes = ['video/mp4']
    if (file && validTypes.includes(file.type)) {
      return true
    }
    showError('Only MP4 files')
    return false
  }

  const onChange = e => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      if (validateFile(file)) {
        const fileURL = URL.createObjectURL(file)
        setFileDisplay(fileURL)
        setFile(file)
      }
    }
  }

  const handleDrop = e => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && validateFile(file)) {
      const fileURL = URL.createObjectURL(file)
      setFileDisplay(fileURL)
      setFile(file)
    }
  }

  const handleDragOver = e => e.preventDefault()
  const handleDragEnter = e => e.preventDefault()
  const handleDragLeave = e => e.preventDefault()

  const discard = async () => {
    await setCaption('')
    await setFileDisplay('')
    await setFile(null)
  }

  const discardVideo = async () => {
    await setFileDisplay('')
    await setFile(null)
  }

  const postVideo = async () => {
    if (!file || !caption.trim()) return

    const { name, tag, image, uid } = session.user

    showLoading()
    setUploading(true)

    try {
      const videoURL = await uploadVideo(file)

      await addDoc(collection(db, 'videos'), {
        author: name,
        avatar: image,
        userId: uid,
        songName: `original sound - ${tag}`,
        description: caption,
        likes: 0,
        shares: 0,
        comments: 0,
        src: videoURL,
        timeStamp: Date.now()
      })
      showCompleted('Video uploaded')
      setUploading(false)
      discard()
    } catch (error) {
      showError('Error uploading video', error)
    } finally {
      discard()
      setUploading(false)
    }
  }

  const uploadVideo = async file => {
    setUploading(true)
    showLoading()

    try {
      const storageRef = ref(storage, `videos/${file.name}`)

      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      setUploading(false)
      discard()
      showCompleted('Video uploaded')
      return url
    } catch (error) {
      showError('Error uploading video', error)
      throw error
    } finally {
      setUploading(false)
      discard()
    }
  }

  return (
    <>
      {session
        ? (
          <div className='py-12 px-4 max-w-md mx-auto'>
            <h1 className='text-lg font-semibold mb-2'>Load Video</h1>
            <h2 className='text-gray-500 text-sm mb-4'>Post a video on your account</h2>
            {!fileDisplay
              ? (
                <label
                  htmlFor='fileInput'
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  className='
                    flex
                    flex-col
                    items-center
                    justify-center
                    w-full
                    h-46
                    p-2
                    border-2
                    border-dashed
                  border-gray-300
                    rounded-xl
                    cursor-pointer
                  hover:bg-gray-50
                  dark:hover:bg-gray-50/20
                  '
                >
                  <BiCloudUpload
                    size={60}
                    className='mb-2'
                  />
                  <p className='text-sm'>Select the video to load</p>
                  <p className='text-xs text-gray-500'>Or drag and drop file</p>
                  <label
                    htmlFor='fileInput'
                    className='mt-2 py-1 px-3 bg-red-500 text-white text-sm rounded-full cursor-pointer'
                  >
                    Select a file
                  </label>
                  <input
                    id='fileInput'
                    type='file'
                    hidden
                    accept='video/*'
                    onChange={onChange}
                    disabled={uploading}
                  />
                </label>
                )
              : (
                <div className='relative w-full rounded-lg p-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <AiOutlineCheckCircle size={16} className='text-green-500' />
                      <span className='ml-2 text-sm truncate'>{file ? file.name : ''}</span>
                    </div>
                    <button
                      onClick={discardVideo}
                      disabled={uploading}
                      className='text-sm text-red-500'
                    >
                      Change
                    </button>
                  </div>
                  <div className='w-full h-full flex absolute -z-20'>
                    <div className='w-full relative justify-center flex'>
                      <video
                        className='w-[100%] h-64 object-fill opacity-30 max-sm:hidden right-6 max-sm:blur-none blur-2xl absolute'
                        src={fileDisplay}
                      />
                    </div>
                  </div>
                  <video controls className='w-full mt-4 rounded h-48'>
                    <source src={fileDisplay} type='video/mp4' />
                    Your browser does not support the video tag.
                  </video>
                  <div className='mt-4'>
                    <div className='flex justify-between items-center mb-2'>
                      <span className='text-sm'>Description</span>
                      <span className='text-xs text-gray-400'>{caption.length}/150</span>
                    </div>
                    <input
                      maxLength={150}
                      type='text'
                      disabled={uploading}
                      className='w-full p-2 border rounded-md bg-transparent text-sm outline-none'
                      value={caption}
                      onChange={e => setCaption(e.target.value)}
                    />
                  </div>
                  <div className='flex gap-3 mt-4'>
                    <button
                      onClick={discard}
                      disabled={uploading}
                      className={`
                        py-2
                        flex-1
                        border
                        rounded-md
                        text-center
                        ${uploading
                          ? 'bg-gray-100'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-50/20'
                        }`}
                    >
                      {uploading ? <BiLoaderCircle className='animate-spin mx-auto' size={20} /> : 'Discard'}
                    </button>
                    <button
                      onClick={postVideo}
                      disabled={uploading}
                      className={`flex-1 py-2 bg-red-500 text-white rounded-md text-center ${uploading ? 'bg-red-300 cursor-wait' : 'hover:bg-red-600'}`}
                    >
                      {uploading ? <BiLoaderCircle className='animate-spin mx-auto' size={20} /> : 'Post'}
                    </button>
                  </div>
                </div>
                )}
          </div>

          )
        : (
          <Loader />
          )}
    </>
  )
}
