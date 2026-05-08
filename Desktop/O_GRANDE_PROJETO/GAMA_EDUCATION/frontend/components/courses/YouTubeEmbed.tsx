import { useMemo } from 'react'

interface YouTubeEmbedProps {
  videoId: string
  startSeconds?: number
  endSeconds?: number
  title?: string
  className?: string
}

export function YouTubeEmbed({
  videoId,
  startSeconds = 0,
  endSeconds,
  title = 'Video Player',
  className = '',
}: YouTubeEmbedProps) {
  const embedUrl = useMemo(() => {
    const url = new URL(`https://www.youtube.com/embed/${videoId}`)

    // Add timestamp parameters if provided
    if (startSeconds > 0) {
      url.searchParams.set('start', String(startSeconds))
    }
    if (endSeconds) {
      url.searchParams.set('end', String(endSeconds))
    }

    // Standard YouTube embed parameters
    url.searchParams.set('modestbranding', '1')
    url.searchParams.set('rel', '0')

    return url.toString()
  }, [videoId, startSeconds, endSeconds])

  return (
    <div className={`w-full bg-gama-dark rounded-xl overflow-hidden shadow-lg ${className}`}>
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={embedUrl}
          title={title}
          className="absolute top-0 left-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  )
}

export default YouTubeEmbed
