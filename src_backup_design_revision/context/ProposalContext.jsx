import React, { createContext, useState, useContext } from 'react';

const ProposalContext = createContext();

export const ProposalProvider = ({ children }) => {
  const [proposalData, setProposalData] = useState(null);

  const updateProposalData = (data) => {
    setProposalData(data);
  };

  return (
    <ProposalContext.Provider value={{ proposalData, updateProposalData }}>
      {children}
    </ProposalContext.Provider>
  );
};

export const useProposal = () => useContext(ProposalContext);
