import { motion } from 'framer-motion';

export function Header() {
  return (
    <header className="bg-gray-800/50 backdrop-blur-md p-4 border-b border-gray-700">
      <motion.h1
        className="text-3xl font-bold text-center text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Video Downloader
      </motion.h1>
    </header>
  );
}