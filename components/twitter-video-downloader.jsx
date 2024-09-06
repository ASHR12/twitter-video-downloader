'use client'

import { useState, useEffect, useRef } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Download, Loader2 } from 'lucide-react'
import { BsTwitterX } from 'react-icons/bs'
import { downloadTwitterVideo } from '@/app/actions/downloadTwitterVideo'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      disabled={pending}
      className='w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200'
    >
      {pending ? (
        <Loader2 className='animate-spin h-5 w-5' />
      ) : (
        <>
          <Download className='h-5 w-5 mr-2' />
          Process Video
        </>
      )}
    </Button>
  )
}

export function TwitterVideoDownloader() {
  const [url, setUrl] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const videoRef = useRef(null)
  const [state, formAction] = useFormState(downloadTwitterVideo, {
    errors: {},
    message: '',
    videoUrl: '',
  })

  useEffect(() => {
    if (state.videoUrl) {
      generateThumbnail(state.videoUrl)
    }
  }, [state.videoUrl])

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

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setThumbnail('')
    await formAction(new FormData(event.target))
    setIsLoading(false)
  }

  const handleDownload = async () => {
    if (state.videoUrl) {
      try {
        const response = await fetch(state.videoUrl)
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = 'twitter_video.mp4'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      } catch (error) {
        console.error('Download failed:', error)
      }
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4'>
      <div className='w-full max-w-md space-y-8'>
        <div className='text-center'>
          <BsTwitterX className='mx-auto h-12 w-12 text-white' />
          <h2 className='mt-6 text-3xl font-bold tracking-tight text-white'>
            Video Downloader
          </h2>
        </div>
        <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
          <div className='relative'>
            <Input
              type='text'
              name='url'
              placeholder='Enter Twitter / X video URL...'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className='block w-full rounded-md border-gray-300 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200'
            />
            <BsTwitterX className='absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
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
          <div className='mt-8 p-4 bg-gray-700 rounded-md shadow-md transition-all duration-300 ease-in-out'>
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
                className='flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-all duration-200'
              >
                <Download className='h-5 w-5 mr-2' />
                Save Video
              </Button>
            </div>
          </div>
        )}
      </div>
      <footer className='fixed bottom-0 left-0 right-0 mb-4 text-center text-gray-400 text-sm'>
        <p>
          &copy; {new Date().getFullYear()} Ashutosh Shrivastava. All rights
          reserved.
        </p>
        <p className='inline'>Follow me on : </p>
        <a
          href='https://x.com/ai_for_success'
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-400 hover:text-blue-300 transition-colors duration-200'
        >
          <BsTwitterX className='h-3 w-3 inline-block' />
        </a>
      </footer>
    </div>
  )
}
