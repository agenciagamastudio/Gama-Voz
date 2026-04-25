'use client';

import Link from 'next/link';
import { useState } from 'react';

interface DropdownItem {
  label: string;
  href: string;
}

interface NavDropdownProps {
  label: string;
  items: DropdownItem[];
  textColor: string;
}

export default function NavDropdown({ label, items, textColor }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      suppressHydrationWarning
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="text-sm hover:text-[var(--bb-primary)] transition"
        style={{ color: textColor }}
      >
        {label} ▾
      </button>

      {isOpen && (
        <div suppressHydrationWarning className="absolute top-full left-0 mt-2 w-48 bg-[var(--bb-surface)] border border-[var(--bb-border)] rounded-lg shadow-xl py-2 z-50">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 text-sm hover:bg-[var(--bb-surface-overlay)] transition"
              style={{ color: textColor }}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
