import DocLayout from '@/app/components/docs/DocLayout'
import FeatureCard from '@/app/components/docs/FeatureCard'
import TechBadge from '@/app/components/docs/TechBadge'
import DocNavSidebar from '@/app/components/docs/DocNavSidebar'

export const metadata = { title: 'GAMA Extensao - Browser Extension' }

export default function ExtensaoDoc() {
  return <div className="flex min-h-screen bg-[#161616]"><DocNavSidebar /><div className="w-full flex-1"><DocLayout title="GAMA Extensao" description="Chrome Extension"><section className="mb-16"><h2 className="mb-6 text-3xl font-black">O que eh Extensao?</h2><p className="text-gray-300">Extensao de navegador que leva os poderes de GAMA diretamente para o browser.</p></section><section className="mb-16"><h2 className="mb-6 text-3xl font-black">Features</h2><div className="grid gap-4 md:grid-cols-2"><FeatureCard icon="🔌" title="Integracao" description="Funciona em qualquer site" /><FeatureCard icon="⚡" title="Rapido" description="Sem latencia" /><FeatureCard icon="🔒" title="Privado" description="Processa localmente" /><FeatureCard icon="🎯" title="Contexto" description="Entende pagina" /></div></section><section className="mb-16"><h2 className="mb-6 text-3xl font-black">Tech Stack</h2><div className="flex flex-wrap gap-3"><TechBadge name="Chrome MV3" /><TechBadge name="React" /><TechBadge name="TypeScript" /><TechBadge name="Vite" /></div></section></DocLayout></div></div>
}
