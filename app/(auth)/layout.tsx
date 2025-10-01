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
  description: 'Sign in or register for BookWise, a modern university library management system. Access your account to browse books, manage borrowings, and track your reading history.',
  keywords: ['library', 'university', 'books', 'authentication', 'sign in', 'register', 'student portal', 'BookWise'],
  authors: [{ name: 'Oliver Van Droogenbroeck' }],
  creator: 'Oliver Van Droogenbroeck',
  publisher: 'BookWise',
  robots: {
    index: false, // Don't index auth pages
    follow: true,
  },
  openGraph: {
    title: 'BookWise - University Library Authentication',
    description: 'Access your BookWise account to manage your library experience',
    type: 'website',
    locale: 'en_US',
    siteName: 'BookWise',
    images: [
      {
        url: '/images/auth-illustration.png',
        width: 1000,
        height: 1000,
        alt: 'BookWise Authentication',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BookWise - University Library Authentication',
    description: 'Access your BookWise account to manage your library experience',
    images: ['/images/auth-illustration.png'],
  },
}

const layout = async ({children} : {children : ReactNode}) => {
    const session = await auth();
    if (session) {
        redirect('/')
    }
  return (
    <main className='auth-container'>
        <section className='auth-form'>
            <div className='auth-box'>
                <div className='flex flex-row gap-3'>
                    <Image src='/icons/logo.svg' alt='BookWise University Library Logo' width={37} height={37} />
                    <h1 className='text-2xl font-semibold text-white'>BookWise</h1>
                </div>
                <div>{children}</div>
            </div>
        </section>
        <section className='auth-illustration'>
            <Image 
            src='/images/auth-illustration.png' 
            alt='Students studying in a modern university library with digital interfaces' 
            height={1000}
            width={1000}
            className='size-full object-cover'
            priority
            />
        </section>
    </main>
  )
}

export default layout