'use client';

import Link from "next/link";
 
export default function GlobalError({ error, reset }: {
  error: Error,
  reset: () => void
}) {
  return (
    <html>
      <head>
        <title>Oops! Something went wrong!</title>
      </head>
      <body>
        <div className='flex flex-col space-y-6 items-center mx-auto text-center mt-10'>
          <h2 className='text-4xl font-bold'>Something went wrong!</h2>
          
          <div className="flex flex-col space-y-3 items-center md:flex-row md:space-y-0 md:space-x-5">
            <button
              onClick={
                // Attempt to recover by trying to re-render the segment
                () => reset()
              }
              className="px-5 py-3 text-white bg-slate-700 rounded hover:bg-slate-900"
            >
              Try again
            </button>

            <Link href={'/'}
              className="px-5 py-3 text-white bg-slate-700 rounded hover:bg-slate-900"
            >
              Go home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}