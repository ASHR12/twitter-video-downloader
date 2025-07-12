import { Input } from '@/components/ui/input';
import { BsXCircle } from 'react-icons/bs';
import { PLATFORM_CONFIG } from '@/utils/constants';

export function UrlInput({ url, platform, onUrlChange, onClearUrl }) {
  const platformConfig = PLATFORM_CONFIG[platform];
  const placeholder = platformConfig?.placeholder || 'Enter URL...';

  return (
    <div className="relative">
      <Input
        type="url"
        name="url"
        placeholder={placeholder}
        value={url}
        onChange={(e) => onUrlChange(e.target.value)}
        className="block w-full rounded-md border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 pr-10"
        aria-label={`Enter ${platformConfig?.name || 'video'} URL`}
        aria-describedby="url-help"
      />
      {url && (
        <button
          type="button"
          onClick={onClearUrl}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-200 cursor-pointer transition-colors duration-200"
          aria-label="Clear URL"
        >
          <BsXCircle className="h-5 w-5" />
        </button>
      )}
      <div id="url-help" className="sr-only">
        Paste the {platformConfig?.name || 'video'} URL you want to download
      </div>
    </div>
  );
}