'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function usePageLoading() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleStart = () => setIsLoading(true)
    const handleStop = () => setIsLoading(false)

    // NProgress-like event handling
    const originalPush = router.push
    const originalReplace = router.replace

    // @ts-ignore
    router.push = function (href, options) {
      handleStart()
      // @ts-ignore
      return originalPush.call(this, href, options).finally(handleStop)
    }

    // @ts-ignore
    router.replace = function (href, options) {
      handleStart()
      // @ts-ignore
      return originalReplace.call(this, href, options).finally(handleStop)
    }

    return () => {
      // Cleanup
      setIsLoading(false)
    }
  }, [router])

  return { isLoading }
}
