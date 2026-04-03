import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React, { createContext, useContext, useState } from 'react';

/**
 * AccentColorContext Tests
 * Tests for the color context provider and color state management
 */

// Mock the context functionality for testing
const AccentColorContext = createContext();

// Simplified test version of AccentColorProvider that doesn't depend on AuthContext
const TestAccentColorProvider = ({ children, accentColor = '#C4FF0D' }) => {
  const [color] = useState(accentColor);

  React.useEffect(() => {
    // Apply ONLY to root (same as real implementation)
    document.documentElement.style.setProperty('--primary-color', color);

    // Calculate RGB (same as real implementation)
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    document.documentElement.style.setProperty('--primary-color-rgb', `${r}, ${g}, ${b}`);
  }, [color]);

  return (
    <AccentColorContext.Provider value={{ accentColor: color }}>
      {children}
    </AccentColorContext.Provider>
  );
};

// Test hook
const useAccentColor = () => {
  const context = useContext(AccentColorContext);
  if (!context) {
    throw new Error('useAccentColor must be used within AccentColorProvider');
  }
  return context;
};

// Component to test the hook
const TestComponent = () => {
  const { accentColor } = useAccentColor();
  return <div data-testid="accent-color-display">{accentColor}</div>;
};

describe('AccentColorContext', () => {
  beforeEach(() => {
    document.documentElement.style.cssText = '';
  });

  describe('Provider and Hook Setup', () => {
    it('should render children correctly', () => {
      render(
        <TestAccentColorProvider>
          <div data-testid="child-element">Test Child</div>
        </TestAccentColorProvider>
      );

      expect(screen.getByTestId('child-element')).toBeInTheDocument();
    });

    it('should throw error when hook is used outside provider', () => {
      const ComponentUsingHook = () => {
        try {
          useAccentColor();
          return <div>Should not render</div>;
        } catch (error) {
          return <div>{error.message}</div>;
        }
      };

      render(<ComponentUsingHook />);
      expect(screen.getByText('useAccentColor must be used within AccentColorProvider')).toBeInTheDocument();
    });

    it('should return accentColor value from context', () => {
      render(
        <TestAccentColorProvider accentColor="#FF5733">
          <TestComponent />
        </TestAccentColorProvider>
      );

      const display = screen.getByTestId('accent-color-display');
      expect(display.textContent).toBe('#FF5733');
    });
  });

  describe('Default color behavior', () => {
    it('should use default accent color when not specified', () => {
      render(
        <TestAccentColorProvider>
          <TestComponent />
        </TestAccentColorProvider>
      );

      const display = screen.getByTestId('accent-color-display');
      expect(display.textContent).toBe('#C4FF0D');
    });

    it('should use custom color when provided', () => {
      render(
        <TestAccentColorProvider accentColor="#00FF00">
          <TestComponent />
        </TestAccentColorProvider>
      );

      const display = screen.getByTestId('accent-color-display');
      expect(display.textContent).toBe('#00FF00');
    });
  });

  describe('CSS variable application', () => {
    it('should set --primary-color CSS variable on document root', async () => {
      render(
        <TestAccentColorProvider accentColor="#FF5733">
          <div>Test</div>
        </TestAccentColorProvider>
      );

      await waitFor(() => {
        const colorValue = document.documentElement.style.getPropertyValue('--primary-color');
        expect(colorValue).toBe('#FF5733');
      });
    });

    it('should set --primary-color-rgb CSS variable', async () => {
      render(
        <TestAccentColorProvider accentColor="#FFFFFF">
          <div>Test</div>
        </TestAccentColorProvider>
      );

      await waitFor(() => {
        const rgbValue = document.documentElement.style.getPropertyValue('--primary-color-rgb');
        expect(rgbValue).toBe('255, 255, 255');
      });
    });

    it('should apply default primary color to CSS', async () => {
      render(
        <TestAccentColorProvider>
          <div>Test</div>
        </TestAccentColorProvider>
      );

      await waitFor(() => {
        const colorValue = document.documentElement.style.getPropertyValue('--primary-color');
        expect(colorValue).toBe('#C4FF0D');
      });
    });
  });

  describe('Hex to RGB conversion', () => {
    it('should convert red (#FF0000) to RGB correctly', async () => {
      render(
        <TestAccentColorProvider accentColor="#FF0000">
          <div>Test</div>
        </TestAccentColorProvider>
      );

      await waitFor(() => {
        const rgbValue = document.documentElement.style.getPropertyValue('--primary-color-rgb');
        expect(rgbValue).toBe('255, 0, 0');
      });
    });

    it('should convert green (#00FF00) to RGB correctly', async () => {
      render(
        <TestAccentColorProvider accentColor="#00FF00">
          <div>Test</div>
        </TestAccentColorProvider>
      );

      await waitFor(() => {
        const rgbValue = document.documentElement.style.getPropertyValue('--primary-color-rgb');
        expect(rgbValue).toBe('0, 255, 0');
      });
    });

    it('should convert blue (#0000FF) to RGB correctly', async () => {
      render(
        <TestAccentColorProvider accentColor="#0000FF">
          <div>Test</div>
        </TestAccentColorProvider>
      );

      await waitFor(() => {
        const rgbValue = document.documentElement.style.getPropertyValue('--primary-color-rgb');
        expect(rgbValue).toBe('0, 0, 255');
      });
    });

    it('should convert lime green (#C4FF0D) to RGB correctly', async () => {
      render(
        <TestAccentColorProvider accentColor="#C4FF0D">
          <div>Test</div>
        </TestAccentColorProvider>
      );

      await waitFor(() => {
        const rgbValue = document.documentElement.style.getPropertyValue('--primary-color-rgb');
        expect(rgbValue).toBe('196, 255, 13');
      });
    });

    it('should convert black (#000000) to RGB correctly', async () => {
      render(
        <TestAccentColorProvider accentColor="#000000">
          <div>Test</div>
        </TestAccentColorProvider>
      );

      await waitFor(() => {
        const rgbValue = document.documentElement.style.getPropertyValue('--primary-color-rgb');
        expect(rgbValue).toBe('0, 0, 0');
      });
    });
  });

  describe('Multiple instances', () => {
    it('should support multiple color values in sequence', async () => {
      const colors = ['#FF0000', '#00FF00', '#0000FF'];

      for (const color of colors) {
        document.documentElement.style.cssText = '';

        const { unmount } = render(
          <TestAccentColorProvider accentColor={color}>
            <div>Test</div>
          </TestAccentColorProvider>
        );

        await waitFor(() => {
          const colorValue = document.documentElement.style.getPropertyValue('--primary-color');
          expect(colorValue).toBe(color);
        });

        unmount();
      }
    });
  });

  describe('Context value structure', () => {
    it('should provide accentColor in context value', () => {
      const TestHookComponent = () => {
        const contextValue = useAccentColor();
        return (
          <div>
            <span data-testid="has-accent-color">{contextValue.accentColor ? 'yes' : 'no'}</span>
          </div>
        );
      };

      render(
        <TestAccentColorProvider accentColor="#FF5733">
          <TestHookComponent />
        </TestAccentColorProvider>
      );

      expect(screen.getByTestId('has-accent-color')).toHaveTextContent('yes');
    });

    it('should have correct color value in context', () => {
      const TestHookComponent = () => {
        const { accentColor } = useAccentColor();
        return <div data-testid="color-value">{accentColor}</div>;
      };

      render(
        <TestAccentColorProvider accentColor="#123456">
          <TestHookComponent />
        </TestAccentColorProvider>
      );

      expect(screen.getByTestId('color-value')).toHaveTextContent('#123456');
    });
  });

  describe('Integration scenarios', () => {
    it('should maintain color across nested components', () => {
      const Level2Component = () => {
        const { accentColor } = useAccentColor();
        return <div data-testid="nested-color">{accentColor}</div>;
      };

      const Level1Component = () => (
        <div data-testid="level1">
          <Level2Component />
        </div>
      );

      render(
        <TestAccentColorProvider accentColor="#ABCDEF">
          <Level1Component />
        </TestAccentColorProvider>
      );

      expect(screen.getByTestId('nested-color')).toHaveTextContent('#ABCDEF');
    });

    it('should work with conditional rendering', () => {
      const ConditionalComponent = ({ show }) => {
        if (!show) return <div data-testid="hidden">Hidden</div>;
        const { accentColor } = useAccentColor();
        return <div data-testid="visible">{accentColor}</div>;
      };

      const { rerender } = render(
        <TestAccentColorProvider accentColor="#FF5733">
          <ConditionalComponent show={false} />
        </TestAccentColorProvider>
      );

      expect(screen.getByTestId('hidden')).toBeInTheDocument();

      rerender(
        <TestAccentColorProvider accentColor="#FF5733">
          <ConditionalComponent show={true} />
        </TestAccentColorProvider>
      );

      expect(screen.getByTestId('visible')).toBeInTheDocument();
      expect(screen.getByTestId('visible')).toHaveTextContent('#FF5733');
    });
  });
});
