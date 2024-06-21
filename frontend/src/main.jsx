import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextApi from './Context/ContextApi.jsx'
import {BrowserRouter  as Router } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
      <Router>
  <React.StrictMode>
    <ContextApi>
        <App />
    </ContextApi>
  </React.StrictMode>
      </Router>
)
