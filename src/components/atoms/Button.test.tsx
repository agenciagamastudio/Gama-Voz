/**
 * Button Component Tests
 * ═══════════════════════════════════════════════════════════════════
 *
 * Comprehensive test suite for Button atom component
 * Tests: rendering, variants, sizes, disabled state, accessibility
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders button with text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('renders button with children', () => {
      render(<Button>Test Content</Button>);
      const button = screen.getByRole('button');
      expect(button.textContent).toBe('Test Content');
    });
  });

  describe('Variants', () => {
    it('renders primary variant (default)', () => {
      const { container } = render(<Button>Primary</Button>);
      const button = container.querySelector('.btn--primary');
      expect(button).toBeInTheDocument();
    });

    it('renders secondary variant', () => {
      const { container } = render(<Button variant="secondary">Secondary</Button>);
      const button = container.querySelector('.btn--secondary');
      expect(button).toBeInTheDocument();
    });

    it('renders tertiary variant', () => {
      const { container } = render(<Button variant="tertiary">Tertiary</Button>);
      const button = container.querySelector('.btn--tertiary');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      const { container } = render(<Button size="sm">Small</Button>);
      const button = container.querySelector('.btn--sm');
      expect(button).toBeInTheDocument();
    });

    it('renders medium size (default)', () => {
      const { container } = render(<Button>Medium</Button>);
      const button = container.querySelector('.btn--md');
      expect(button).toBeInTheDocument();
    });

    it('renders large size', () => {
      const { container } = render(<Button size="lg">Large</Button>);
      const button = container.querySelector('.btn--lg');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('renders disabled button', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('prevents click when disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button disabled onClick={handleClick}>Disabled</Button>);
      const button = screen.getByRole('button');

      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Click Handler', () => {
    it('calls onClick when clicked', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Click me</Button>);
      const button = screen.getByRole('button');

      await user.click(button);
      expect(handleClick).toHaveBeenCalledOnce();
    });
  });

  describe('Type Attribute', () => {
    it('renders as button type (default)', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('renders as submit type', () => {
      render(<Button type="submit">Submit</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('renders as reset type', () => {
      render(<Button type="reset">Reset</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'reset');
    });
  });

  describe('Accessibility', () => {
    it('supports aria-label', () => {
      render(<Button ariaLabel="Close dialog">×</Button>);
      const button = screen.getByRole('button', { name: /close dialog/i });
      expect(button).toBeInTheDocument();
    });

    it('has accessible name from children', () => {
      render(<Button>Save Changes</Button>);
      const button = screen.getByRole('button', { name: /save changes/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe('CSS Classes', () => {
    it('applies custom className', () => {
      const { container } = render(<Button className="custom-class">Button</Button>);
      const button = container.querySelector('.custom-class');
      expect(button).toBeInTheDocument();
    });

    it('combines multiple classes correctly', () => {
      const { container } = render(
        <Button variant="secondary" size="lg" className="custom">
          Button
        </Button>
      );
      const button = container.querySelector('button');
      expect(button).toHaveClass('btn');
      expect(button).toHaveClass('btn--secondary');
      expect(button).toHaveClass('btn--lg');
      expect(button).toHaveClass('custom');
    });
  });

  describe('Token Integration', () => {
    it('applies token-based colors for primary variant', () => {
      const { container } = render(<Button variant="primary">Primary</Button>);
      const button = container.querySelector('.btn--primary');
      expect(button).toHaveClass('btn--primary');
      // CSS variables are applied via stylesheet
    });

    it('applies token-based spacing', () => {
      const { container } = render(<Button size="md">Medium</Button>);
      const button = container.querySelector('.btn--md');
      expect(button).toHaveClass('btn--md');
      // Spacing from CSS variables
    });
  });
});
