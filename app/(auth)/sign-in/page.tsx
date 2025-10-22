import { Metadata } from 'next'
import AuthForm from '@/components/AuthForm'
import { signInWithCredentials } from '@/lib/actions/auth';
import { signInSchema } from '@/lib/validation'
import React from 'react'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your BookWise account to access the university library catalog, manage your borrowed books, and track your reading history.',
  keywords: [
    'sign in', 'login', 'university library login', 'student portal', 'BookWise login',
    'library account access', 'academic portal', 'library authentication'
  ],
  robots: {
    index: false, // Auth pages shouldn't be indexed
    follow: true,
  },
  alternates: {
    canonical: 'https://university-library-v2-nu.vercel.app/sign-in',
  },
  openGraph: {
    title: 'Sign In - BookWise University Library',
    description: 'Access your BookWise account to browse books, manage borrowings, and track your academic reading journey.',
    url: 'https://university-library-v2-nu.vercel.app/sign-in',
  },
  twitter: {
    title: 'Sign In - BookWise University Library',
    description: 'Access your BookWise account to browse books, manage borrowings, and track your academic reading journey.',
  },
}

const Page = () => 
  (
    <main>
      <h1 className="sr-only">Sign In to BookWise University Library</h1>
      <AuthForm
        type='SIGN_IN'
        schema={signInSchema}
        defaultValues={{
            email: '',
            password: ''
        }}
        onSubmit={signInWithCredentials}
      />
    </main>
  )

export default Page