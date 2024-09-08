'use server'

import { z } from 'zod'
import getTwitterMedia from 'get-twitter-media'
import getFbVideoInfo from 'fb-downloader-scrapper'
import instagramGetUrl from 'instagram-url-direct'
// Import other platform-specific functions here

const schema = z.object({
  url: z.string().url(),
  platform: z.enum(['twitter', 'youtube', 'facebook', 'instagram']),
})

export async function downloadVideo(prevState, formData) {
  const validatedFields = schema.safeParse({
    url: formData.get('url'),
    platform: formData.get('platform'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid input',
    }
  }

  const { url, platform } = validatedFields.data

  try {
    let videoUrl = ''
    let thumbnail = ''
    switch (platform) {
      case 'twitter':
        videoUrl = await getTwitterVideo(url)
        break
      case 'youtube':
        videoUrl = await getYoutubeVideo(url)
        break
      case 'facebook':
        const facebookData = await getFacebookVideo(url)
        videoUrl = facebookData.hd
        thumbnail = facebookData.thumbnail
        break
      case 'instagram':
        const instagramData = await getInstagramVideo(url)
        videoUrl = instagramData.url_list[0]
        break
      default:
        throw new Error('Unsupported platform')
    }

    return {
      message: 'Video ready for download',
      videoUrl: videoUrl,
      thumbnail: thumbnail,
    }
  } catch (error) {
    console.error('Error processing video:', error)
    return {
      errors: [error.message],
      message: 'Failed to process video.',
    }
  }
}

async function getTwitterVideo(url) {
  const media = await getTwitterMedia(url)
  if (!media.found || media.type !== 'video' || !media.media.length) {
    throw new Error('No video found in the tweet')
  }
  return media.media[0].url
}

async function getFacebookVideo(url) {
  try {
    const result = await getFbVideoInfo(url)
    if (!result || !result.hd) {
      throw new Error('No video found in the Facebook post')
    }
    return result
  } catch (error) {
    throw new Error('Failed to fetch Facebook video')
  }
}

async function getInstagramVideo(url) {
  try {
    const result = await instagramGetUrl(url)
    console.log(result)
    if (!result || !result.url_list) {
      throw new Error('No video found in the Instagram post')
    }
    return result
  } catch (error) {
    throw new Error('Failed to fetch Instagram video')
  }
}
