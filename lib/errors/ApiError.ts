export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string,
    public details?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export class DatabaseError extends ApiError {
  constructor(message: string, details?: any) {
    super(message, 500, 'DATABASE_ERROR', details)
    this.name = 'DatabaseError'
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, details?: any) {
    super(message, 400, 'VALIDATION_ERROR', details)
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string, details?: any) {
    super(message, 404, 'NOT_FOUND', details)
    this.name = 'NotFoundError'
  }
}

export class AuthenticationError extends ApiError {
  constructor(message: string, details?: any) {
    super(message, 401, 'AUTHENTICATION_ERROR', details)
    this.name = 'AuthenticationError'
  }
}

export class AuthorizationError extends ApiError {
  constructor(message: string, details?: any) {
    super(message, 403, 'AUTHORIZATION_ERROR', details)
    this.name = 'AuthorizationError'
  }
} 