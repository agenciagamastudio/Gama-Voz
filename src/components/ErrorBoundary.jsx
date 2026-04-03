import React from 'react';

/**
 * Error Boundary Component
 * Catches React errors and displays fallback UI instead of white screen
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch() {
    // Error caught and handled by ErrorBoundary
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center">
          <div className="text-center px-6">
            <h1 className="text-3xl font-black text-primary mb-4">
              ⚠️ Algo deu errado
            </h1>
            <p className="text-gray-400 text-lg mb-6">
              Desculpe, encontramos um erro. Tente recarregar a página.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary text-black font-bold rounded-lg hover:opacity-80 transition"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
