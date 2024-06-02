'use client'

import { useState } from 'react'

import { AiOutlineCheckCircle } from 'react-icons/ai'
import { BiCloudUpload, BiLoaderCircle } from 'react-icons/bi'

import useSession from '@/hooks/useSession'

import Loader from '@/components/Load'

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
    showError('Only MP4 video files are allowed')
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
        userId: uid,
        description: caption,
        likes: 0,
        comments: 0,
        shares: 0,
        songName: `original sound - ${tag}`,
        avatar: image,
        albumCover: image,
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

  const uploadVideo = async (file) => {
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
          <div className='py-12 px-2.5'>
            <h1 className='text-[18px] font-semibold'>Load video</h1>
            <h2 className='text-gray-400 mt-1 text-[14px]'>Post a video on your account</h2>
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
                  flex-row
                  items-center
                  justify-start
                  mx-auto
                  mt-2
                  mb-4
                  w-full
                  h-[100px]
                  text-center
                  p-2
                  border-2
                  border-dashed
                  border-gray-300
                  rounded-lg
                  hover:bg-gray-100
                  cursor-pointer
                '
                >
                  <BiCloudUpload size={30} color='#b3b3b1' />
                  <div className='ml-4'>
                    <p className='text-[12px]'>Select the video to load</p>
                    <p className='text-gray-500 text-[10px]'>Or drag and drop file</p>
                  </div>
                  <label
                    htmlFor='fileInput'
                    className='ml-4 p-1 mt-0 text-white text-[13px] bg-[#f02c56] rounded-sm cursor-pointer leading-3'
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
                <div className='mx-auto mt-2 mb-4 w-full p-2 rounded-2xl relative'>
                  {uploading && (
                    <div className='absolute flex items-center right-0 justify-center z-20 bg-black h-full w-full rounded-xl bg-opacity-50'>
                      <div className='mx-auto flex items-center justify-center gap-1'>
                        <BiLoaderCircle className='animate-spin' color='#f12b56' size={30} />
                        <div className='text-white font-bold'>Uploading...</div>
                      </div>
                    </div>
                  )}
                  <div className='absolute flex items-center justify-between rounded-xl border w-[94%] p-2 border-gray-300'>
                    <div className='flex items-center truncate'>
                      <AiOutlineCheckCircle size={16} className='min-w-[16px]' />
                      <span className='text-[11px] pl-1 truncate text-ellipsis'>
                        {file ? file.name : ''}
                      </span>
                    </div>
                    <button onClick={discardVideo} disabled={uploading} className={`text-[11px] ml-6 font-semibold ${uploading && 'select-none'}`}>
                      Change
                    </button>
                  </div>
                  <div className='mt-12'>
                    <div className='mt-5'>
                      <div className='flex items-center justify-between'>
                        <span className='mb-1 text-[15px]'>Description</span>
                        <span className='text-gray-400 text-[12px]'>{caption.length}/150</span>
                      </div>
                      <input
                        maxLength={150}
                        type='text'
                        disabled={uploading}
                        className={`border text-[12px] p-2.5 rounded-md w-full focus:outline-none ${uploading && 'select-none border-none cursor-wait'}`}
                        value={caption}
                        onChange={e => setCaption(e.target.value)}
                      />
                    </div>
                    <div className='flex gap-3'>
                      <button
                        onClick={discard}
                        disabled={uploading}
                        className={`px-4 w-full py-2.5 mt-8 border text-[16px] hover:bg-gray-100 rounded-sm ${uploading && 'select-none bg-gray-100/20'}`}
                      >
                        {uploading ? <BiLoaderCircle className='animate-spin ml-5' color='#000000' size={25} /> : 'Discard'}
                      </button>
                      <button
                        onClick={postVideo}
                        disabled={uploading}
                        className={`px-4 w-full py-2.5 mt-8 border text-[16px] text-white bg-[#f02c56] rounded-sm ${uploading && 'bg-pink-500/20 select-none cursor-wait'}`}
                      >
                        {uploading ? <BiLoaderCircle className='animate-spin ml-5' color='#ffffff' size={25} /> : 'Post'}
                      </button>
                    </div>
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
