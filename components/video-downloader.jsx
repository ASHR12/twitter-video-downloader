'use client'

import { useState, useEffect, useRef } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Download, Loader2 } from 'lucide-react'
import { BsXCircle, BsTwitterX } from 'react-icons/bs'
import { FaYoutube } from 'react-icons/fa'
import { downloadVideo } from '@/app/actions/downloadVideo'

function SubmitButton() {
  const { pending } = useFormStatus()
  console.log('pending status', pending)
  return (
    <Button
      type='submit'
      disabled={pending}
      className='w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-md transition-all duration-200'
    >
      {pending ? (
        <Loader2 className='animate-spin h-5 w-5 mr-2' />
      ) : (
        <>
          <Download className='h-5 w-5 mr-2' />
          Process Video
        </>
      )}
    </Button>
  )
}

export function VideoDownloader() {
  const [url, setUrl] = useState('')
  const [platform, setPlatform] = useState('twitter')
  const [thumbnail, setThumbnail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const videoRef = useRef(null)
  const [state, formAction] = useFormState(downloadVideo, {
    errors: {},
    message: '',
    videoUrl: '',
    thumbnail: '',
  })
  useEffect(() => {
    if (state.videoUrl && !state.thumbnail) {
      generateThumbnail(state.videoUrl)
    } else {
      setThumbnail(state.thumbnail)
    }
  }, [state.videoUrl, state.thumbnail])

  const generateThumbnail = (videoUrl) => {
    const video = document.createElement('video')
    video.crossOrigin = 'anonymous'
    video.src = videoUrl
    video.load()
    video.addEventListener('loadeddata', () => {
      video.currentTime = 1 // Seek to 1 second
    })
    video.addEventListener('seeked', () => {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      canvas
        .getContext('2d')
        .drawImage(video, 0, 0, canvas.width, canvas.height)
      setThumbnail(canvas.toDataURL())
    })
  }

  // const handleSubmit = async (event) => {
  //   event.preventDefault()
  //   setIsLoading(true)
  //   await formAction(new FormData(event.target))
  //   setIsLoading(false)
  // }

  const handleDownload = async () => {
    if (state.videoUrl) {
      try {
        setIsDownloading(true)
        const response = await fetch(state.videoUrl)
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = 'video.mp4'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      } catch (error) {
        console.error('Download failed:', error)
      } finally {
        setIsDownloading(false)
      }
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col'>
      <header className='bg-gray-800 bg-opacity-50 backdrop-blur-md p-4'>
        <motion.h1
          className='text-3xl font-bold text-center text-white'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Video Downloader
        </motion.h1>
      </header>

      <main className='flex-grow flex items-center justify-center p-4'>
        <motion.div
          className='w-full max-w-md space-y-8 bg-gray-800 bg-opacity-50 backdrop-blur-md p-8 rounded-xl shadow-2xl'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <form action={formAction} className='space-y-6'>
            <div className='relative'>
              <select
                name='platform'
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className='block p-3 w-full rounded-md border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200'
              >
                <option value='twitter'>X/Twitter</option>
                <option value='facebook'>Facebook</option>
                <option value='instagram'>Instagram</option>
              </select>
            </div>
            <div className='relative'>
              <Input
                type='text'
                name='url'
                placeholder='Enter Post URL...'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className='block w-full rounded-md border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200'
              />
              {url && (
                <BsXCircle
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer'
                  onClick={() => setUrl('')}
                />
              )}
            </div>
            {state.errors && (
              <p className='text-red-500 text-sm'>{state.errors[0]}</p>
            )}
            {state.message && !state.videoUrl && (
              <p className='text-red-500 text-sm'>{state.message}</p>
            )}
            <SubmitButton />
          </form>

          {isLoading && (
            <div className='text-center'>
              <Loader2 className='animate-spin h-8 w-8 mx-auto text-blue-500' />
              <p className='mt-2 text-white'>Processing video...</p>
            </div>
          )}

          {state.videoUrl && !isLoading && (
            <motion.div
              className='mt-8 p-4 bg-gray-700 rounded-md shadow-md'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className='text-lg font-semibold text-white mb-4'>
                {state.message || 'Your video is ready!'}
              </p>
              <div className='flex items-center space-x-4'>
                {thumbnail && (
                  <img
                    src={thumbnail}
                    alt='Video thumbnail'
                    className='w-24 h-24 object-cover rounded'
                  />
                )}
                <Button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className='flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-all duration-200'
                >
                  {isDownloading ? (
                    <Loader2 className='animate-spin h-5 w-5 mr-2' />
                  ) : (
                    <Download className='h-5 w-5 mr-2' />
                  )}
                  {isDownloading ? 'Downloading...' : 'Save Video'}
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>

      <footer className='bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 text-center text-gray-400 text-sm'>
        <p>
          &copy; {new Date().getFullYear()} Ashutosh Shrivastava. All rights
          reserved.
        </p>
        <div className='mt-2 flex justify-center space-x-4'>
          <a
            href='https://x.com/ai_for_success'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-400 hover:text-blue-300 transition-colors duration-200'
          >
            <BsTwitterX className='h-5 w-5' />
          </a>
          <a
            href='https://www.youtube.com/@AIForSuccess'
            target='_blank'
            rel='noopener noreferrer'
            className='text-red-500 hover:text-red-400 transition-colors duration-200'
          >
            <FaYoutube className='h-6 w-6' />
          </a>
        </div>
      </footer>
    </div>
  )
}
