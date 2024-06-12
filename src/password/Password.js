import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';  // Import TextField
import logo from '../images/Logo.png';

import './Password.css';



function Password() {
  const [formData, setFormData] = useState({
    motDePasse: '',
    motDePasseConfirmed: '',
  });



  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Données soumises :', formData);
  };

  return (
    <div className="Password">
      <form onSubmit={handleSubmit}>
        <div className='headerLogo'>
          <img className='logo' src={logo}/>
          <div className='text'>Mot de passe oublié</div>
        </div>
        <div className='textfield'>
            <TextField
              variant="outlined"
              label="Nouveau mot de passe"
              type="password"
              value={formData.motDePasse}
              onChange={(e) => handleChange('motDePasse', e.target.value)}
              required
            />
          </div>
          <div className='textfield'>
            <TextField
              variant="outlined"
              label="Confirmé le mot de passe"
              type="password"
              value={formData.motDePasseConfirmed}
              onChange={(e) => handleChange('motDePasseConfirmed', e.target.value)}
              required
            />
          </div>
          <Button className='password' variant="outlined" type="submit">
            Réinitialiser
          </Button>
      </form>
    </div>
  );
}

export default Password;