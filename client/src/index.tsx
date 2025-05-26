import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Claims from './Screens/Claims';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Claims />
  </React.StrictMode>
);

