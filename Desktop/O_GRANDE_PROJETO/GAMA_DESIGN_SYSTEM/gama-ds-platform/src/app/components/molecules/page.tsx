'use client'

import { useState } from 'react'
import { FormField, Card, Alert, Dropdown, Tooltip } from '@/components/molecules'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'

export default function MoleculesPage() {
  const [selectedDropdown, setSelectedDropdown] = useState('')
  const [formData, setFormData] = useState({ email: '', password: '' })

  const dropdownOptions = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'angular', label: 'Angular' },
  ]

  return (
    <div className="min-h-screen bg-gama-dark p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-display text-gama-primary font-black mb-2">🔗 Molecules</h1>
        <p className="text-lg text-gama-text-secondary mb-12">Combinações de atoms: FormField, Card, Alert, Dropdown, Tooltip</p>

        {/* FormField */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">FormField</h2>
          <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-gama-text mb-4">Com Label e Helper Text</h3>
                <div className="max-w-sm">
                  <FormField
                    label="Email Address"
                    name="email"
                    helperText="We'll never share your email address."
                  >
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      className="w-full bg-gama-darker border border-gama-surface-accent rounded-lg px-4 py-2 text-gama-text placeholder-gama-text-secondary focus:border-gama-primary focus:outline-none transition-all"
                    />
                  </FormField>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gama-text mb-4">Com Erro e Campo Obrigatório</h3>
                <div className="max-w-sm">
                  <FormField
                    label="Password"
                    name="password"
                    error="Password must be at least 8 characters"
                    required
                  >
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-gama-darker border border-gama-error rounded-lg px-4 py-2 text-gama-text placeholder-gama-text-secondary focus:border-gama-error focus:outline-none transition-all"
                    />
                  </FormField>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gama-text mb-4">Com Componente Input Atom</h3>
                <div className="max-w-sm">
                  <FormField label="Full Name" name="name" helperText="Enter your complete name">
                    <Input placeholder="John Doe" onChange={() => {}} />
                  </FormField>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Card */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Card</h2>
          <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-gama-text mb-4">Default Variant</h3>
                <Card>
                  <Card.Header>
                    <h3 className="text-lg font-bold text-gama-text">Card Title</h3>
                  </Card.Header>
                  <Card.Body>
                    <p className="text-gama-text-secondary">
                      Cards são containers elegantes para agrupar conteúdo relacionado com padding, borda e espaçamento.
                    </p>
                  </Card.Body>
                  <Card.Footer>
                    <Button variant="primary">Action</Button>
                    <Button variant="ghost">Cancel</Button>
                  </Card.Footer>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gama-text mb-4">Elevated Variant</h3>
                <Card variant="elevated">
                  <Card.Header>
                    <h3 className="text-lg font-bold text-gama-text">Elevated Card</h3>
                  </Card.Header>
                  <Card.Body>
                    <p className="text-gama-text-secondary">
                      Variant elevado com shadow para maior destaque visual.
                    </p>
                  </Card.Body>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gama-text mb-4">Outlined Variant</h3>
                <Card variant="outlined">
                  <Card.Header>
                    <h3 className="text-lg font-bold text-gama-text">Outlined Card</h3>
                  </Card.Header>
                  <Card.Body>
                    <p className="text-gama-text-secondary">
                      Variant com borda primary para destaque sutil.
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Alert */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Alert</h2>
          <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-gama-text-secondary mb-4">Variants</h3>
                <div className="space-y-3">
                  <Alert variant="success" title="Success!">
                    Your action was completed successfully.
                  </Alert>
                  <Alert variant="warning" title="Warning">
                    Please review this important information before proceeding.
                  </Alert>
                  <Alert variant="error" title="Error Occurred">
                    Something went wrong. Please try again.
                  </Alert>
                  <Alert variant="info" title="Information">
                    This is an informational message for the user.
                  </Alert>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gama-text-secondary mb-4">Dismissible Alert</h3>
                <Alert variant="success" title="Success" dismissible>
                  This alert can be closed by clicking the X button.
                </Alert>
              </div>
            </div>
          </div>
        </section>

        {/* Dropdown */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Dropdown</h2>
          <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-gama-text mb-4">Basic Dropdown</h3>
                <div className="max-w-sm">
                  <FormField label="Choose a framework" name="framework">
                    <Dropdown
                      options={dropdownOptions}
                      placeholder="Select a framework..."
                      value={selectedDropdown}
                      onChange={setSelectedDropdown}
                    />
                  </FormField>
                </div>
                {selectedDropdown && (
                  <p className="text-gama-text-secondary mt-4">Selected: {selectedDropdown}</p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-bold text-gama-text mb-4">Disabled Dropdown</h3>
                <div className="max-w-sm">
                  <Dropdown
                    options={dropdownOptions}
                    placeholder="Disabled dropdown..."
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tooltip */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Tooltip</h2>
          <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
            <div className="space-y-16">
              <div>
                <h3 className="text-lg font-bold text-gama-text mb-8">Posições</h3>
                <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 justify-center py-8">
                  <Tooltip content="Top tooltip" position="top">
                    <Button variant="secondary">Hover - Top</Button>
                  </Tooltip>
                  <Tooltip content="Bottom tooltip" position="bottom">
                    <Button variant="secondary">Hover - Bottom</Button>
                  </Tooltip>
                  <Tooltip content="Left tooltip" position="left">
                    <Button variant="secondary">Hover - Left</Button>
                  </Tooltip>
                  <Tooltip content="Right tooltip" position="right">
                    <Button variant="secondary">Hover - Right</Button>
                  </Tooltip>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gama-text mb-4">Com Delay Customizado</h3>
                <div className="flex flex-wrap gap-4">
                  <Tooltip content="Aparece após 500ms" delay={500}>
                    <Button variant="secondary">Delay 500ms</Button>
                  </Tooltip>
                  <Tooltip content="Aparece imediatamente" delay={0}>
                    <Button variant="secondary">Delay 0ms</Button>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Composition Example */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Composição Completa</h2>
          <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
            <Card>
              <Card.Header>
                <h3 className="text-lg font-bold text-gama-text">Contact Form</h3>
              </Card.Header>
              <Card.Body>
                <div className="space-y-4">
                  <FormField label="Email" name="email" required>
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      onChange={() => {}}
                    />
                  </FormField>
                  <FormField label="Subject" name="subject">
                    <Input placeholder="Subject..." onChange={() => {}} />
                  </FormField>
                  <FormField label="Framework" name="framework">
                    <Dropdown
                      options={dropdownOptions}
                      placeholder="Select framework..."
                      onChange={setSelectedDropdown}
                    />
                  </FormField>
                </div>
              </Card.Body>
              <Card.Footer>
                <Button variant="primary">Submit</Button>
                <Button variant="ghost">Cancel</Button>
              </Card.Footer>
            </Card>
            <div className="mt-6">
              <Alert variant="info" title="Tip">
                Molecules são compostos por atoms reutilizáveis criados juntos de forma elegante.
              </Alert>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
