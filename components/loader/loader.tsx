import { Loader2 } from 'lucide-react';
import { memo } from 'react';

export const Loader = memo(function Loader() {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-background'>
      <Loader2 className='text-foreground animate-spin' size={30} />
    </div>
  );
});
