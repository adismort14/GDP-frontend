import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRepoContext } from '../RepoContext';

const Dependencies = () => {
  const location = useLocation();
  const { selectedRepoData } = useRepoContext();
  const [dependencies, setDependencies] = useState([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get('access_token');
    const ownerName = selectedRepoData.owner.login;
    const repoName = selectedRepoData.name;

    if (accessToken) {
      fetch(`https://gdp-backend.backend.koyeb:5000/repo/dependencies?ownerName=${ownerName}&repoName=${repoName}&accessToken=${accessToken}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            console.error('Failed to fetch dependencies');
          }
        })
        .then(data => {
          console.log(data);
          setDependencies(data); // Set dependencies in state
        })
        .catch(error => {
          console.error('Error fetching dependencies:', error);
        });
    }
  }, [location.search]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Repository Name: {selectedRepoData.name}</h1>
      <h2 className="text-xl font-semibold mb-2">Project Dependencies:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {dependencies.map((dependency, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">{dependency.split(':')[0]}</h3>
            <p className="text-sm text-gray-600">{dependency.split(':')[1]}</p>
          </div>
        ))}
      </div>
    </div>
  );
  
  
};

export default Dependencies;
