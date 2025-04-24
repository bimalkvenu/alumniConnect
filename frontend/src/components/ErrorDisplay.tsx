import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="bg-red-100 text-red-700 p-4 rounded-lg shadow-md">
      <strong>Error:</strong> {message}
    </div>
  );
};

export default ErrorDisplay;
