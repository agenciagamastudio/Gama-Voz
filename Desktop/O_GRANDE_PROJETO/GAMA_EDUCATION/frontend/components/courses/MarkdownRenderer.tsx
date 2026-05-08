import ReactMarkdown from 'react-markdown'
import { ReactNode } from 'react'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const components = {
    h1: ({ children }: { children: ReactNode }) => (
      <h1 className="text-4xl font-black text-gama-text mb-6 mt-8">{children}</h1>
    ),
    h2: ({ children }: { children: ReactNode }) => (
      <h2 className="text-3xl font-bold text-gama-text mb-4 mt-6">{children}</h2>
    ),
    h3: ({ children }: { children: ReactNode }) => (
      <h3 className="text-2xl font-bold text-gama-text mb-3 mt-4">{children}</h3>
    ),
    h4: ({ children }: { children: ReactNode }) => (
      <h4 className="text-xl font-bold text-gama-text mb-2 mt-3">{children}</h4>
    ),
    h5: ({ children }: { children: ReactNode }) => (
      <h5 className="text-lg font-bold text-gama-text mb-2 mt-2">{children}</h5>
    ),
    h6: ({ children }: { children: ReactNode }) => (
      <h6 className="text-base font-bold text-gama-text mb-2 mt-2">{children}</h6>
    ),

    p: ({ children }: { children: ReactNode }) => (
      <p className="text-gama-text-secondary text-base leading-relaxed mb-4">{children}</p>
    ),

    ul: ({ children }: { children: ReactNode }) => (
      <ul className="list-disc list-inside text-gama-text-secondary mb-4 space-y-2 ml-4">{children}</ul>
    ),

    ol: ({ children }: { children: ReactNode }) => (
      <ol className="list-decimal list-inside text-gama-text-secondary mb-4 space-y-2 ml-4">{children}</ol>
    ),

    li: ({ children }: { children: ReactNode }) => (
      <li className="text-gama-text-secondary text-base leading-relaxed">{children}</li>
    ),

    blockquote: ({ children }: { children: ReactNode }) => (
      <blockquote className="border-l-4 border-gama-primary pl-4 py-2 my-4 italic text-gama-text-secondary bg-gama-surface rounded">
        {children}
      </blockquote>
    ),

    code: ({ inline, children }: { inline?: boolean; children: ReactNode }) => {
      if (inline) {
        return (
          <code className="bg-gama-surface text-gama-primary px-2 py-1 rounded font-mono text-sm">
            {children}
          </code>
        )
      }
      return (
        <pre className="bg-gama-surface border border-gama-surface-accent rounded-lg p-4 overflow-x-auto mb-4">
          <code className="text-gama-text font-mono text-sm">{children}</code>
        </pre>
      )
    },

    a: ({ href, children }: { href?: string; children?: ReactNode }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gama-primary hover:brightness-110 underline transition-all"
      >
        {children}
      </a>
    ),

    strong: ({ children }: { children: ReactNode }) => (
      <strong className="font-bold text-gama-text">{children}</strong>
    ),

    em: ({ children }: { children: ReactNode }) => (
      <em className="italic text-gama-text-secondary">{children}</em>
    ),

    hr: () => <hr className="border-t border-gama-surface-accent my-6" />,

    table: ({ children }: { children: ReactNode }) => (
      <table className="w-full border-collapse border border-gama-surface-accent mb-4">{children}</table>
    ),

    thead: ({ children }: { children: ReactNode }) => (
      <thead className="bg-gama-surface">{children}</thead>
    ),

    tbody: ({ children }: { children: ReactNode }) => <tbody>{children}</tbody>,

    tr: ({ children }: { children: ReactNode }) => (
      <tr className="border-b border-gama-surface-accent">{children}</tr>
    ),

    td: ({ children }: { children: ReactNode }) => (
      <td className="px-4 py-2 text-gama-text text-sm">{children}</td>
    ),

    th: ({ children }: { children: ReactNode }) => (
      <th className="px-4 py-2 text-gama-text font-bold text-sm text-left">{children}</th>
    ),
  }

  return (
    <div className={`prose prose-invert max-w-none ${className}`}>
      <ReactMarkdown components={components as any}>{content}</ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer
