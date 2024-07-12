import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextApi from './Context/ContextApi.jsx'
import {BrowserRouter  as Router } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
      <Router>
    <ContextApi>
        <App />
    </ContextApi>
      </Router>
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
