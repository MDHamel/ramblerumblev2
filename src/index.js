import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Test from './test';
import { Controller } from './context';
import Game from './pages/game';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

let router = createBrowserRouter([
  {
    path: "/",
    Component() {
      return <App></App>;
    },
  },
  {
    path: "/timed",
    Component() {
      return <Game />;
    },
  },
  {
    path: "/hiscore",
    Component() {
      return <Game />;
    },
  }
]);


root.render(
  <Controller>
    <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
  </Controller>
);

