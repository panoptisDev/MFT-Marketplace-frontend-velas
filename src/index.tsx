import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'context/authContext';

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);