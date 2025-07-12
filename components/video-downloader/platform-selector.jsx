import { PLATFORM_LIST } from '@/utils/constants';

export function PlatformSelector({ platform, onPlatformChange }) {
  return (
    <div 
      className="flex justify-around items-center p-3 w-full rounded-md border-gray-600 bg-gray-700 transition-all duration-200"
      role="radiogroup"
      aria-label="Select platform"
    >
      {PLATFORM_LIST.slice(0, 3).map((platformConfig) => (
        <label 
          key={platformConfig.id}
          htmlFor={platformConfig.id} 
          className="flex items-center text-white cursor-pointer"
        >
          <input
            type="radio"
            id={platformConfig.id}
            name="platform"
            value={platformConfig.id}
            checked={platform === platformConfig.id}
            onChange={(e) => onPlatformChange(e.target.value)}
            className="appearance-none rounded-full border border-gray-600 checked:bg-blue-600 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-700 h-4 w-4"
            aria-describedby={`${platformConfig.id}-description`}
          />
          <span 
            className="ml-2" 
            id={`${platformConfig.id}-description`}
          >
            {platformConfig.name}
          </span>
        </label>
      ))}
    </div>
  );
}