interface AvatarProps {
  initials?: string
  image?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: string
}

export function Avatar({ initials = '?', image, size = 'md', color = '#88CE11' }: AvatarProps) {
  const sizeStyles = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-2xl',
  }

  if (image) {
    return <img src={image} alt={initials} className={`${sizeStyles[size]} rounded-full object-cover`} />
  }

  return (
    <div
      style={{ backgroundColor: color, borderColor: color }}
      className={`${sizeStyles[size]} rounded-full flex items-center justify-center font-bold text-gama-dark`}
    >
      {initials.slice(0, 2).toUpperCase()}
    </div>
  )
}
