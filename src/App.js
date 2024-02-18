// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Auth from './pages/Auth';
import RepositoryList from './pages/RepositoryList';
import Dependencies from './pages/Dependencies';
import { RepoProvider } from './RepoContext'; // Import the RepoProvider

function App() {
  return (
    <Router>
      <RepoProvider> {/* Wrap your app with RepoProvider */}
        <div>
          <Routes>
            <Route path="/" element={<Auth />} /> 
            <Route path="/repositories" element={<RepositoryList />} />
            <Route path="/dependencies/:repoId" element={<Dependencies />} />
          </Routes>
        </div>
      </RepoProvider>
    </Router>
  );
}

export default App;
