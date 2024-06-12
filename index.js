// index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './App';

const root = document.getElementById('root');
const rootInstance = createRoot(root);

rootInstance.render(
  <React.StrictMode>
    <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-L8Kj9b9y7Jsk7FtVXapvNqLaUhvS5gYj1T1f6n/eMVQcjVxv5+sZ8Almg3TDz27iNMH09cmqUch67fP8pN9ppw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    </head>
    <App />
  </React.StrictMode>
);