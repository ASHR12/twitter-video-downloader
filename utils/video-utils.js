/**
 * Generates a thumbnail from a video URL
 * @param {string} videoUrl - The video URL
 * @returns {Promise<string>} - The thumbnail data URL
 */
export const generateVideoThumbnail = (videoUrl) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.src = videoUrl;
    video.load();

    video.addEventListener('loadeddata', () => {
      video.currentTime = 1; // Seek to 1 second
    });

    video.addEventListener('seeked', () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnailUrl = canvas.toDataURL();
        resolve(thumbnailUrl);
      } catch (error) {
        reject(error);
      }
    });

    video.addEventListener('error', (error) => {
      reject(error);
    });
  });
};

/**
 * Downloads a video from a URL
 * @param {string} videoUrl - The video URL
 * @param {string} filename - The filename for the download
 * @returns {Promise<void>}
 */
export const downloadVideoFromUrl = async (videoUrl, filename = 'video.mp4') => {
  try {
    const response = await fetch(videoUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
};

/**
 * Gets the filename from a URL or generates a default one
 * @param {string} videoUrl - The video URL
 * @param {string} platform - The platform name
 * @returns {string} - The filename
 */
export const getVideoFilename = (videoUrl, platform) => {
  try {
    const url = new URL(videoUrl);
    const pathname = url.pathname;
    const segments = pathname.split('/');
    const lastSegment = segments[segments.length - 1];
    
    if (lastSegment && lastSegment.includes('.')) {
      return lastSegment;
    }
    
    return `${platform}_video_${Date.now()}.mp4`;
  } catch (error) {
    return `${platform}_video_${Date.now()}.mp4`;
  }
};