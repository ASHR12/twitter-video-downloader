import { useState, useCallback } from 'react';
import { downloadVideoFromUrl, getVideoFilename } from '@/utils/video-utils';

export const useVideoDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  const downloadVideo = useCallback(async (videoUrl, platform = 'video') => {
    if (!videoUrl) {
      setDownloadError('No video URL provided');
      return;
    }

    setIsDownloading(true);
    setDownloadError(null);

    try {
      const filename = getVideoFilename(videoUrl, platform);
      await downloadVideoFromUrl(videoUrl, filename);
    } catch (error) {
      setDownloadError(`Download failed: ${error.message}`);
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return {
    isDownloading,
    downloadError,
    downloadVideo,
  };
};