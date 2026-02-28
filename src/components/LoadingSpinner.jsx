import React from 'react';

function LoadingSpinner({ text = 'Carregando...' }) {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block">
          <div className="relative w-16 h-16">
            <div
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary animate-spin"
              style={{ animationDuration: '0.8s' }}
            />
          </div>
        </div>
        <p className="text-primary font-black text-lg mt-6 animate-pulse">
          {text}
        </p>
      </div>
    </div>
  );
}

export default LoadingSpinner;
