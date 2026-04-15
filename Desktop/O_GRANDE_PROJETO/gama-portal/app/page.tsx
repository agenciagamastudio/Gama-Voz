'use client';

import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { BrandStory } from './components/BrandStory';
import { ProductGrid } from './components/ProductGrid';
import { CapabilityCard } from './components/CapabilityCard';
import { CatalogSidebar } from './components/CatalogSidebar';
import { products } from './data/products';
import { capabilities } from './data/capabilities';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const featured = products.filter((p) => p.featured);

  // Filter all products
  const filteredProducts = products.filter(p => {
    if (selectedCategory && p.category !== selectedCategory) return false;
    if (selectedStatus && p.status !== selectedStatus) return false;
    return true;
  });

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
    setSelectedStatus(null);
  };

  const handleStatusClick = (statusId: string) => {
    setSelectedStatus(selectedStatus === statusId ? null : statusId);
    setSelectedCategory(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[var(--gama-background)]">
      <Navigation />

      {/* Flex container: sidebar + main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div id="products-start" className="flex-shrink-0">
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
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">

      {/* Hero Section */}
      <section className="pt-32">
        <HeroSection />
      </section>

      {/* Brand Story Section */}
      <BrandStory />

      {/* Key Capabilities Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: 'rgba(136, 206, 17, 0.1)' }} />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Recursos <span className="text-[var(--gama-primary)]">Poderosos</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
              Gama oferece tudo o que você precisa para construir automação com IA, do zero até escala.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((capability, index) => (
              <CapabilityCard key={capability.id} {...capability} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              Produtos em <span className="text-[var(--gama-primary)]">Destaque</span>
            </h2>
            <p className="text-gray-400">Conheça os produtos mais populares do ecossistema Gama</p>
          </div>
          <ProductGrid products={featured} />
          <div className="mt-12 flex justify-center">
            <a
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 bg-[var(--gama-primary)] text-black font-black rounded-lg hover:brightness-110 transition-all duration-300 hover:shadow-[0_0_30px_rgba(136,206,17,0.4)]"
            >
              Ver Todos ({products.length} Produtos)
            </a>
          </div>
        </div>
      </section>

      {/* All Products - Com Sidebar e Filtros */}
      <section id="products" className="py-16 md:py-24 border-t border-gray-800 transition-all duration-300">
        <div className="mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                Todos os <span className="text-[var(--gama-primary)]">Produtos</span>
              </h2>
              <p className="text-gray-400">
                {selectedCategory || selectedStatus
                  ? `${filteredProducts.length} de ${products.length} produtos encontrados`
                  : 'Explore o catálogo completo de ferramentas e serviços'
                }
              </p>
            </div>
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="glass rounded-2xl p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
              Quer saber mais?
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Acesse nossa documentação completa para aprender como integrar e usar os produtos do Grupo Gama.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/docs"
                className="btn-primary"
              >
                Ler Documentação
              </a>
              <a
                href="https://github.com/agenciagamastudio"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg font-semibold border border-[var(--gama-primary)] text-[var(--gama-primary)] hover:bg-[var(--gama-primary)]/10 transition-colors"
              >
                GitHub da Agência
              </a>
            </div>
          </div>
        </div>
      </section>
        </div>
        {/* End main content */}
      </div>
      {/* End flex container */}

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 text-center text-gray-400">
        <div className="max-w-6xl mx-auto px-6">
          <p className="mb-4">© 2024 Grupo Gama. Todos os direitos reservados.</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-[var(--gama-primary)] transition-colors text-sm">
              Privacidade
            </a>
            <a href="#" className="hover:text-[var(--gama-primary)] transition-colors text-sm">
              Termos
            </a>
            <a href="#" className="hover:text-[var(--gama-primary)] transition-colors text-sm">
              Contato
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
