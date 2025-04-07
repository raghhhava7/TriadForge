import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Initialize EmailJS
import emailjs from '@emailjs/browser';
emailjs.init(import.meta.env.VITE_EMAILJS_USER_ID);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
