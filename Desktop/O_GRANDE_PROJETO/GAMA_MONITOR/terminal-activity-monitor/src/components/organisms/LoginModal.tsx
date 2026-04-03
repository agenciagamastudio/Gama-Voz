'use client'

import React, { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginModal() {
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login, error } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await login(password)
      setPassword('')
    } catch (err) {
      // Erro já está no contexto
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-void-darker border border-kinetic-limon/20 rounded-2xl p-8 max-w-md w-full mx-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-black text-kinetic-limon mb-2">Gama Monitor</h1>
          <p className="text-text-secondary text-sm">Autenticação necessária</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-white mb-2">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha para acessar"
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-void-dark border border-white/10 rounded-lg text-white placeholder-text-secondary/50 focus:outline-none focus:border-kinetic-limon transition-colors disabled:opacity-50"
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !password.trim()}
            className="w-full px-4 py-3 bg-kinetic-limon text-black font-bold rounded-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Autenticando...' : 'Entrar'}
          </button>
        </form>

        {/* Info */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-xs text-text-secondary text-center">
            Padrão: <code className="text-kinetic-limon font-mono">admin123</code>
          </p>
        </div>
      </div>
    </div>
  )
}
