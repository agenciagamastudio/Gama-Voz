/**
 * Tag Atom Component
 * ═══════════════════════════════════════════════════════════════════
 *
 * Badge/Tag component with variant support using GAMA Design Tokens
 * Based on: GAMA_DESIGN_SYSTEM/tokens/tokens.yaml
 *
 * Migration Date: 2026-03-09
 * Status: Production Ready
 */

import React from 'react';
import './Tag.css';

export interface TagProps {
  /** Tag content */
  children: React.ReactNode;
  /** Variant: default, success, warning, error, info */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  /** Size: small, medium */
  size?: 'sm' | 'md';
  /** Dismissible tag with close button */
  dismissible?: boolean;
  /** Callback when dismissed */
  onDismiss?: () => void;
  /** CSS class for additional styling */
  className?: string;
}

/**
 * Tag Component (Badge)
 *
 * @example
 * // Default tag
 * <Tag>Default Tag</Tag>
 *
 * @example
 * // Success tag
 * <Tag variant="success">Success</Tag>
 *
 * @example
 * // Dismissible tag
 * <Tag dismissible onDismiss={() => setShowTag(false)}>
 *   Dismissible Tag
 * </Tag>
 */
export const Tag: React.FC<TagProps> = ({
  children,
  variant = 'default',
  size = 'md',
  dismissible = false,
  onDismiss,
  className = '',
}) => {
  const baseClass = 'tag';
  const variantClass = `tag--${variant}`;
  const sizeClass = `tag--${size}`;

  const classes = [baseClass, variantClass, sizeClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <span className="tag-content">{children}</span>
      {dismissible && (
        <button
          className="tag-close"
          onClick={onDismiss}
          aria-label="Dismiss tag"
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Tag;
