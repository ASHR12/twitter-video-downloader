import { useState, useCallback, useEffect } from 'react';
import { generateVideoThumbnail } from '@/utils/video-utils';

export const useVideoThumbnail = (videoUrl, providedThumbnail = null) => {
  const [thumbnail, setThumbnail] = useState(providedThumbnail);
  const [isGenerating, setIsGenerating] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(null);

  const generateThumbnail = useCallback(async (url) => {
    if (!url) return;

    setIsGenerating(true);
    setThumbnailError(null);

    try {
      const thumbnailUrl = await generateVideoThumbnail(url);
      setThumbnail(thumbnailUrl);
    } catch (error) {
      setThumbnailError(`Failed to generate thumbnail: ${error.message}`);
      console.error('Thumbnail generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  useEffect(() => {
    if (videoUrl && !providedThumbnail) {
      generateThumbnail(videoUrl);
    } else if (providedThumbnail) {
      setThumbnail(providedThumbnail);
    }
  }, [videoUrl, providedThumbnail, generateThumbnail]);

  return {
    thumbnail,
    isGenerating,
    thumbnailError,
    generateThumbnail,
  };
};