import React from 'react';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorDisplay = ({ 
  message, 
  onRetry,
  className 
}: ErrorDisplayProps) => {
  return (
    <div className={`error-container ${className}`}>
      <div className="error-message">{message}</div>
      {onRetry && (
        <button onClick={onRetry} className="retry-button">
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;