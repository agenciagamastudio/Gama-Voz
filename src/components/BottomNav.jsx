import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function BottomNav() {
  const location = useLocation();

  const getLinkClasses = (path) => {
    const isActive = path === '/' 
      ? location.pathname === '/' 
      : location.pathname.startsWith(path);
    
    return `flex flex-col items-center gap-1 transition-all duration-300 ${
      isActive ? 'text-primary' : 'text-slate-500 hover:text-slate-300'
    }`;
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/5 px-6 flex justify-between items-center z-[100] h-[64px] pb-[env(safe-area-inset-bottom)]">
      <Link to="/" className={getLinkClasses('/')}>
        <span className={`material-symbols-outlined text-[22px] ${location.pathname === '/' ? 'filled' : ''}`}>calculate</span>
        <span className="text-[9px] font-bold uppercase tracking-widest">Calc</span>
      </Link>
      
      <Link to="/diagnostico-de-valor" className={getLinkClasses('/diagnostico-de-valor')}>
        <span className={`material-symbols-outlined text-2xl ${location.pathname.startsWith('/diagnostico-de-valor') ? 'filled' : ''}`}>analytics</span>
        <span className="text-[10px] font-black uppercase tracking-widest">Diag</span>
      </Link>

      <Link to="/history" className={getLinkClasses('/history')}>
        <span className={`material-symbols-outlined text-2xl ${location.pathname.startsWith('/history') ? 'filled' : ''}`}>history</span>
        <span className="text-[10px] font-black uppercase tracking-widest">Hist</span>
      </Link>

      <Link to="/proposal/preview" className={getLinkClasses('/proposal/preview')}>
        <span className={`material-symbols-outlined text-2xl ${location.pathname.startsWith('/proposal') ? 'filled' : ''}`}>description</span>
        <span className="text-[10px] font-black uppercase tracking-widest">Doc</span>
      </Link>
    </nav>
  );
}

export default BottomNav;
