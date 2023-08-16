import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Modal from 'react-modal';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
      <Router>
        <App />
      </Router>
);


Modal.setAppElement(rootElement);

