import { BsTwitterX } from 'react-icons/bs';
import { FaYoutube } from 'react-icons/fa';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800/50 backdrop-blur-md p-4 border-t border-gray-700 text-center text-gray-400 text-sm">
      <p>
        &copy; {currentYear} Ashutosh Shrivastava. All rights reserved.
      </p>
      <div className="mt-2 flex justify-center space-x-4">
        <a
          href="https://x.com/ai_for_success"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded"
          aria-label="Follow on X/Twitter"
        >
          <BsTwitterX className="h-5 w-5" aria-hidden="true" />
        </a>
        <a
          href="https://www.youtube.com/@AIForSuccess"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-500 hover:text-red-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded"
          aria-label="Subscribe on YouTube"
        >
          <FaYoutube className="h-6 w-6" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}