import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Summons from './summons/summons';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Summons />
  </React.StrictMode>
);
