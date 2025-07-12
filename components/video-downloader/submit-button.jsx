import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label={pending ? 'Processing video...' : 'Process video'}
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin h-5 w-5 mr-2" aria-hidden="true" />
          Processing...
        </>
      ) : (
        <>
          <Download className="h-5 w-5 mr-2" aria-hidden="true" />
          Process Video
        </>
      )}
    </Button>
  );
}