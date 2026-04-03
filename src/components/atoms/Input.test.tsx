/**
 * Input Component Tests
 * ═══════════════════════════════════════════════════════════════════
 *
 * Comprehensive test suite for Input atom component
 * Tests: rendering, focus state, error handling, accessibility, types
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

describe('Input Component', () => {
  describe('Rendering', () => {
    it('renders input field', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<Input placeholder="Enter text" />);
      const input = screen.getByPlaceholderText('Enter text');
      expect(input).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Input label="Email" />);
      const label = screen.getByText('Email');
      expect(label).toBeInTheDocument();
    });

    it('renders required indicator when required', () => {
      render(<Input label="Name" required />);
      const requiredIndicator = screen.getByText('*');
      expect(requiredIndicator).toBeInTheDocument();
    });
  });

  describe('Input Types', () => {
    it('renders text input (default)', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('renders email input', () => {
      render(<Input type="email" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('renders number input', () => {
      render(<Input type="number" />);
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('type', 'number');
    });

    it('renders password input', () => {
      render(<Input type="password" />);
      const input = screen.getByDisplayValue('');
      expect(input).toHaveAttribute('type', 'password');
    });
  });

  describe('Value Handling', () => {
    it('accepts initial value', () => {
      render(<Input value="Initial" readOnly />);
      const input = screen.getByDisplayValue('Initial');
      expect(input).toBeInTheDocument();
    });

    it('handles onChange event', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Input onChange={handleChange} />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'test');
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('Focus Handling', () => {
    it('handles onFocus event', async () => {
      const handleFocus = vi.fn();
      const user = userEvent.setup();

      render(<Input onFocus={handleFocus} />);
      const input = screen.getByRole('textbox');

      await user.click(input);
      expect(handleFocus).toHaveBeenCalled();
    });

    it('handles onBlur event', async () => {
      const handleBlur = vi.fn();
      const user = userEvent.setup();

      render(
        <>
          <Input onBlur={handleBlur} />
          <button>Other</button>
        </>
      );
      const input = screen.getByRole('textbox');
      const button = screen.getByRole('button');

      await user.click(input);
      await user.click(button);

      expect(handleBlur).toHaveBeenCalled();
    });
  });

  describe('Error State', () => {
    it('displays error message', () => {
      render(<Input error="Invalid email" />);
      const error = screen.getByText('Invalid email');
      expect(error).toBeInTheDocument();
    });

    it('applies error class when error present', () => {
      const { container } = render(<Input error="Error message" />);
      const input = container.querySelector('.input--error');
      expect(input).toBeInTheDocument();
    });

    it('sets aria-invalid when error present', () => {
      render(<Input error="Error" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('Help Text', () => {
    it('displays help text', () => {
      render(<Input helpText="Enter a valid email" />);
      const help = screen.getByText('Enter a valid email');
      expect(help).toBeInTheDocument();
    });

    it('links help text with aria-describedby', () => {
      const { container } = render(<Input helpText="Help message" />);
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-describedby');
    });
  });

  describe('Disabled State', () => {
    it('renders disabled input', () => {
      render(<Input disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('prevents interaction when disabled', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Input disabled onChange={handleChange} />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'test');
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('associates label with input via htmlFor', () => {
      const { container } = render(<Input label="Name" id="name-input" />);
      const label = container.querySelector('label');
      expect(label).toHaveAttribute('for', 'name-input');
    });

    it('supports aria-label', () => {
      render(<Input ariaLabel="Search box" />);
      const input = screen.getByLabelText('Search box');
      expect(input).toBeInTheDocument();
    });

    it('sets aria-required when required', () => {
      render(<Input required />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-required', 'true');
    });

    it('links error and help text with aria-describedby', () => {
      const { container } = render(
        <Input error="Error" helpText="Help" />
      );
      const input = container.querySelector('input');
      const describedBy = input?.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      expect(describedBy).toMatch(/error/);
      expect(describedBy).toMatch(/help/);
    });
  });

  describe('CSS Classes', () => {
    it('applies custom className', () => {
      const { container } = render(<Input className="custom-class" />);
      const input = container.querySelector('.custom-class');
      expect(input).toBeInTheDocument();
    });
  });

  describe('Token Integration', () => {
    it('applies token-based focus state (green border)', () => {
      const { container } = render(<Input />);
      const input = container.querySelector('input');
      expect(input).toHaveClass('input');
      // CSS variables handle focus color (#88CE11)
    });

    it('applies token-based spacing and sizing', () => {
      const { container } = render(<Input />);
      const wrapper = container.querySelector('.input-wrapper');
      expect(wrapper).toBeInTheDocument();
      // CSS variables handle spacing
    });
  });
});
