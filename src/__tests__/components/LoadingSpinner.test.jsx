import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import React from 'react';

describe('LoadingSpinner', () => {
  describe('Default rendering', () => {
    it('should render with default loading text', () => {
      render(<LoadingSpinner />);

      expect(screen.getByText('Carregando...')).toBeInTheDocument();
    });

    it('should render spinner element', () => {
      const { container } = render(<LoadingSpinner />);

      const spinnerDiv = container.querySelector('.animate-spin');
      expect(spinnerDiv).toBeInTheDocument();
    });

    it('should have dark background styling', () => {
      const { container } = render(<LoadingSpinner />);

      const mainContainer = container.querySelector('.min-h-screen.bg-\\[\\#050505\\]');
      expect(mainContainer).toBeInTheDocument();
    });
  });

  describe('Custom text prop', () => {
    it('should display custom text when provided', () => {
      render(<LoadingSpinner text="Processando..." />);

      expect(screen.getByText('Processando...')).toBeInTheDocument();
      expect(screen.queryByText('Carregando...')).not.toBeInTheDocument();
    });

    it('should handle different custom messages', () => {
      const testMessages = [
        'Aguarde um momento',
        'Salvando dados',
        'Buscando informações',
        'Finalizando...'
      ];

      testMessages.forEach(message => {
        const { unmount } = render(<LoadingSpinner text={message} />);
        expect(screen.getByText(message)).toBeInTheDocument();
        unmount();
      });
    });

    it('should handle empty string as text prop', () => {
      render(<LoadingSpinner text="" />);

      // Component should still render, just with empty text
      const { container } = render(<LoadingSpinner text="" />);
      const spinnerDiv = container.querySelector('.animate-spin');
      expect(spinnerDiv).toBeInTheDocument();
    });

    it('should handle very long text', () => {
      const longText = 'Esta é uma mensagem muito longa que pode ocupar múltiplas linhas no spinner';
      render(<LoadingSpinner text={longText} />);

      expect(screen.getByText(longText)).toBeInTheDocument();
    });
  });

  describe('Spinner animation', () => {
    it('should have spin animation class', () => {
      const { container } = render(<LoadingSpinner />);

      const spinnerDiv = container.querySelector('.animate-spin');
      expect(spinnerDiv).toHaveClass('animate-spin');
    });

    it('should have correct animation duration style', () => {
      const { container } = render(<LoadingSpinner />);

      const spinnerDiv = container.querySelector('.animate-spin');
      expect(spinnerDiv.style.animationDuration).toBe('0.8s');
    });

    it('should have spinner border classes', () => {
      const { container } = render(<LoadingSpinner />);

      const spinnerDiv = container.querySelector('.animate-spin');
      expect(spinnerDiv).toHaveClass('border-4');
      expect(spinnerDiv).toHaveClass('border-transparent');
      expect(spinnerDiv).toHaveClass('border-t-primary');
      expect(spinnerDiv).toHaveClass('border-r-primary');
    });

    it('should have circular spinner shape', () => {
      const { container } = render(<LoadingSpinner />);

      const spinnerDiv = container.querySelector('.animate-spin');
      expect(spinnerDiv).toHaveClass('rounded-full');
    });
  });

  describe('Text styling', () => {
    it('should have primary color text', () => {
      const { container } = render(<LoadingSpinner text="Loading" />);

      const textElement = container.querySelector('.text-primary');
      expect(textElement).toBeInTheDocument();
      expect(textElement).toHaveTextContent('Loading');
    });

    it('should have pulse animation on text', () => {
      const { container } = render(<LoadingSpinner text="Loading" />);

      const textElement = container.querySelector('.animate-pulse');
      expect(textElement).toBeInTheDocument();
      expect(textElement).toHaveClass('animate-pulse');
    });

    it('should have correct text styling classes', () => {
      const { container } = render(<LoadingSpinner text="Loading" />);

      const textElement = container.querySelector('.text-primary.font-black.text-lg');
      expect(textElement).toBeInTheDocument();
    });

    it('should have proper spacing for text', () => {
      const { container } = render(<LoadingSpinner text="Loading" />);

      const textElement = container.querySelector('.mt-6');
      expect(textElement).toBeInTheDocument();
    });
  });

  describe('Layout structure', () => {
    it('should be centered on screen', () => {
      const { container } = render(<LoadingSpinner />);

      const mainContainer = container.querySelector('.flex.items-center.justify-center');
      expect(mainContainer).toBeInTheDocument();
    });

    it('should have text-center class on text container', () => {
      const { container } = render(<LoadingSpinner />);

      const textContainer = container.querySelector('.text-center');
      expect(textContainer).toBeInTheDocument();
    });

    it('should have proper spinner dimensions', () => {
      const { container } = render(<LoadingSpinner />);

      const spinnerContainer = container.querySelector('.relative.w-16.h-16');
      expect(spinnerContainer).toBeInTheDocument();
    });

    it('should have inline-block display for spinner', () => {
      const { container } = render(<LoadingSpinner />);

      const inlineBlock = container.querySelector('.inline-block');
      expect(inlineBlock).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('should render complete loading spinner structure', () => {
      const { container } = render(<LoadingSpinner text="Por favor aguarde" />);

      // Check full component structure
      const mainDiv = container.querySelector('.min-h-screen');
      expect(mainDiv).toBeInTheDocument();

      const textContainer = mainDiv.querySelector('.text-center');
      expect(textContainer).toBeInTheDocument();

      const spinnerDiv = textContainer.querySelector('.relative.w-16.h-16');
      expect(spinnerDiv).toBeInTheDocument();

      const text = screen.getByText('Por favor aguarde');
      expect(text).toBeInTheDocument();
    });

    it('should work with different screen sizes (responsive)', () => {
      // Test that component uses full height and center alignment
      const { container } = render(<LoadingSpinner text="Loading" />);

      const mainContainer = container.querySelector('.min-h-screen');
      expect(mainContainer).toHaveClass('min-h-screen');
      expect(mainContainer).toHaveClass('bg-[#050505]');
      expect(mainContainer).toHaveClass('flex');
      expect(mainContainer).toHaveClass('items-center');
      expect(mainContainer).toHaveClass('justify-center');
    });
  });

  describe('Props validation', () => {
    it('should accept text as string prop', () => {
      render(<LoadingSpinner text="Test Message" />);
      expect(screen.getByText('Test Message')).toBeInTheDocument();
    });

    it('should default to "Carregando..." when text prop is not provided', () => {
      render(<LoadingSpinner />);
      expect(screen.getByText('Carregando...')).toBeInTheDocument();
    });

    it('should not render children prop', () => {
      const { container } = render(
        <LoadingSpinner>
          <div data-testid="child">Child content</div>
        </LoadingSpinner>
      );

      // Children should not appear in spinner component
      expect(screen.queryByTestId('child')).not.toBeInTheDocument();
    });
  });
});
