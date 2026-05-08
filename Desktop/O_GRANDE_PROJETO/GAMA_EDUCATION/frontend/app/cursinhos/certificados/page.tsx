'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Certificate {
  id: string
  course_slug: string
  course_title: string
  issued_at: string
  download_url: string
}

export default function CertificadosPage() {
  const router = useRouter()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/auth/login')
      return
    }
    fetchCertificates(token)
  }, [])

  const fetchCertificates = async (token: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/certificates`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error('Erro ao carregar certificados')
      const data = await res.json()
      setCertificates(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = (cert: Certificate) => {
    const token = localStorage.getItem('token')
    const url = `${process.env.NEXT_PUBLIC_API_URL}${cert.download_url}`
    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.blob())
      .then(blob => {
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        a.download = `certificado-${cert.course_slug}.pdf`
        a.click()
        URL.revokeObjectURL(a.href)
      })
      .catch(() => alert('Erro ao baixar o certificado. Tente novamente.'))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gama-text-secondary">Carregando certificados...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gama-dark">
      <div className="container mx-auto px-4 py-12">
        <a href="/cursinhos" className="text-gama-primary hover:brightness-110 mb-8 inline-block">
          ← Voltar aos cursos
        </a>

        <h1 className="text-4xl md:text-5xl font-black text-gama-text mb-4">
          🏆 Meus Certificados
        </h1>
        <p className="text-gama-text-secondary mb-12">
          Certificados emitidos ao concluir 100% das aulas de um cursinho.
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-8 text-red-400">
            {error}
          </div>
        )}

        {certificates.length === 0 ? (
          <div className="bg-gama-surface border border-gama-surface-accent rounded-2xl p-12 text-center">
            <div className="text-6xl mb-6">🎯</div>
            <h2 className="text-2xl font-bold text-gama-text mb-3">
              Nenhum certificado ainda
            </h2>
            <p className="text-gama-text-secondary mb-8 max-w-md mx-auto">
              Complete um cursinho para ganhar seu certificado! Cada cursinho concluído gera um certificado PDF para download.
            </p>
            <a
              href="/cursinhos"
              className="inline-block bg-gama-primary text-black font-black px-8 py-3 rounded-xl hover:brightness-110 transition-all"
            >
              Ver Cursinhos
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map(cert => (
              <div
                key={cert.id}
                className="bg-gama-surface border border-gama-surface-accent rounded-2xl p-6 flex flex-col gap-4"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">🏆</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gama-text truncate">
                      {cert.course_title}
                    </h3>
                    <p className="text-sm text-gama-text-secondary mt-1">
                      Concluído em {new Date(cert.issued_at).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                <div className="bg-gama-primary/10 border border-gama-primary/30 rounded-lg px-3 py-2">
                  <p className="text-xs text-gama-text-secondary font-mono truncate">
                    ID: {cert.id}
                  </p>
                </div>

                <button
                  onClick={() => handleDownload(cert)}
                  className="w-full bg-gama-primary text-black font-black py-3 rounded-xl hover:brightness-110 transition-all text-sm"
                >
                  📄 Baixar PDF
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
