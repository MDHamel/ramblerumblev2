import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Test from './test';
import { Controller } from './context';
import Game from './pages/game';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Controller>
    {document.location.pathname.split("/")[1]?<Game />:<App />}
  </Controller>
);

