'use client'

import { motion } from 'framer-motion';
import { useVideoDownloader } from '@/hooks/use-video-downloader';
import { useVideoDownload } from '@/hooks/use-video-download';
import { useVideoThumbnail } from '@/hooks/use-video-thumbnail';
import { Header } from './header';
import { Footer } from './footer';
import { VideoForm } from './video-form';
import { VideoPreview } from './video-preview';

export function VideoDownloader() {
  const {
    url,
    platform,
    setUrl,
    setPlatform,
    clearUrl,
    state,
    formAction,
    hasVideo,
    hasErrors,
    videoUrl,
    thumbnail: providedThumbnail,
  } = useVideoDownloader();

  const { isDownloading, downloadError, downloadVideo } = useVideoDownload();
  const { thumbnail } = useVideoThumbnail(videoUrl, providedThumbnail);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-md space-y-8 bg-gray-800/50 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-gray-700"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <VideoForm
            url={url}
            platform={platform}
            onUrlChange={setUrl}
            onPlatformChange={setPlatform}
            onClearUrl={clearUrl}
            formAction={formAction}
            errors={state.errors}
            message={state.message}
            hasVideo={hasVideo}
          />

          {downloadError && (
            <div 
              className="p-3 bg-red-900/20 border border-red-800 rounded text-red-400 text-sm"
              role="alert"
            >
              {downloadError}
            </div>
          )}

          <VideoPreview
            videoUrl={videoUrl}
            thumbnail={thumbnail}
            message={hasVideo ? state.message : null}
            isDownloading={isDownloading}
            onDownload={downloadVideo}
            platform={platform}
          />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}