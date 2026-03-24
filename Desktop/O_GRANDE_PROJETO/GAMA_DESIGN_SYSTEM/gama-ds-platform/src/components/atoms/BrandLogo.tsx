'use client';

import Image from 'next/image';
import { useBrand } from '@/hooks/useBrand';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BrandLogo = ({
  size = 'md',
  className = ''
}: BrandLogoProps) => {
  const { brandTokens, brandId } = useBrand();

  // Fallback logo path if not in tokens
  const logoPath = brandTokens?.logo || '/logos/gama-studio.svg';

  // Size mappings
  const sizeMap = {
    sm: { width: 40, height: 40 },
    md: { width: 56, height: 56 },
    lg: { width: 80, height: 80 },
  };

  const { width, height } = sizeMap[size];

  // Alt text based on brand
  const altText = brandId
    ? `${brandId.replace('gama-', '').toUpperCase()} logo`
    : 'Gama logo';

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Image
        src={logoPath}
        alt={altText}
        width={width}
        height={height}
        priority
        className="motion-transition-default duration-300"
        onError={(e) => {
          // Fallback to Studio logo if image fails to load
          const target = e.target as HTMLImageElement;
          if (target.src !== '/logos/gama-studio.svg') {
            target.src = '/logos/gama-studio.svg';
          }
        }}
      />
    </div>
  );
};

export default BrandLogo;
