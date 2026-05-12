import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-gray-500 mb-8">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        Back to Home
      </Link>
    </main>
  );
};

export default NotFoundPage;
