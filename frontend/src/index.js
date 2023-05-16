import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AdminContextProvider } from './context/AdminContext';
import { ItemsContextProvider } from './context/ItemsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ItemsContextProvider>
      <AdminContextProvider>
        <App />
      </AdminContextProvider>
    </ItemsContextProvider>
  </React.StrictMode>
);


