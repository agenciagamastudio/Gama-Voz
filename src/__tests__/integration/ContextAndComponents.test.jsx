import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from '../../components/ErrorBoundary';
import LoadingSpinner from '../../components/LoadingSpinner';
import React from 'react';

// Suppress console.error during tests
const originalError = console.error;

/**
 * Integration Tests
 * Tests that verify context and components work together correctly
 */

describe('Integration: Components with Providers', () => {
  beforeEach(() => {
    console.error = vi.fn();
    document.documentElement.style.cssText = '';
  });

  afterEach(() => {
    if (originalError) console.error = originalError;
    document.documentElement.style.cssText = '';
  });

  describe('LoadingSpinner with ErrorBoundary', () => {
    it('should display LoadingSpinner normally when no error occurs', () => {
      render(
        <ErrorBoundary>
          <LoadingSpinner text="Loading..." />
        </ErrorBoundary>
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.queryByText('⚠️ Algo deu errado')).not.toBeInTheDocument();
    });

    it('should catch and display errors in ErrorBoundary', () => {
      const ThrowError = () => {
        throw new Error('Test error');
      };

      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByText('⚠️ Algo deu errado')).toBeInTheDocument();
    });

    it('should have functional reload button when error occurs', () => {
      const ThrowError = () => {
        throw new Error('Test error');
      };

      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      const reloadButton = screen.getByRole('button', { name: /Recarregar Página/i });
      expect(reloadButton).toBeInTheDocument();
    });
  });

  describe('LoadingSpinner alone', () => {
    it('should render LoadingSpinner with custom text', () => {
      render(<LoadingSpinner text="Processing..." />);

      expect(screen.getByText('Processing...')).toBeInTheDocument();
    });

    it('should render spinner animation', () => {
      const { container } = render(<LoadingSpinner text="Loading" />);

      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('should have correct styling classes', () => {
      const { container } = render(<LoadingSpinner text="Loading" />);

      const mainDiv = container.querySelector('.min-h-screen');
      expect(mainDiv).toBeInTheDocument();
      expect(mainDiv).toHaveClass('bg-[#050505]');
    });
  });

  describe('ErrorBoundary alone', () => {
    it('should render children when no error', () => {
      render(
        <ErrorBoundary>
          <div data-testid="test-child">Test Content</div>
        </ErrorBoundary>
      );

      expect(screen.getByTestId('test-child')).toBeInTheDocument();
    });

    it('should display fallback UI on error', () => {
      const ErrorComponent = () => {
        throw new Error('Test error');
      };

      render(
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText('⚠️ Algo deu errado')).toBeInTheDocument();
      expect(screen.getByText('Desculpe, encontramos um erro. Tente recarregar a página.')).toBeInTheDocument();
    });

    it('should maintain error state', () => {
      const ErrorComponent = () => {
        throw new Error('Test error');
      };

      const { container } = render(
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      );

      // Verify error UI structure
      const heading = container.querySelector('h1');
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('⚠️ Algo deu errado');
    });
  });

  describe('Integrated Component Behavior', () => {
    it('LoadingSpinner should work inside ErrorBoundary wrapper', () => {
      const { container } = render(
        <ErrorBoundary>
          <div data-testid="wrapper">
            <LoadingSpinner text="Loading data" />
          </div>
        </ErrorBoundary>
      );

      expect(screen.getByText('Loading data')).toBeInTheDocument();
      expect(screen.getByTestId('wrapper')).toBeInTheDocument();

      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('should handle multiple LoadingSpinners in sequence', () => {
      const { rerender } = render(<LoadingSpinner text="First" />);

      expect(screen.getByText('First')).toBeInTheDocument();

      rerender(<LoadingSpinner text="Second" />);

      expect(screen.getByText('Second')).toBeInTheDocument();
      expect(screen.queryByText('First')).not.toBeInTheDocument();
    });

    it('should preserve component hierarchy', () => {
      const { container } = render(
        <ErrorBoundary>
          <section data-testid="section">
            <LoadingSpinner text="Section loading" />
          </section>
        </ErrorBoundary>
      );

      expect(screen.getByTestId('section')).toBeInTheDocument();
      expect(screen.getByText('Section loading')).toBeInTheDocument();
    });
  });

  describe('Error handling and recovery', () => {
    it('should isolate errors to ErrorBoundary', () => {
      const SafeComponent = () => <div data-testid="safe">Safe</div>;
      const ErrorComponent = () => {
        throw new Error('Error in component');
      };

      const { container } = render(
        <div>
          <SafeComponent />
          <ErrorBoundary>
            <ErrorComponent />
          </ErrorBoundary>
        </div>
      );

      // Safe component should still be visible
      expect(screen.getByTestId('safe')).toBeInTheDocument();
      // Error boundary should show error UI
      expect(screen.getByText('⚠️ Algo deu errado')).toBeInTheDocument();
    });

    it('should display proper error message text', () => {
      const ErrorComponent = () => {
        throw new Error('Test error');
      };

      render(
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText('⚠️ Algo deu errado')).toBeInTheDocument();
      expect(screen.getByText('Desculpe, encontramos um erro. Tente recarregar a página.')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Recarregar Página/i })).toBeInTheDocument();
    });
  });

  describe('Component composition patterns', () => {
    it('should support conditional rendering with ErrorBoundary', () => {
      const ConditionalComponent = ({ show }) => {
        if (!show) return <div data-testid="hidden">Hidden</div>;
        throw new Error('Error when shown');
      };

      const { rerender } = render(
        <ErrorBoundary>
          <ConditionalComponent show={false} />
        </ErrorBoundary>
      );

      expect(screen.getByTestId('hidden')).toBeInTheDocument();

      // Change condition - error occurs
      rerender(
        <ErrorBoundary>
          <ConditionalComponent show={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('⚠️ Algo deu errado')).toBeInTheDocument();
    });

    it('LoadingSpinner should accept dynamic text prop', () => {
      const { rerender } = render(<LoadingSpinner text="Initial" />);

      expect(screen.getByText('Initial')).toBeInTheDocument();

      rerender(<LoadingSpinner text="Updated" />);

      expect(screen.getByText('Updated')).toBeInTheDocument();
      expect(screen.queryByText('Initial')).not.toBeInTheDocument();
    });

    it('should handle nested error boundaries', () => {
      const InnerError = () => {
        throw new Error('Inner error');
      };

      render(
        <ErrorBoundary>
          <div data-testid="outer">
            <ErrorBoundary>
              <InnerError />
            </ErrorBoundary>
          </div>
        </ErrorBoundary>
      );

      // Inner boundary catches the error
      expect(screen.getByText('⚠️ Algo deu errado')).toBeInTheDocument();
      expect(screen.getByTestId('outer')).toBeInTheDocument();
    });
  });

  describe('Combined component rendering', () => {
    it('LoadingSpinner and ErrorBoundary should both render correctly', () => {
      const TestWrapper = () => (
        <ErrorBoundary>
          <div data-testid="wrapper">
            <LoadingSpinner text="Combined test" />
          </div>
        </ErrorBoundary>
      );

      render(<TestWrapper />);

      expect(screen.getByText('Combined test')).toBeInTheDocument();
      expect(screen.getByTestId('wrapper')).toBeInTheDocument();
    });

    it('should handle error in LoadingSpinner scenario', () => {
      const ErrorComponent = () => {
        throw new Error('Error with spinner');
      };

      const TestWrapper = () => (
        <ErrorBoundary>
          <ErrorComponent />
        </ErrorBoundary>
      );

      render(<TestWrapper />);

      expect(screen.getByText('⚠️ Algo deu errado')).toBeInTheDocument();
    });
  });
});
