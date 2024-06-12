import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { RadioGroup, TextField, Radio, FormControlLabel } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Link } from 'react-router-dom';
import logo from '../images/Logo.png';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './Inscription.css';

function Inscription() {
  const [formData, setFormData] = useState({
    email: '',
    mot_de_passe: '',
    nom: '',
    prenom: '',
    genre: '',
    date_de_naissance: null,
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRadioChange = (event) => {
    handleChange('genre', event.target.value);
  };

  const handleDateChange = (date) => {
    handleChange('date_de_naissance', date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.mot_de_passe || !formData.nom || !formData.prenom || !formData.genre || !formData.date_de_naissance) {
      toast.error('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/signup', formData);
      console.log('Réponse du serveur:', response.data);

      localStorage.setItem('token', response.data.token);

      window.location.href = '/accueil';
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
      toast.error('Une erreur s\'est produite lors de l\'inscription. Veuillez réessayer.');
    }
  };

  return (
    <div className="Inscription">
      <form onSubmit={handleSubmit}>
        <div className='headerLogo'>
          <img className='logo' src={logo} alt="Logo"/>
          <div className='text'>Inscription</div>
        </div>
        <div className='formInscription'>
          <div className='textfield'>
            <TextField
              variant="outlined"
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
          <div className='textfield'>
            <TextField
              variant="outlined"
              label="Nom"
              value={formData.nom}
              onChange={(e) => handleChange('nom', e.target.value)}
              required
            />
          </div>
          <div className='textfield'>
            <TextField
              variant="outlined"
              label="Prénom"
              value={formData.prenom}
              onChange={(e) => handleChange('prenom', e.target.value)}
              required
            />
          </div>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="test"
            name="radio-buttons-group"
            value={formData.genre}
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value="femme"
              control={<Radio />}
              label="Femme"
              onChange={() => handleChange('genre', 'femme')}
            />
            <FormControlLabel
              value="homme"
              control={<Radio />}
              label="Homme"
              onChange={() => handleChange('genre', 'homme')}
            />
            <FormControlLabel
              value="autre"
              control={<Radio />}
              label="Autre"
              onChange={() => handleChange('genre', 'autre')}
            />
          </RadioGroup>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="Date de naissance"
                          value={formData.date_de_naissance}
                          onChange={(date) => handleDateChange(date)}
                          required/>
            </DemoContainer>
          </LocalizationProvider>
          <Button className='inscription' variant="outlined" type="submit">
            Inscription
          </Button>
          <Link to="/">Vous avez déjà un compte ? Connectez-vous ici.</Link>
        </div>
      </form>
    </div>
  );
}

export default Inscription;
