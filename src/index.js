import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Test from './test';
import { Controller } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Controller>
    <App />
  </Controller>
);

