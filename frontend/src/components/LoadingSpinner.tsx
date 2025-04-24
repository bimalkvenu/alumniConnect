// src/components/LoadingSpinner.tsx
import { Loader2 } from 'lucide-react';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-10">
    <Loader2 className="animate-spin w-6 h-6 text-primary" />
  </div>
);

export default LoadingSpinner;
