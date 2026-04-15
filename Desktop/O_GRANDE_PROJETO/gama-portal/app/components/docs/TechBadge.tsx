interface TechBadgeProps {
  name: string
  color?: string
}

const colorMap: Record<string, string> = {
  typescript: 'bg-blue-600',
  javascript: 'bg-yellow-600',
  react: 'bg-cyan-600',
  next: 'bg-black',
  python: 'bg-blue-700',
  node: 'bg-green-600',
  supabase: 'bg-emerald-600',
  postgres: 'bg-blue-800',
  groq: 'bg-orange-600',
  openai: 'bg-gray-700',
  anthropic: 'bg-purple-600',
  default: 'bg-gray-600',
}

export default function TechBadge({ name, color }: TechBadgeProps) {
  const bgColor = color || colorMap[name.toLowerCase()] || colorMap.default

  return (
    <span className={`${bgColor} rounded-full px-4 py-2 text-sm font-semibold text-white`}>
      {name}
    </span>
  )
}
