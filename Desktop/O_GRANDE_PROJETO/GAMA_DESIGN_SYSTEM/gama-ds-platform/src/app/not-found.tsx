import Link from 'next/link'
import { Button } from '@/components/atoms/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gama-dark text-gama-text flex flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-black mb-4 text-gama-primary">404</h1>
      <p className="text-xl text-gama-text-secondary mb-8 max-w-2xl text-center">
        Página não encontrada. Verifique a URL e tente novamente.
      </p>
      <Link href="/">
        <Button variant="primary" size="lg">
          Voltar ao home
        </Button>
      </Link>
    </div>
  )
}
