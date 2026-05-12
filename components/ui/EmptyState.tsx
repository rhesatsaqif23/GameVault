import React from 'react';

interface EmptyStateProps {
  message: string;
}

const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-xl text-gray-500 mb-4">{message}</p>
      <p>EmptyState Placeholder</p>
    </div>
  );
};

export default EmptyState;
