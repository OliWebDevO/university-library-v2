import { auth } from '@/auth';
import Image from 'next/image'
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | BookWise - University Library',
    default: 'Authentication | BookWise - University Library Management System'
  },
  description: 'Sign in or register for BookWise, a modern university library management system. Access your account to browse books, manage borrowings, and track your reading history securely.',
  keywords: [
    'library management system', 'university library', 'student portal', 'library authentication',
    'book borrowing', 'digital library', 'library sign in', 'student account',
    'BookWise', 'academic library', 'library catalog', 'book management'
  ],
  authors: [{ name: 'Oliver Van Droogenbroeck', url: 'https://olivervdb.com' }],
  creator: 'Oliver Van Droogenbroeck',
  publisher: 'BookWise University Library',
  robots: {
    index: false, // Don't index auth pages
    follow: true,
    noarchive: true,
    noimageindex: true,
  },
  alternates: {
    canonical: 'https://university-library-v2-nu.vercel.app/sign-in',
  },
  openGraph: {
    title: 'BookWise Authentication - University Library Management System',
    description: 'Secure access to your university library account. Browse books, manage borrowings, and track your academic reading journey.',
    type: 'website',
    locale: 'en_US',
    siteName: 'BookWise University Library',
    url: 'https://university-library-v2-nu.vercel.app/sign-in',
    images: [
      {
        url: 'https://university-library-v2-nu.vercel.app/images/auth-illustration.png',
        width: 1000,
        height: 1000,
        alt: 'BookWise University Library Authentication Portal',
        type: 'image/png',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BookWise Authentication - University Library Management System',
    description: 'Secure access to your university library account. Browse books, manage borrowings, and track your academic reading journey.',
    images: ['https://university-library-v2-nu.vercel.app/images/auth-illustration.png'],
    creator: '@OliWebDevO',
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification
  },
  category: 'Education',
}

const layout = async ({children} : {children : ReactNode}) => {
    const session = await auth();
    if (session) {
        redirect('/')
    }
  return (
    <main className='auth-container'>
        <section className='auth-form' role="main" aria-label="Authentication form">
            <div className='auth-box'>
                <header className='flex flex-row gap-3'>
                    <Image 
                        src='/icons/logo.svg' 
                        alt='BookWise University Library Logo' 
                        width={37} 
                        height={37}
                        priority
                    />
                    <h1 className='text-2xl font-semibold text-white'>BookWise</h1>
                </header>
                <div>{children}</div>
            </div>
        </section>
        <section className='auth-illustration' role="img" aria-label="University library illustration">
            <Image 
                src='/images/auth-illustration.png' 
                alt='Modern university library with students using digital interfaces for book management and academic research' 
                height={1000}
                width={1000}
                className='size-full object-cover'
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
            />
        </section>
    </main>
  )
}

export default layout