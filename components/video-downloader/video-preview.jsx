import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download, Loader2, ImageIcon } from 'lucide-react';

export function VideoPreview({ 
  videoUrl, 
  thumbnail, 
  message, 
  isDownloading, 
  onDownload,
  platform = 'video'
}) {
  if (!videoUrl) return null;

  const handleDownload = () => {
    onDownload(videoUrl, platform);
  };

  return (
    <motion.div
      className="mt-8 p-6 bg-gray-700/50 backdrop-blur-sm rounded-lg shadow-lg border border-gray-600"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-white mb-4">
        {message || 'Your video is ready!'}
      </h3>
      
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {thumbnail ? (
            <div className="relative w-24 h-24 rounded-lg border border-gray-500 overflow-hidden">
              <Image
                src={thumbnail}
                alt="Video thumbnail preview"
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
          ) : (
            <div className="w-24 h-24 bg-gray-600 rounded-lg border border-gray-500 flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={isDownloading ? 'Downloading video...' : 'Download video'}
          >
            {isDownloading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" aria-hidden="true" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="h-5 w-5 mr-2" aria-hidden="true" />
                Save Video
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}