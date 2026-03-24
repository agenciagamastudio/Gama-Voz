'use client'

import Link from 'next/link'
import { Button } from '@/components/atoms/Button'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-screen bg-gama-dark text-gama-text flex flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-black mb-4 text-gama-primary">Oops!</h1>
      <p className="text-xl text-gama-text-secondary mb-8 max-w-2xl text-center">
        Algo deu errado. Não se preocupe, nosso time já foi avisado!
      </p>
      <div className="flex gap-4">
        <Button variant="primary" size="lg" onClick={() => reset()}>
          Tentar novamente
        </Button>
        <Link href="/">
          <Button variant="secondary" size="lg">
            Voltar ao home
          </Button>
        </Link>
      </div>
    </div>
  )
}
