'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navigation } from '../../components/Navigation';
import { CatalogSidebar } from '../../components/CatalogSidebar';
import { docsData } from '../../data/docs';

// Group products by category (mesmo do sidebar)
const categories = [
  { id: 'IA', name: '🤖 Inteligência Artificial', color: 'from-blue-500/20 to-purple-500/20' },
  { id: 'Finanças', name: '💰 Finanças & Gestão', color: 'from-green-500/20 to-emerald-500/20' },
  { id: 'Entretenimento', name: '📻 Entretenimento & Social', color: 'from-pink-500/20 to-rose-500/20' },
  { id: 'Dev Tools', name: '🔀 Ferramentas de Desenvolvimento', color: 'from-orange-500/20 to-yellow-500/20' },
  { id: 'Criativo', name: '🎨 Criativo & Design', color: 'from-purple-500/20 to-indigo-500/20' },
  { id: 'Marketing', name: '📱 Marketing & Automação', color: 'from-red-500/20 to-pink-500/20' },
  { id: 'Educação', name: '🎓 Educação & Treinamento', color: 'from-cyan-500/20 to-blue-500/20' },
  { id: 'Infraestrutura', name: '⚙️ Infraestrutura & Ops', color: 'from-gray-500/20 to-slate-500/20' },
];

const statuses: Record<string, string> = {
  production: '🟢 Live',
  beta: '🟡 Beta',
  'coming-soon': '⚪ Em Breve',
};

export default function CatalogPage() {
  const products = Object.values(docsData);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Filter products
  const filteredProducts = products.filter(p => {
    if (selectedCategory && p.category !== selectedCategory) return false;
    if (selectedStatus && p.status !== selectedStatus) return false;
    return true;
  });

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
    setSelectedStatus(null);
    setViewMode('categories');
  };

  const handleStatusClick = (statusId: string) => {
    setSelectedStatus(selectedStatus === statusId ? null : statusId);
    setSelectedCategory(null);
    setViewMode('status');
  };

  return (
    <div className="min-h-screen bg-[var(--gama-background)]">
      <Navigation />

      {/* Grid Layout: Sidebar + Content */}
      <div className="flex pt-32">
        <CatalogSidebar
          selectedCategory={selectedCategory}
          selectedStatus={selectedStatus}
          onCategoryClick={handleCategoryClick}
          onStatusClick={handleStatusClick}
          onClearFilters={() => {
            setSelectedCategory(null);
            setSelectedStatus(null);
          }}
        />

        <main className="flex-1 transition-all duration-300">
        {/* Header */}
        <section className="py-16 border-b border-gray-800">
          <div className="max-w-6xl mx-auto px-6">
            <Link href="/docs" className="inline-block mb-4 text-sm text-[var(--gama-primary)] hover:text-white transition-colors">
              ← Voltar ao índice
            </Link>
            <h1 className="text-5xl font-black text-white mb-4">
              Catálogo de Produtos
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              {filteredProducts.length} de {products.length} produtos encontrados
            </p>
          </div>
        </section>

        {/* Results */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">Nenhum produto encontrado com esses critérios</p>
              </div>
            ) : (
              <>
                {/* By Category View */}
                {!selectedStatus && (
                  <div className="space-y-16">
                    {categories.map((category) => {
                      const categoryProducts = filteredProducts.filter(p => p.category === category.id);
                      if (categoryProducts.length === 0) return null;

                      return (
                        <div key={category.id}>
                          {/* Category Header */}
                          <div className={`mb-8 p-6 rounded-2xl bg-gradient-to-r ${category.color} border border-white/10 backdrop-blur`}>
                            <h2 className="text-3xl font-bold text-white">{category.name}</h2>
                            <p className="text-gray-400 mt-2">{categoryProducts.length} produto{categoryProducts.length !== 1 ? 's' : ''}</p>
                          </div>

                          {/* Products Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {categoryProducts.map((product) => (
                              <ProductCard key={product.id} product={product} />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* By Status View */}
                {selectedStatus && (
                  <div>
                    <div className="mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">
                      <h2 className="text-3xl font-bold text-white">
                        {statuses[selectedStatus]}
                      </h2>
                      <p className="text-gray-400 mt-2">{filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Summary Stats */}
        <section className="py-16 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-2xl font-bold text-white mb-8">Estatísticas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="glass rounded-xl p-6 text-center">
                <div className="text-3xl font-black text-[var(--gama-primary)] mb-2">
                  {products.length}
                </div>
                <div className="text-sm text-gray-400">Produtos Total</div>
              </div>
              <div className="glass rounded-xl p-6 text-center">
                <div className="text-3xl font-black text-emerald-400 mb-2">
                  {products.filter(p => p.status === 'production').length}
                </div>
                <div className="text-sm text-gray-400">Em Produção</div>
              </div>
              <div className="glass rounded-xl p-6 text-center">
                <div className="text-3xl font-black text-amber-400 mb-2">
                  {products.filter(p => p.status === 'beta').length}
                </div>
                <div className="text-sm text-gray-400">Em Beta</div>
              </div>
              <div className="glass rounded-xl p-6 text-center">
                <div className="text-3xl font-black text-cyan-400 mb-2">
                  {filteredProducts.length}
                </div>
                <div className="text-sm text-gray-400">Resultados</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 text-center text-gray-400">
        <div className="max-w-6xl mx-auto px-6">
          <p>© 2024 Grupo Gama. Explorar • Aprender • Criar</p>
        </div>
      </footer>
    </div>
  );
}

interface Product {
  id: string;
  name: string;
  category: string;
  status: string;
  icon?: string;
  description?: string;
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/docs/${product.id}`}
      className="group glass rounded-xl p-6 hover:border-[var(--gama-primary)] transition-all hover:shadow-lg hover:shadow-[var(--gama-primary)]/20"
    >
      {/* Icon + Title */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-4xl mb-3">{product.icon}</div>
          <h3 className="text-lg font-bold text-white group-hover:text-[var(--gama-primary)] transition-colors">
            {product.name}
          </h3>
        </div>
        {/* Status Badge */}
        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold whitespace-nowrap ml-2 ${
          product.status === 'production'
            ? 'bg-emerald-500/20 text-emerald-400'
            : product.status === 'beta'
            ? 'bg-amber-500/20 text-amber-400'
            : 'bg-slate-500/20 text-slate-400'
        }`}>
          {product.status === 'production' ? 'Live' : product.status === 'beta' ? 'Beta' : 'Em breve'}
        </span>
      </div>

      {/* Tagline */}
      <p className="text-sm text-gray-400 mb-4 line-clamp-2">
        {product.tagline}
      </p>

      {/* Category Tag */}
      <div className="mb-4">
        <span className="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full border border-white/20">
          {product.category}
        </span>
      </div>

      {/* Tech Stack Preview */}
      <div className="flex flex-wrap gap-2 mb-4">
        {product.techStack.slice(0, 2).map((tech: string) => (
          <span
            key={tech}
            className="text-xs bg-white/5 text-gray-300 px-2 py-1 rounded border border-white/10"
          >
            {tech}
          </span>
        ))}
        {product.techStack.length > 2 && (
          <span className="text-xs bg-white/5 text-gray-400 px-2 py-1 rounded border border-white/10">
            +{product.techStack.length - 2}
          </span>
        )}
      </div>

      {/* Arrow */}
      <div className="flex items-center text-[var(--gama-primary)] group-hover:translate-x-1 transition-transform">
        <span className="text-sm font-semibold">Ver detalhes</span>
        <span className="ml-2">→</span>
      </div>
    </Link>
  );
}
