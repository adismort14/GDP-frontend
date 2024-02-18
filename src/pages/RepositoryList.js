import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRepoContext } from '../RepoContext'; 

const RepositoryList = () => {
  const location=useLocation();
  const { setSelectedRepoData } = useRepoContext(); 
  const [repositories, setRepositories] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const accessToken = queryParams.get('access_token');

  useEffect(() => {
    // const queryParams = new URLSearchParams(location.search);
    // const accessToken = queryParams.get('access_token');

    if (accessToken) {
      fetch(`https://backend-gdp.koyeb.app/user/repos?access_token=${accessToken}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Authentication failed');
        }
      })
      .then(data => {
        setRepositories(data);
      })
      .catch(error => {
        console.error('Error during authentication:', error);
      });
    }
  }, []);


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Repositories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repositories.map((repo, index) => (
          <div key={index} className="bg-white shadow-md p-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
            <Link
              to={`/dependencies/${repo.id}?access_token=${accessToken}`}
              className="block text-xl font-semibold text-blue-500 hover:underline mb-2"
              onClick={() => setSelectedRepoData(repo)}
            >
              {repo.name}
            </Link>
            <p className="text-gray-600">{repo.description || "No description available"}</p>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default RepositoryList;
