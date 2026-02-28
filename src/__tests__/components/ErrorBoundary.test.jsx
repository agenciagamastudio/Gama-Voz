import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ErrorBoundary from '../../components/ErrorBoundary';
import React from 'react';

// Suppress console.error during tests since error boundaries intentionally throw errors
const originalError = console.error;

describe('ErrorBoundary', () => {
  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalError;
  });

  describe('Rendering normal children', () => {
    it('should render children when no error occurs', () => {
      render(
        <ErrorBoundary>
          <div data-testid="test-child">Normal Content</div>
        </ErrorBoundary>
      );

      expect(screen.getByTestId('test-child')).toBeInTheDocument();
      expect(screen.getByText('Normal Content')).toBeInTheDocument();
    });

    it('should render multiple children correctly', () => {
      render(
        <ErrorBoundary>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
          <div data-testid="child-3">Child 3</div>
        </ErrorBoundary>
      );

      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
      expect(screen.getByTestId('child-3')).toBeInTheDocument();
    });

    it('should render nested components without errors', () => {
      const NestedComponent = () => (
        <div>
          <p>Nested content</p>
        </div>
      );

      render(
        <ErrorBoundary>
          <NestedComponent />
        </ErrorBoundary>
      );

      expect(screen.getByText('Nested content')).toBeInTheDocument();
    });
  });

  describe('Error catching and fallback UI', () => {
    it('should catch errors from children and display fallback UI', () => {
      const ThrowError = () => {
        throw new Error('Test error');
      };

      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByText('⚠️ Algo deu errado')).toBeInTheDocument();
      expect(screen.getByText('Desculpe, encontramos um erro. Tente recarregar a página.')).toBeInTheDocument();
    });

    it('should display fallback UI with proper styling classes', () => {
      const ThrowError = () => {
        throw new Error('Test error');
      };

      const { container } = render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      const mainDiv = container.querySelector('.min-h-screen.bg-\\[\\#050505\\]');
      expect(mainDiv).toBeInTheDocument();

      const contentDiv = container.querySelector('.text-center.px-6');
      expect(contentDiv).toBeInTheDocument();
    });

    it('should display error title with warning emoji', () => {
      const ThrowError = () => {
        throw new Error('Test error');
      };

      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      const titleElement = screen.getByRole('heading', { level: 1 });
      expect(titleElement).toHaveTextContent('⚠️ Algo deu errado');
      expect(titleElement).toHaveClass('text-primary');
    });

    it('should display error message in fallback UI', () => {
      const ThrowError = () => {
        throw new Error('Test error');
      };

      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByText('Desculpe, encontramos um erro. Tente recarregar a página.')).toBeInTheDocument();
    });
  });

  describe('Reload button functionality', () => {
    it('should render reload button in fallback UI', () => {
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

    it('should have correct button styling classes', () => {
      const ThrowError = () => {
        throw new Error('Test error');
      };

      const { container } = render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      const button = container.querySelector('button');
      expect(button).toHaveClass('px-6', 'py-3', 'bg-primary', 'text-black', 'font-bold', 'rounded-lg');
    });

    it('should have clickable reload button in error state', async () => {
      const ThrowError = () => {
        throw new Error('Test error');
      };

      const user = userEvent.setup();

      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      const reloadButton = screen.getByRole('button', { name: /Recarregar Página/i });
      expect(reloadButton).toBeInTheDocument();
      // Verify button is clickable (enabled, not disabled)
      expect(reloadButton).not.toBeDisabled();
    });
  });

  describe('Error boundary state management', () => {
    it('should initialize with hasError as false', () => {
      render(
        <ErrorBoundary>
          <div data-testid="test-child">Content</div>
        </ErrorBoundary>
      );

      expect(screen.getByTestId('test-child')).toBeInTheDocument();
      expect(screen.queryByText('⚠️ Algo deu errado')).not.toBeInTheDocument();
    });

    it('should set hasError to true when error is caught', () => {
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

    it('should store error information in state', () => {
      const ThrowError = () => {
        throw new Error('Custom error message');
      };

      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      // Error is caught and boundary shows fallback UI
      expect(screen.getByText('⚠️ Algo deu errado')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have semantic heading in error UI', () => {
      const ThrowError = () => {
        throw new Error('Test error');
      };

      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it('should have accessible button in error UI', () => {
      const ThrowError = () => {
        throw new Error('Test error');
      };

      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Recarregar Página');
    });
  });
});
