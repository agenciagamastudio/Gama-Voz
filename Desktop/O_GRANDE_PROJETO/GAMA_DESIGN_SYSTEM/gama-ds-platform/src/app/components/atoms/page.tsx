'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { Badge } from '@/components/atoms/Badge'
import { Avatar } from '@/components/atoms/Avatar'
import { Spinner } from '@/components/atoms/Spinner'
import { Toggle } from '@/components/atoms/Toggle'
import { Checkbox } from '@/components/atoms/Checkbox'

export default function AtomsPage() {
  const [toggleState, setToggleState] = useState(false)
  const [checkState, setCheckState] = useState(false)

  return (
    <div className="min-h-screen bg-gama-dark p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-display text-gama-primary font-black mb-2">🔷 Atoms</h1>
        <p className="text-lg text-gama-text-secondary mb-12">Blocos básicos reutilizáveis — Button, Input, Badge, Avatar, Spinner, Toggle, Checkbox</p>

        {/* Button */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Button</h2>
          <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent mb-6">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-gama-text mb-4">Variants</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gama-text mb-4">Sizes</h3>
                <div className="flex flex-wrap gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gama-text mb-4">States</h3>
                <div className="flex flex-wrap gap-4">
                  <Button>Normal</Button>
                  <Button disabled>Disabled</Button>
                  <Button loading>Loading</Button>
                </div>
              </div>
            </div>
          </div>
          <Link href="/components/buttons">
            <div className="bg-gama-surface hover:border-gama-primary transition-all rounded-xl p-8 border border-gama-surface-accent cursor-pointer group">
              <p className="text-sm text-gama-text-secondary uppercase font-black mb-2">Explorar Componente</p>
              <h3 className="text-lg font-black text-gama-text group-hover:text-gama-primary transition-colors">
                Ver todos os Buttons →
              </h3>
            </div>
          </Link>
        </section>

        {/* Input */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Input</h2>
          <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent max-w-md space-y-6 mb-6">
            <Input label="Nome" placeholder="Seu nome completo" />
            <Input label="Email" type="email" placeholder="seu@email.com" />
            <Input label="Senha" type="password" placeholder="••••••" showPasswordToggle />
            <Input label="Com erro" error="Campo obrigatório" value="valor inválido" onChange={() => {}} />
            <Input label="Com helper text" helperText="Máximo 20 caracteres" />
          </div>
          <Link href="/components/inputs">
            <div className="bg-gama-surface hover:border-gama-primary transition-all rounded-xl p-8 border border-gama-surface-accent cursor-pointer group max-w-md">
              <p className="text-sm text-gama-text-secondary uppercase font-black mb-2">Explorar Componente</p>
              <h3 className="text-lg font-black text-gama-text group-hover:text-gama-primary transition-colors">
                Ver todos os Inputs →
              </h3>
            </div>
          </Link>
        </section>

        {/* Badge */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Badge</h2>
          <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent space-y-6 mb-6">
            <div>
              <h3 className="text-sm font-bold text-gama-text-secondary mb-4">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Badge>Default</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gama-text-secondary mb-4">Com Dot</h3>
              <div className="flex flex-wrap gap-4">
                <Badge variant="success" withDot>Online</Badge>
                <Badge variant="error" withDot>Offline</Badge>
              </div>
            </div>
          </div>
          <Link href="/components/badges">
            <div className="bg-gama-surface hover:border-gama-primary transition-all rounded-xl p-8 border border-gama-surface-accent cursor-pointer group">
              <p className="text-sm text-gama-text-secondary uppercase font-black mb-2">Explorar Componente</p>
              <h3 className="text-lg font-black text-gama-text group-hover:text-gama-primary transition-colors">
                Ver todos os Badges →
              </h3>
            </div>
          </Link>
        </section>

        {/* Avatar */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Avatar</h2>
          <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent space-y-8 mb-6">
            <div>
              <h3 className="text-sm font-bold text-gama-text-secondary mb-4">Sizes</h3>
              <div className="flex items-center gap-6">
                <Avatar initials="AB" size="xs" />
                <Avatar initials="AB" size="sm" />
                <Avatar initials="AB" size="md" />
                <Avatar initials="AB" size="lg" />
                <Avatar initials="AB" size="xl" />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gama-text-secondary mb-4">Colors</h3>
              <div className="flex items-center gap-6">
                <Avatar initials="MC" color="#88CE11" />
                <Avatar initials="AB" color="#10B981" />
                <Avatar initials="XY" color="#3B82F6" />
              </div>
            </div>
          </div>
          <Link href="/components/avatars">
            <div className="bg-gama-surface hover:border-gama-primary transition-all rounded-xl p-8 border border-gama-surface-accent cursor-pointer group">
              <p className="text-sm text-gama-text-secondary uppercase font-black mb-2">Explorar Componente</p>
              <h3 className="text-lg font-black text-gama-text group-hover:text-gama-primary transition-colors">
                Ver todos os Avatars →
              </h3>
            </div>
          </Link>
        </section>

        {/* Spinner */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Spinner</h2>
          <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent space-y-8 mb-6">
            <div>
              <h3 className="text-sm font-bold text-gama-text-secondary mb-4">Sizes</h3>
              <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gama-text-secondary mb-4">Colors</h3>
              <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
                <Spinner color="#88CE11" />
                <Spinner color="#10B981" />
                <Spinner color="#E11D48" />
              </div>
            </div>
          </div>
          <Link href="/components/spinners">
            <div className="bg-gama-surface hover:border-gama-primary transition-all rounded-xl p-8 border border-gama-surface-accent cursor-pointer group">
              <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
                <div className="flex-shrink-0">
                  <Spinner size="lg" variant="gama-studio" color="#88CE11" />
                </div>
                <div>
                  <p className="text-sm text-gama-text-secondary uppercase font-black mb-2">Explorar Componente</p>
                  <h3 className="text-lg font-black text-gama-text group-hover:text-gama-primary transition-colors">
                    Spinner Gama Studio — Logo animada com piscar →
                  </h3>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* Toggle */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Toggle</h2>
          <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent space-y-6 mb-6">
            <Toggle label="Enable notifications" checked={toggleState} onChange={setToggleState} />
            <Toggle label="Disabled toggle" disabled />
          </div>
          <Link href="/components/toggles">
            <div className="bg-gama-surface hover:border-gama-primary transition-all rounded-xl p-8 border border-gama-surface-accent cursor-pointer group">
              <p className="text-sm text-gama-text-secondary uppercase font-black mb-2">Explorar Componente</p>
              <h3 className="text-lg font-black text-gama-text group-hover:text-gama-primary transition-colors">
                Ver todos os Toggles →
              </h3>
            </div>
          </Link>
        </section>

        {/* Checkbox */}
        <section>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Checkbox</h2>
          <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent space-y-6 mb-6">
            <Checkbox label="Agree to terms" checked={checkState} onChange={setCheckState} />
            <Checkbox label="Subscribe to newsletter" />
            <Checkbox label="Disabled checkbox" disabled />
            <Checkbox label="Indeterminate state" indeterminate />
          </div>
          <Link href="/components/checkboxes">
            <div className="bg-gama-surface hover:border-gama-primary transition-all rounded-xl p-8 border border-gama-surface-accent cursor-pointer group">
              <p className="text-sm text-gama-text-secondary uppercase font-black mb-2">Explorar Componente</p>
              <h3 className="text-lg font-black text-gama-text group-hover:text-gama-primary transition-colors">
                Ver todos os Checkboxes →
              </h3>
            </div>
          </Link>
        </section>
      </div>
    </div>
  )
}
