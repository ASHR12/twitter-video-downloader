'use server'

import { z } from 'zod'
import getTwitterMedia from 'get-twitter-media'

const schema = z.object({
  url: z
    .string()
    .url()
    .refine((url) => url.includes('twitter.com') || url.includes('x.com'), {
      message: 'URL must be from twitter.com or x.com',
    }),
})

export async function downloadTwitterVideo(prevState, formData) {
  const validatedFields = schema.safeParse({
    url: formData.get('url'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid input',
    }
  }

  const { url } = validatedFields.data

  try {
    const media = await getTwitterMedia(url)

    if (!media.found || media.type !== 'video' || !media.media.length) {
      throw new Error('No video found in the tweet')
    }

    const videoUrl = media.media[0].url

    return {
      message: 'Video ready for download',
      videoUrl: videoUrl,
    }
  } catch (error) {
    console.error('Error processing video:', error)
    return {
      errors: [error.message],
      message: 'Failed to process video.',
    }
  }
}
