'use client'

import React, { useState } from 'react'

interface CodeBlockProps {
  code: string
  language: string
  label?: string
}

export default function CodeBlock({ code, language, label }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-6 rounded-xl border border-white/10 bg-black/50 backdrop-blur">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-3">
        <span className="text-sm font-mono text-gray-400">{label || language}</span>
        <button
          onClick={copyToClipboard}
          className="rounded px-3 py-1 text-sm font-semibold text-gray-300 hover:bg-white/10"
        >
          {copied ? '✓ Copiado' : 'Copiar'}
        </button>
      </div>
      <pre className="overflow-x-auto px-6 py-4">
        <code className={`language-${language} text-sm text-gray-100`}>{code}</code>
      </pre>
    </div>
  )
}
