import React from 'react';
import ReactDOM from 'react-dom/client'; 
import AppWrapper from './AppWrapper';
import './index.css'; 

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AppWrapper /> {}
  </React.StrictMode>
);