'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="container-custom py-16">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Authentication Error</h1>
        <p className="text-gray-600 mb-8">
          {error === 'Configuration'
            ? 'There is a problem with the server configuration. Please try again later.'
            : 'An error occurred during authentication. Please try again.'}
        </p>
        <div className="space-y-4">
          <Link href="/login" className="btn btn-primary w-full block text-center">
            Back to Login
          </Link>
          <Link href="/" className="btn btn-outline w-full block text-center">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 