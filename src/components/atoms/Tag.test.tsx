/**
 * Tag Component Tests
 * ═══════════════════════════════════════════════════════════════════
 *
 * Comprehensive test suite for Tag/Badge atom component
 * Tests: rendering, variants, dismissible, sizes, accessibility
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tag from './Tag';

describe('Tag Component', () => {
  describe('Rendering', () => {
    it('renders tag with text', () => {
      const { container } = render(<Tag>Default Tag</Tag>);
      expect(container.textContent).toBe('Default Tag');
    });

    it('renders tag with children', () => {
      render(<Tag>Test Content</Tag>);
      const tag = screen.getByText('Test Content');
      expect(tag).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders default variant (brand green)', () => {
      const { container } = render(<Tag>Default</Tag>);
      const tag = container.querySelector('.tag--default');
      expect(tag).toBeInTheDocument();
    });

    it('renders success variant (green)', () => {
      const { container } = render(<Tag variant="success">Success</Tag>);
      const tag = container.querySelector('.tag--success');
      expect(tag).toBeInTheDocument();
    });

    it('renders warning variant (amber)', () => {
      const { container } = render(<Tag variant="warning">Warning</Tag>);
      const tag = container.querySelector('.tag--warning');
      expect(tag).toBeInTheDocument();
    });

    it('renders error variant (red)', () => {
      const { container } = render(<Tag variant="error">Error</Tag>);
      const tag = container.querySelector('.tag--error');
      expect(tag).toBeInTheDocument();
    });

    it('renders info variant (blue)', () => {
      const { container } = render(<Tag variant="info">Info</Tag>);
      const tag = container.querySelector('.tag--info');
      expect(tag).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      const { container } = render(<Tag size="sm">Small</Tag>);
      const tag = container.querySelector('.tag--sm');
      expect(tag).toBeInTheDocument();
    });

    it('renders medium size (default)', () => {
      const { container } = render(<Tag>Medium</Tag>);
      const tag = container.querySelector('.tag--md');
      expect(tag).toBeInTheDocument();
    });
  });

  describe('Dismissible', () => {
    it('renders close button when dismissible', () => {
      render(<Tag dismissible>Dismissible</Tag>);
      const closeButton = screen.getByRole('button', { name: /dismiss tag/i });
      expect(closeButton).toBeInTheDocument();
    });

    it('does not render close button when not dismissible', () => {
      const { container } = render(<Tag>Not Dismissible</Tag>);
      const closeButton = container.querySelector('.tag-close');
      expect(closeButton).not.toBeInTheDocument();
    });

    it('calls onDismiss when close button clicked', async () => {
      const handleDismiss = vi.fn();
      const user = userEvent.setup();

      render(<Tag dismissible onDismiss={handleDismiss}>Dismissible</Tag>);
      const closeButton = screen.getByRole('button', { name: /dismiss tag/i });

      await user.click(closeButton);
      expect(handleDismiss).toHaveBeenCalledOnce();
    });
  });

  describe('CSS Classes', () => {
    it('applies base tag class', () => {
      const { container } = render(<Tag>Tag</Tag>);
      const tag = container.querySelector('.tag');
      expect(tag).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<Tag className="custom">Tag</Tag>);
      const tag = container.querySelector('.custom');
      expect(tag).toBeInTheDocument();
    });

    it('combines multiple classes correctly', () => {
      const { container } = render(
        <Tag variant="success" size="sm" className="custom">
          Tag
        </Tag>
      );
      const tag = container.querySelector('div');
      expect(tag).toHaveClass('tag');
      expect(tag).toHaveClass('tag--success');
      expect(tag).toHaveClass('tag--sm');
      expect(tag).toHaveClass('custom');
    });
  });

  describe('Accessibility', () => {
    it('renders close button with accessible label', () => {
      render(<Tag dismissible>Tag</Tag>);
      const closeButton = screen.getByRole('button', { name: /dismiss/i });
      expect(closeButton).toHaveAttribute('aria-label', 'Dismiss tag');
    });

    it('close button has type="button"', () => {
      render(<Tag dismissible>Tag</Tag>);
      const closeButton = screen.getByRole('button', { name: /dismiss/i });
      expect(closeButton).toHaveAttribute('type', 'button');
    });
  });

  describe('Token Integration', () => {
    it('applies token-based colors for success variant', () => {
      const { container } = render(<Tag variant="success">Success</Tag>);
      const tag = container.querySelector('.tag--success');
      expect(tag).toHaveClass('tag--success');
      // CSS variables handle success color
    });

    it('applies token-based spacing for medium size', () => {
      const { container } = render(<Tag size="md">Medium</Tag>);
      const tag = container.querySelector('.tag--md');
      expect(tag).toHaveClass('tag--md');
      // CSS variables handle padding
    });

    it('applies token-based border radius', () => {
      const { container } = render(<Tag>Tag</Tag>);
      const tag = container.querySelector('.tag');
      expect(tag).toBeInTheDocument();
      // CSS variables handle border-radius-sm
    });
  });

  describe('Content Wrapping', () => {
    it('wraps content in tag-content span', () => {
      const { container } = render(<Tag>Content</Tag>);
      const content = container.querySelector('.tag-content');
      expect(content).toHaveTextContent('Content');
    });

    it('preserves content whitespace with nowrap', () => {
      const { container } = render(<Tag>Long Content Here</Tag>);
      const content = container.querySelector('.tag-content');
      expect(content).toHaveClass('tag-content');
      // CSS: white-space: nowrap prevents wrapping
    });
  });
});
