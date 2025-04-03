'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function VerifyPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Verifying your email...')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: searchParams.get('token') || '',
          type: 'email',
        })

        if (error) throw error

        setStatus('success')
        setMessage('Email verified successfully! You can now log in.')
        
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          router.push('/auth/login')
        }, 3000)
      } catch (error: any) {
        setStatus('error')
        setMessage(error.message || 'Failed to verify email. Please try again.')
      }
    }

    verifyEmail()
  }, [searchParams, router])

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div className="text-center">
          {status === 'loading' && (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          )}
          
          {status === 'success' && (
            <div className="text-green-600">
              <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          
          {status === 'error' && (
            <div className="text-red-600">
              <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
          
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {message}
          </h3>
          
          {status === 'error' && (
            <div className="mt-6">
              <Link
                href="/auth/register"
                className="text-primary-600 hover:text-primary-500"
              >
                Try registering again
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 