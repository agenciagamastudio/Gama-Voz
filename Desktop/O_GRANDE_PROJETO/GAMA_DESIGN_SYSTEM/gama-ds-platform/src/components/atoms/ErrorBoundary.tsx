'use client'

import React, { ReactNode } from 'react'
import { AlertError } from './AlertError'

export interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error) => ReactNode
  onError?: (error: Error, info: React.ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, info)
    this.props.onError?.(error, info)
  }

  reset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        this.props.fallback?.(this.state.error) || (
          <AlertError
            title="Algo deu errado"
            onDismiss={this.reset}
            dismissible={true}
          >
            <p>{this.state.error.message}</p>
            <button
              onClick={this.reset}
              className="mt-3 px-4 py-2 bg-gama-error text-white rounded-md hover:brightness-110"
              type="button"
            >
              Tentar Novamente
            </button>
          </AlertError>
        )
      )
    }

    return this.props.children
  }
}
