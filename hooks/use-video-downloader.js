import { useState, useCallback } from 'react';
import { useFormState } from 'react-dom';
import { downloadVideo } from '@/app/actions/downloadVideo';
import { PLATFORMS } from '@/utils/constants';

export const useVideoDownloader = () => {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState(PLATFORMS.TWITTER);
  const [state, formAction] = useFormState(downloadVideo, {
    errors: {},
    message: '',
    videoUrl: '',
    thumbnail: '',
  });

  const clearUrl = useCallback(() => {
    setUrl('');
  }, []);

  const handleUrlChange = useCallback((newUrl) => {
    setUrl(newUrl);
  }, []);

  const handlePlatformChange = useCallback((newPlatform) => {
    setPlatform(newPlatform);
  }, []);

  const hasVideo = Boolean(state.videoUrl);
  const hasErrors = Boolean(state.errors && Object.keys(state.errors).length > 0);
  const hasMessage = Boolean(state.message);

  return {
    // Form state
    url,
    platform,
    setUrl: handleUrlChange,
    setPlatform: handlePlatformChange,
    clearUrl,
    
    // Server state
    state,
    formAction,
    
    // Computed state
    hasVideo,
    hasErrors,
    hasMessage,
    
    // Video data
    videoUrl: state.videoUrl,
    thumbnail: state.thumbnail,
  };
};