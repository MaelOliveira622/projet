import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Connexion from './connexion/Connexion';
import Inscription from './inscription/Inscription';
import Password from './password/Password';
import Accueil from './accueil/Accueil';
import Profile from './profile/Profile';
import Favoris from './favoris/Favoris';
import Jugement from './jugement/Jugement';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/password" element={<Password />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/favoris" element={<Favoris />} />
        <Route path="/jugement" element={<Jugement />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;