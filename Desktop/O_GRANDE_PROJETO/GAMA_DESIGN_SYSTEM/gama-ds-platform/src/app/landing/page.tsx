'use client'

import { ArrowRight, Rocket, Star, Code, CheckCircle, Zap, Layers, Palette, Trophy, Gauge } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { Card } from '@/components/molecules/Card'
import { GamaLogo } from '@/components/platform/GamaLogo'
import { useState, useEffect, useRef } from 'react'

// Scroll Animation Hook
function useScrollAnimation(offset = 100) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: `${offset}px` }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [offset])

  return { ref, isVisible }
}

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation()
  const { ref: benefitsRef, isVisible: benefitsVisible } = useScrollAnimation()
  const { ref: showcaseRef, isVisible: showcaseVisible } = useScrollAnimation()
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const parallaxTransform = `translateY(${scrollY * 0.5}px)`

  return (
    <div className="min-h-screen bg-gama-dark overflow-hidden">
      {/* Header Sticky */}
      <header className="sticky top-0 z-40 border-b border-gama-surface bg-gama-darker/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/landing" className="flex items-center gap-3 group hover:opacity-80 transition-opacity">
            <GamaLogo size="lg" />
            <span className="text-gama-text font-black text-lg">GAMA</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4 sm:gap-6 md:gap-8">
            <a href="#features" className="text-gama-text-secondary hover:text-gama-primary transition-colors text-sm">Features</a>
            <a href="#showcase" className="text-gama-text-secondary hover:text-gama-primary transition-colors text-sm">Showcase</a>
            <a href="#cta" className="text-gama-text-secondary hover:text-gama-primary transition-colors text-sm">CTA</a>
          </nav>
          <Link href="/components/atoms">
            <Button variant="secondary" size="sm">Design System</Button>
          </Link>
        </div>
      </header>

      {/* Hero com Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gama-primary/20 rounded-full blur-3xl" style={{ transform: parallaxTransform }}></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gama-primary/10 rounded-full blur-3xl" style={{ transform: `translateY(${scrollY * -0.3}px)` }}></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-block mb-6 animate-bounce" style={{ animationDuration: '2s' }}>
            <Badge variant="success" size="sm"><GamaLogo size="sm" className="inline mr-1" /> Design System Pro</Badge>
          </div>

          <h1 className="text-6xl md:text-7xl font-black text-gama-text mb-6 leading-tight">
            Design que <span className="text-gama-primary">Vende</span>
            <br />
            Sistema que <span className="text-gama-primary">Escala</span>
          </h1>

          <p className="text-xl text-gama-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
            Empresas líderes confiam em GAMA para criar design systems que não só parecem incríveis, mas convertem usuários em clientes. De startups a Fortune 500.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="primary" size="lg" className="group">
              Começar Agora <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
            <Button variant="secondary" size="lg">Ver Case Studies</Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 text-sm text-gama-text-secondary border-t border-gama-surface pt-8">
            <div className="flex items-center gap-2">
              <Rocket size={18} className="text-gama-primary" />
              <span>500+ Projetos</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={18} className="text-gama-primary fill-gama-primary" />
              <span>99% Satisfaction</span>
            </div>
            <div className="flex items-center gap-2">
              <Code size={18} className="text-gama-primary" />
              <span>Design System Nativo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features com Scroll Animation */}
      <section id="features" ref={featuresRef} className="max-w-7xl mx-auto px-6 py-24 border-t border-gama-surface">
        <div className={`transition-all duration-1000 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <Badge variant="info" size="sm" className="mb-4">O QUE OFERECEMOS</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gama-text mb-4">Sistema Completo</h2>
            <p className="text-gama-text-secondary max-w-2xl mx-auto">
              Tudo que você precisa para escalar design em sua empresa. Components. Tokens. Documentação. Suporte.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Palette size={32} />,
                title: 'Design Tokens',
                desc: 'Valores centralizados: cores, tipografia, espaçamento. Sincronize automaticamente com seu código.',
                benefit: '50% menos bugs de design'
              },
              {
                icon: <Layers size={32} />,
                title: 'Componentes Reutilizáveis',
                desc: 'Bibliotecas prontas de UI. Button, Card, Badge. Tudo documentado e otimizado.',
                benefit: '80% mais rápido'
              },
              {
                icon: <Zap size={32} />,
                title: 'Performance First',
                desc: 'Design systems que não deixam sua app lenta. Otimizado para 120fps.',
                benefit: 'PageSpeed 95+'
              }
            ].map((feature, i) => (
              <div
                key={i}
                style={{
                  animation: featuresVisible ? `floatIn 0.6s ease-out ${i * 0.15}s both` : 'none'
                }}
              >
                <div
                  className="rounded-2xl p-6 hover:shadow-lg transition-all group cursor-pointer h-full"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                  }}
                >
                <div className="text-gama-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gama-text mb-2">{feature.title}</h3>
                <p className="text-gama-text-secondary text-sm mb-4">{feature.desc}</p>
                <div className="text-xs bg-gama-primary/10 text-gama-primary px-3 py-1.5 rounded-full inline-block font-bold">
                  {feature.benefit}
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Glass Effect Test Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-gama-surface/30">
        <div className="relative max-w-2xl mx-auto">
          {/* Glassmorphism Card — Apple Style */}
          <div
            className="rounded-3xl p-12 shadow-lg hover:shadow-2xl transition-all duration-500"
            style={{
              background: 'rgba(255, 255, 255, 0.20)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.20)',
            }}
          >
            <div className="text-center">
              <div className="mx-auto mb-6 inline-block">
                <GamaLogo size="lg" className="text-gama-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-gama-text mb-4">
                Design System Transparente
              </h3>
              <p className="text-lg text-gama-text-secondary font-medium leading-relaxed max-w-xl mx-auto">
                Construído com clareza, precisão e propósito. Tokens semânticos, componentes reutilizáveis e documentação completa — tudo em um único lugar.
              </p>
              <div className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full" style={{ background: 'rgba(136, 206, 17, 0.15)', border: '1px solid rgba(136, 206, 17, 0.3)' }}>
                <span className="text-sm font-bold text-gama-primary">✨ Em produção</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Showcase */}
      <section id="showcase" ref={showcaseRef} className="max-w-7xl mx-auto px-6 py-24 border-t border-gama-surface">
        <div className={`transition-all duration-1000 ${showcaseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="warning" size="sm" className="mb-6">VEJA NA PRÁTICA</Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gama-text mb-6">
                Design System em Ação
              </h2>
              <p className="text-lg text-gama-text-secondary mb-8">
                Explore o Design System GAMA funcionando em tempo real. Todos os componentes documentados, animados, acessíveis.
              </p>
              <Link href="/components/atoms">
                <Button variant="primary" size="lg" className="group w-full sm:w-auto">
                  Explorar Componentes <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-gama-primary/20 to-gama-primary/5 rounded-2xl blur-2xl"></div>
              <div
                className="relative rounded-2xl p-12 flex flex-col items-center justify-center min-h-64"
                style={{
                  background: 'rgba(255, 255, 255, 0.10)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                }}
              >
                <div className="grid grid-cols-2 gap-6 mb-8 w-full max-w-xs">
                  {['Button', 'Badge', 'Card', 'Input'].map((comp, i) => (
                    <div
                      key={i}
                      className="h-16 bg-gama-primary rounded-xl flex items-center justify-center text-gama-dark font-bold text-base hover:brightness-110 transition-all cursor-pointer transform hover:scale-105 hover:shadow-lg shadow-md"
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`
                      }}
                    >
                      {comp}
                    </div>
                  ))}
                </div>
                <div className="text-center mt-6">
                  <p className="text-gama-text-secondary text-sm font-medium">
                    Clique em qualquer componente para explorar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section ref={benefitsRef} className="max-w-7xl mx-auto px-6 py-24 border-t border-gama-surface">
        <div className={`transition-all duration-1000 ${benefitsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div
            className="rounded-3xl p-12"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gama-text mb-12">Resultados Que Falam</h2>
            <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[
                { number: '500+', label: 'Projetos Completados', icon: <Rocket size={32} /> },
                { number: '98%', label: 'Taxa de Satisfação', icon: <Trophy size={32} /> },
                { number: '3x', label: 'Mais Rápido que Começar do Zero', icon: <Gauge size={32} /> }
              ].map((stat, i) => (
                <div key={i} className="text-center group cursor-pointer">
                  <div className="text-gama-primary mb-4 group-hover:scale-110 transition-transform mx-auto">
                    {stat.icon}
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-gama-primary mb-2">{stat.number}</div>
                  <p className="text-gama-text-secondary text-sm group-hover:text-gama-primary transition-colors">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="cta" ref={ctaRef} className="max-w-7xl mx-auto px-6 py-24 border-t border-gama-surface">
        <div className={`transition-all duration-1000 ${ctaVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div
            className="rounded-3xl p-16 text-center relative overflow-hidden"
            style={{
              background: 'rgba(136, 206, 17, 0.12)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(136, 206, 17, 0.25)',
            }}
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gama-primary/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl md:text-5xl font-black text-gama-text mb-6">
                Sua Marca Merece <span className="text-gama-primary">Ser Vista</span>
              </h2>
              <p className="text-lg text-gama-text-secondary mb-8 max-w-2xl mx-auto">
                Não deixe design ser um improviso. Sistemas bem estruturados crescem com você, geram conversões, e mantêm consistência em 100 páginas ou 1000.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg" className="group">
                  Agendar Demo <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
                <Button variant="secondary" size="lg">Baixar Guia (PDF)</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gama-surface mt-24 py-12 bg-gama-darker">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GamaLogo size="md" />
                <span className="text-gama-text font-black">GAMA</span>
              </div>
              <p className="text-sm text-gama-text-secondary">Design Systems que escalam.</p>
            </div>
            <div>
              <h4 className="font-bold text-gama-text mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm text-gama-text-secondary">
                <li><a href="/" className="hover:text-gama-primary transition-colors">Home</a></li>
                <li><a href="/components/atoms" className="hover:text-gama-primary transition-colors">Design System</a></li>
                <li><a href="#" className="hover:text-gama-primary transition-colors">Docs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gama-text mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-gama-text-secondary">
                <li><a href="#" className="hover:text-gama-primary transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-gama-primary transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-gama-primary transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gama-text mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gama-text-secondary">
                <li><a href="#" className="hover:text-gama-primary transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-gama-primary transition-colors">Termos</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gama-surface pt-8 text-center">
            <p className="text-xs text-gama-text-muted">© 2026 GAMA Design Systems. Feito com Motion.dev + Design System próprio.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
