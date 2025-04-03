import { PostgrestError } from '@supabase/supabase-js'
import {
  ApiError,
  DatabaseError,
  ValidationError,
  NotFoundError,
  AuthenticationError,
  AuthorizationError,
} from './ApiError'

export function handleSupabaseError(error: PostgrestError): never {
  // Handle authentication errors
  if (error.code === 'PGRST116') {
    throw new AuthenticationError('Invalid authentication credentials')
  }

  // Handle authorization errors
  if (error.code === '42501') {
    throw new AuthorizationError('Insufficient permissions')
  }

  // Handle not found errors
  if (error.code === 'PGRST404') {
    throw new NotFoundError('Resource not found')
  }

  // Handle validation errors
  if (error.code === '23505') {
    throw new ValidationError('Duplicate entry', { field: error.details })
  }

  if (error.code === '23514') {
    throw new ValidationError('Invalid data', { constraint: error.details })
  }

  // Handle foreign key violations
  if (error.code === '23503') {
    throw new ValidationError('Referenced resource does not exist', {
      constraint: error.details,
    })
  }

  // Handle other database errors
  throw new DatabaseError('Database operation failed', {
    code: error.code,
    message: error.message,
    details: error.details,
    hint: error.hint,
  })
}

export function handleApiError(error: unknown): never {
  if (error instanceof ApiError) {
    throw error
  }

  if (error instanceof Error) {
    throw new ApiError(error.message, 500, 'INTERNAL_ERROR', {
      originalError: error,
    })
  }

  throw new ApiError('An unexpected error occurred', 500, 'UNKNOWN_ERROR', {
    error,
  })
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'An unexpected error occurred'
}

export function getErrorDetails(error: unknown): any {
  if (error instanceof ApiError) {
    return {
      code: error.code,
      statusCode: error.statusCode,
      details: error.details,
    }
  }

  return {
    code: 'UNKNOWN_ERROR',
    statusCode: 500,
    details: error,
  }
} 