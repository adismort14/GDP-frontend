import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      fetch('http://localhost:5000/auth/github/access_token', {
        method: 'POST',
        body: JSON.stringify({ code }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json(); 
        } else {
          console.error('Authentication failed');
          throw new Error('Authentication failed'); 
        }
      })
      .then(data => { 
        navigate(`/repositories?access_token=${data.access_token}`);
      })      
      .catch(error => {
        console.error('Error during authentication:', error);
      });

      console.log('Authorization code:', code);
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center underline">GitHub Authentication!</h1>
      <a href="https://github.com/login/oauth/authorize?client_id=799ee155880cefccfcb2">
        <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
          Login with GitHub
        </button>
      </a>
    </div>
  );
  
};

export default Auth;
