'use client'

import { useState } from 'react'
import { Modal, PageHeader, DataTable, type Column } from '@/components/organisms'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'

interface SampleData {
  id: string
  name: string
  email: string
  status: 'active' | 'inactive' | 'pending'
  joinDate: string
}

const sampleData: SampleData[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    status: 'active',
    joinDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    status: 'active',
    joinDate: '2024-02-20',
  },
  {
    id: '3',
    name: 'Carol White',
    email: 'carol@example.com',
    status: 'pending',
    joinDate: '2024-03-10',
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david@example.com',
    status: 'inactive',
    joinDate: '2024-01-05',
  },
  {
    id: '5',
    name: 'Emma Davis',
    email: 'emma@example.com',
    status: 'active',
    joinDate: '2024-03-01',
  },
  {
    id: '6',
    name: 'Frank Miller',
    email: 'frank@example.com',
    status: 'active',
    joinDate: '2024-02-14',
  },
  {
    id: '7',
    name: 'Grace Lee',
    email: 'grace@example.com',
    status: 'pending',
    joinDate: '2024-03-05',
  },
  {
    id: '8',
    name: 'Henry Wilson',
    email: 'henry@example.com',
    status: 'active',
    joinDate: '2024-01-20',
  },
  {
    id: '9',
    name: 'Iris Taylor',
    email: 'iris@example.com',
    status: 'inactive',
    joinDate: '2024-02-28',
  },
  {
    id: '10',
    name: 'Jack Anderson',
    email: 'jack@example.com',
    status: 'active',
    joinDate: '2024-03-08',
  },
  {
    id: '11',
    name: 'Karen Thomas',
    email: 'karen@example.com',
    status: 'active',
    joinDate: '2024-01-30',
  },
  {
    id: '12',
    name: 'Leo Martin',
    email: 'leo@example.com',
    status: 'pending',
    joinDate: '2024-03-12',
  },
]

const columns: Column<SampleData>[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    render: (status) => (
      <Badge
        variant={status === 'active' ? 'success' : status === 'pending' ? 'warning' : 'error'}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    ),
  },
  { key: 'joinDate', label: 'Join Date', sortable: true },
]

export default function OrganismsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg'>('md')

  return (
    <div className="min-h-screen bg-gama-dark p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-display text-gama-primary font-black mb-2">🏗️ Organisms</h1>
        <p className="text-lg text-gama-text-secondary mb-12">
          Componentes complexos: Modal, PageHeader, DataTable
        </p>

        {/* Modal */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">Modal</h2>
          <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-gama-text mb-4">Tamanhos Disponíveis</h3>
                <div className="flex flex-wrap gap-4">
                  {(['sm', 'md', 'lg'] as const).map((size) => (
                    <Button
                      key={size}
                      variant="secondary"
                      onClick={() => {
                        setModalSize(size)
                        setIsModalOpen(true)
                      }}
                    >
                      Open Modal ({size})
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gama-text-secondary mb-4">Características</h3>
                <ul className="list-disc list-inside space-y-2 text-gama-text-secondary">
                  <li>Overlay escuro (50% black) que bloqueia interações</li>
                  <li>Fechável via botão X ou prop onClose</li>
                  <li>3 tamanhos: sm (384px), md (500px), lg (700px)</li>
                  <li>Header com título e close button</li>
                  <li>Body e Footer compostos</li>
                  <li>Rounded 2xl (32px) e shadow-xl</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Modal Component Rendered (conditional) */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Modal - Size: ${modalSize}`}
          size={modalSize}
        >
          <Modal.Body>
            <p className="text-gama-text mb-4">
              Este é um exemplo de modal com tamanho {modalSize}. O modal pode conter qualquer conteúdo, como
              forms, confirmações ou mensagens importantes.
            </p>
            <p className="text-gama-text-secondary">
              Clique fora do modal ou no botão X para fechá-lo.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>

        {/* PageHeader */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">PageHeader</h2>
          <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-gama-text mb-4">Com Breadcrumbs e Actions</h3>
                <PageHeader
                  title="Component Library"
                  description="Explore our complete design system with atoms, molecules, and organisms."
                  breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Components', href: '/components' },
                    { label: 'Organisms' },
                  ]}
                  actions={
                    <>
                      <Button variant="secondary">Docs</Button>
                      <Button variant="primary">Get Started</Button>
                    </>
                  }
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-gama-text mb-4">Simples (Title Apenas)</h3>
                <PageHeader
                  title="Simple Header"
                  description="Todos os campos são opcionais"
                />
              </div>

              <div>
                <h3 className="text-sm font-bold text-gama-text-secondary mb-4">Características</h3>
                <ul className="list-disc list-inside space-y-2 text-gama-text-secondary">
                  <li>Breadcrumbs com ícones ChevronRight</li>
                  <li>Title com text-2xl sm:text-3xl md:text-4xl font-black</li>
                  <li>Description em text-secondary</li>
                  <li>Actions slot flexível (qualquer ReactNode)</li>
                  <li>Responsive (flex-col em mobile)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* DataTable */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gama-text mb-8">DataTable</h2>
          <div className="bg-gama-surface rounded-xl p-8 border border-gama-surface-accent">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-gama-text mb-4">
                  Com Sort e Pagination
                </h3>
                <div className="bg-gama-darker rounded-lg p-6">
                  <DataTable<SampleData>
                    columns={columns}
                    data={sampleData}
                    pageSize={5}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gama-text-secondary mb-4">Características</h3>
                <ul className="list-disc list-inside space-y-2 text-gama-text-secondary">
                  <li>Colunas com tipo genérico T</li>
                  <li>Sorting clicável em headers (asc/desc)</li>
                  <li>Render customizado para cada coluna</li>
                  <li>Paginação com Previous/Next e page buttons</li>
                  <li>Hover states nas linhas</li>
                  <li>Status indicator mostrando página atual</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="mb-16">
          <div className="bg-gama-surface-accent border border-gama-primary/30 rounded-xl p-8">
            <p className="text-gama-text-secondary">
              <span className="font-bold text-gama-text">ℹ️ O que são Organisms?</span>
              <br />
              Organisms são componentes de alto nível feitos de múltiplos atoms e molecules. Eles
              representam seções inteiras de uma página ou aplicação, como headers, modals, tabelas de
              dados e footers. Organisms são reutilizáveis e compostos de forma elegante.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
