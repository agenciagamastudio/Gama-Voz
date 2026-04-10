(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,37792,a=>{"use strict";let e=(0,a.i(88195).default)("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);a.s(["default",()=>e])},72478,a=>{"use strict";let e=(0,a.i(88195).default)("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);a.s(["Copy",()=>e],72478)},59773,a=>{"use strict";var e=a.i(37792);a.s(["Check",()=>e.default])},69906,a=>{"use strict";var e=a.i(24014),s=a.i(72478),r=a.i(59773),t=a.i(59156);function o(){let[a,o]=(0,t.useState)(null),n=(a,e)=>{navigator.clipboard.writeText(a),o(e),setTimeout(()=>o(null),2e3)},l=`/* Cores */
--color-primary: #88CE11;
--color-dark: #161616;
--color-surface: #272727;
--color-text: #FFFFFF;
--color-text-secondary: #A1A1AA;
--color-success: #10B981;
--color-warning: #F59E0B;
--color-error: #E11D48;

/* Tipografia */
--font-primary: 'Poppins', sans-serif;
--font-code: 'JetBrains Mono', monospace;
--font-size-base: 16px;
--font-size-lg: 20px;
--font-size-2xl: 24px;

/* Espa\xe7amento */
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 12px;
--spacing-lg: 16px;
--spacing-xl: 24px;

/* Borders */
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--border-default: 1px solid rgba(255,255,255,0.1);`,i=`// tailwind.config.ts
colors: {
  'gama-primary': '#88CE11',
  'gama-dark': '#161616',
  'gama-surface': '#272727',
  'gama-text': '#FFFFFF',
  'gama-text-secondary': '#A1A1AA',
  'gama-success': '#10B981',
  'gama-warning': '#F59E0B',
  'gama-error': '#E11D48',
},
fontFamily: {
  poppins: ['Poppins', 'sans-serif'],
  'jetbrains-mono': ['JetBrains Mono', 'monospace'],
}`;return(0,e.jsx)("div",{className:"min-h-screen bg-gama-dark",children:(0,e.jsxs)("div",{className:"max-w-7xl mx-auto p-8",children:[(0,e.jsx)("h1",{className:"text-xl sm:text-2xl md:text-3xl font-black text-gama-text mb-2",children:"⚙️ Design Tokens"}),(0,e.jsx)("p",{className:"text-gama-text-secondary mb-12",children:"Dados estruturados: JSON, CSS, Tailwind. Pronto para integração."}),(0,e.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16",children:[(0,e.jsxs)("div",{className:"bg-gama-surface rounded-lg p-6 border border-gama-surface-accent hover:border-gama-primary transition-all",children:[(0,e.jsx)("h3",{className:"font-bold text-gama-text mb-2",children:"tokens.json"}),(0,e.jsx)("p",{className:"text-sm text-gama-text-secondary mb-4",children:"Arquivo de tokens em formato W3C."}),(0,e.jsx)("button",{className:"text-gama-primary text-sm font-bold hover:underline",children:"📥 Download"})]}),(0,e.jsxs)("div",{className:"bg-gama-surface rounded-lg p-6 border border-gama-surface-accent hover:border-gama-primary transition-all",children:[(0,e.jsx)("h3",{className:"font-bold text-gama-text mb-2",children:"tokens.css"}),(0,e.jsx)("p",{className:"text-sm text-gama-text-secondary mb-4",children:"CSS variables prontas para usar."}),(0,e.jsx)("button",{className:"text-gama-primary text-sm font-bold hover:underline",children:"📥 Download"})]}),(0,e.jsxs)("div",{className:"bg-gama-surface rounded-lg p-6 border border-gama-surface-accent hover:border-gama-primary transition-all",children:[(0,e.jsx)("h3",{className:"font-bold text-gama-text mb-2",children:"tailwind.config.ts"}),(0,e.jsx)("p",{className:"text-sm text-gama-text-secondary mb-4",children:"Config Tailwind gerada."}),(0,e.jsx)("button",{className:"text-gama-primary text-sm font-bold hover:underline",children:"📥 Download"})]})]}),(0,e.jsxs)("div",{className:"mb-16",children:[(0,e.jsx)("h2",{className:"text-2xl font-bold text-gama-text mb-6",children:"CSS Variables"}),(0,e.jsxs)("div",{className:"relative bg-gama-darker rounded-lg p-6 border border-gama-surface-accent overflow-x-auto",children:[(0,e.jsx)("pre",{className:"text-gama-text-secondary text-sm font-jetbrains-mono whitespace-pre-wrap",children:l}),(0,e.jsx)("button",{onClick:()=>n(l,"css"),className:"absolute top-4 right-4 p-2 bg-gama-primary text-gama-dark rounded hover:brightness-110",children:"css"===a?(0,e.jsx)(r.Check,{size:16}):(0,e.jsx)(s.Copy,{size:16})})]})]}),(0,e.jsxs)("div",{className:"mb-16",children:[(0,e.jsx)("h2",{className:"text-2xl font-bold text-gama-text mb-6",children:"Tailwind Configuration"}),(0,e.jsxs)("div",{className:"relative bg-gama-darker rounded-lg p-6 border border-gama-surface-accent overflow-x-auto",children:[(0,e.jsx)("pre",{className:"text-gama-text-secondary text-sm font-jetbrains-mono whitespace-pre-wrap",children:i}),(0,e.jsx)("button",{onClick:()=>n(i,"tailwind"),className:"absolute top-4 right-4 p-2 bg-gama-primary text-gama-dark rounded hover:brightness-110",children:"tailwind"===a?(0,e.jsx)(r.Check,{size:16}):(0,e.jsx)(s.Copy,{size:16})})]})]}),(0,e.jsxs)("div",{className:"bg-gama-surface-accent rounded-lg p-8 border border-gama-primary/30",children:[(0,e.jsx)("h3",{className:"text-lg font-bold text-gama-primary mb-4",children:"🚀 Como Usar"}),(0,e.jsxs)("div",{className:"space-y-4 text-gama-text-secondary",children:[(0,e.jsxs)("p",{children:[(0,e.jsx)("span",{className:"font-bold text-gama-text",children:"1. JSON:"})," Import e use em qualquer linguagem (JavaScript, Python, Java, etc.)"]}),(0,e.jsxs)("p",{children:[(0,e.jsx)("span",{className:"font-bold text-gama-text",children:"2. CSS:"})," Link global stylesheet e use ",(0,e.jsx)("code",{className:"bg-gama-darker px-2 py-1 rounded text-xs",children:"var(--color-primary)"})]}),(0,e.jsxs)("p",{children:[(0,e.jsx)("span",{className:"font-bold text-gama-text",children:"3. Tailwind:"})," Merge com sua config e use ",(0,e.jsx)("code",{className:"bg-gama-darker px-2 py-1 rounded text-xs",children:'className="bg-gama-primary"'})]})]})]})]})})}a.s(["default",()=>o])}]);