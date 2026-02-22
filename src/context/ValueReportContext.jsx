import React, { createContext, useState, useContext, useEffect } from 'react';

const ValueReportContext = createContext();

export const ValueReportProvider = ({ children }) => {
  const [reportData, setReportData] = useState(() => {
    const saved = localStorage.getItem('gama-active-value-report');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (reportData) {
      localStorage.setItem('gama-active-value-report', JSON.stringify(reportData));
    } else {
      localStorage.removeItem('gama-active-value-report');
    }
  }, [reportData]);

  const updateReportData = (data) => {
    setReportData(data);
  };

  return (
    <ValueReportContext.Provider value={{ reportData, updateReportData }}>
      {children}
    </ValueReportContext.Provider>
  );
};

export const useValueReport = () => useContext(ValueReportContext);
