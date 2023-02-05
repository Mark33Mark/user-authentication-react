import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from "./providers/auth-provider"
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>

);