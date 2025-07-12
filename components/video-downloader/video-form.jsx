import { PlatformSelector } from './platform-selector';
import { UrlInput } from './url-input';
import { SubmitButton } from './submit-button';
import { ErrorDisplay } from './error-display';

export function VideoForm({
  url,
  platform,
  onUrlChange,
  onPlatformChange,
  onClearUrl,
  formAction,
  errors,
  message,
  hasVideo,
}) {
  return (
    <form action={formAction} className="space-y-6">
      <PlatformSelector 
        platform={platform} 
        onPlatformChange={onPlatformChange} 
      />
      
      <UrlInput
        url={url}
        platform={platform}
        onUrlChange={onUrlChange}
        onClearUrl={onClearUrl}
      />
      
      <ErrorDisplay 
        errors={errors} 
        message={!hasVideo ? message : null} 
      />
      
      <SubmitButton />
    </form>
  );
}