'use client'

import Link from 'next/link'
import { useState } from 'react'

const categories = [
  {
    name: 'IA & Automação',
    items: ['AIOS', 'VOZ', 'Jarvis', 'Engine IA'],
  },
  {
    name: 'Finanças',
    items: ['Financeiro', 'NFSe'],
  },
  {
    name: 'Educação',
    items: ['Education', 'Onboarding'],
  },
  {
    name: 'Dev Tools',
    items: ['Git', 'Monitor'],
  },
  {
    name: 'Marketing',
    items: ['Cronogramas'],
  },
  {
    name: 'Entretenimento',
    items: ['Rádio'],
  },
  {
    name: 'Criativo',
    items: ['Photo', 'Studio'],
  },
  {
    name: 'Utilidades',
    items: ['Calculadora', 'Extensão'],
  },
]

const productSlug: Record<string, string> = {
  AIOS: 'aios',
  VOZ: 'voz',
  Jarvis: 'jarvis',
  'Engine IA': 'engine-ia',
  Financeiro: 'financeiro',
  NFSe: 'nfse',
  Education: 'education',
  Onboarding: 'onboarding',
  Git: 'git',
  Monitor: 'monitor',
  Cronogramas: 'cronogramas',
  Rádio: 'radio',
  Photo: 'photo',
  Studio: 'studio',
  Calculadora: 'calculadora',
  Extensão: 'extensao',
}

export default function DocNavSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-40 rounded-full bg-[#88CE11] px-4 py-3 font-black text-black md:hidden"
      >
        ☰
      </button>

      <aside
        className={`fixed left-0 top-0 z-30 h-screen w-64 border-r border-white/10 bg-black/80 backdrop-blur transition-all md:w-full ${
          open ? 'translate-x-0' : '-translate-x-full'
        } md:static md:translate-x-0 md:border-none md:bg-transparent md:backdrop-blur-none`}
      >
        <div className="h-full overflow-y-auto p-6">
          <Link href="/docs" className="mb-8 block text-xl font-black text-[#88CE11]">
            ← Voltar
          </Link>

          {categories.map((category) => (
            <div key={category.name} className="mb-8">
              <h3 className="mb-3 text-sm font-bold uppercase text-gray-400">{category.name}</h3>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item}>
                    <Link
                      href={`/docs/${productSlug[item]}`}
                      className="text-gray-300 transition hover:text-[#88CE11]"
                      onClick={() => setOpen(false)}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>
    </>
  )
}
