import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../images/Logo.png';
import './Connexion.css';

function Connexion() {
  const [formData, setFormData] = useState({
    email: '',
    mot_de_passe: '',
    error: '',
  });

  const { email, mot_de_passe, error } = formData;

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !mot_de_passe) {
      setFormData({
        ...formData,
        error: "Veuillez remplir tous les champs.",
      });
    } else {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, mot_de_passe }),
        });
        if (!response.ok) {
          throw new Error('Identifiants incorrects');
        }
        const { accessToken } = await response.json(); 
        localStorage.setItem('token', accessToken);
        window.location.href = '/accueil';
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        setFormData({
          ...formData,
          error: "Adresse e-mail ou mot de passe incorrect.",
        });
      }
    }
  };
  

  return (
    <div className="Connexion">
      <form onSubmit={handleSubmit}>
        <div className='headerLogo'>
          <img className='logo' src={logo} alt="Logo"/>
          <div className='text'>Connexion</div>
        </div>
        <div className='formConnexion'>
          {error && <p className="error-message">{error}</p>}
          <div className='textfield'>
            <TextField
              variant="outlined"
              className='form'
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />
          </div>
          <div className='textfield'>
            <TextField
              variant="outlined"
              label="Mot de passe"
              type="password"
              value={formData.mot_de_passe}
              onChange={(e) => handleChange('mot_de_passe', e.target.value)}
              required
            />
          </div>
          <Link to='/password'>Mot de passe oublié ?</Link>

          <Button className='connexion' variant="outlined" type="submit">
            Connexion
          </Button>
          
          <Link to="/inscription">Vous n'avez pas de compte ? Inscrivez-vous ici.</Link>
        </div>
      </form>
    </div>
  );
}

export default Connexion;
