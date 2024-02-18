import React, { createContext, useContext, useState } from 'react';

const RepoContext = createContext();

export const RepoProvider = ({ children }) => {
  const [selectedRepoData, setSelectedRepoData] = useState(null);

  return (
    <RepoContext.Provider value={{ selectedRepoData, setSelectedRepoData }}>
      {children}
    </RepoContext.Provider>
  );
};

export const useRepoContext = () => useContext(RepoContext);
