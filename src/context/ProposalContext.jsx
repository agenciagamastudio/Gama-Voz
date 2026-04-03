import React, { createContext, useState, useContext, useEffect } from 'react';

const ProposalContext = createContext();

export const ProposalProvider = ({ children }) => {
  const [proposalData, setProposalData] = useState(() => {
    // Carrega dados persistidos ao iniciar
    const saved = localStorage.getItem('gama-active-proposal');
    return saved ? JSON.parse(saved) : null;
  });

  // Atualiza o storage sempre que a proposta mudar
  useEffect(() => {
    if (proposalData) {
      localStorage.setItem('gama-active-proposal', JSON.stringify(proposalData));
    } else {
      localStorage.removeItem('gama-active-proposal');
    }
  }, [proposalData]);

  const updateProposalData = (data) => {
    setProposalData(data);
  };

  return (
    <ProposalContext.Provider value={{ proposalData, updateProposalData }}>
      {children}
    </ProposalContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProposal = () => useContext(ProposalContext);
