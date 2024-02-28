const express = require('express');
const bodyParser = require('body-parser'); // Importez le middleware body-parser
const session = require('express-session');

const app = express();
const port = 3000;

// Utilisez bodyParser pour traiter les données JSON dans les requêtes POST
app.use(bodyParser.json())

const crypto = require('crypto');
const secretKey = crypto.randomBytes(64).toString('hex');// Génére une clé secrète aléatoire

app.use(session({
    secret: secretKey, 
    resave: false,
    saveUninitialized: false,
  }));

  app.post('/login', (req, res) => {
    const { email, password } = req.body;

    console.log("Email:", email);
    console.log("Mot de passe:", password);

    if (email == "") {
        res.status(400).send("Renseignez l'adresse mail");
    } else if (password == "") {
        res.status(400).send("Renseignez le mot de passe");
    } else if (password.length < 8) {
        res.status(400).send("Renseignez un mot de passe d'au moins huit caractères");
    } else {
        req.session.utilisateur = {
            email,
            password,
        }
        console.log(`Données d\'authentification reçues avec succès ${req.session.utilisateur.email}`);
        console.log("Authentification réussie");
        res.status(200).send("Authentification réussie");
    }
});

app.post('/signup',(req,res) =>{
    const {Nom, Prenom, DateNaissance, Genre, Email, Password, CarteIdentite} = req.body;

    console.log("Email:", Email)
    console.log("Mot de passe:", Password);
    console.log("prénom:", Prenom);
    console.log("nom:", Nom);
    console.log("date de naissance:", DateNaissance);
    console.log("genre:", Genre);
    console.log("photo d'identité:", CarteIdentite) // partie test à supprimer une fois les tests effectué completement

    if (Email == "") {
        res.send("Renseignez l'adresse mail");
    } 
    else if(Password == "") {
        res.status(400).send("Renseignez le mot de passe")
    }
    else if(Prenom == "") {
        res.status(400).send("Renseignez votre prénom")
    }
    else if(Nom == "") {
        res.status(400).send("Renseignez votree nom")
    }
    else if(Genre == "") {
        res.status(400).send("Renseignez votre genre")
    }
    else if(DateNaissance == "") {
        res.status(400).send("Renseignez votre date de naissance")
    }
     else if(Boolean(CarteIdentite.length)) {
        res.status(400).send("ajouté une image de votre photo d'identité")
    }
    else if(Password.length <= 8) {
        res.status(400).send("renseignez un mot de passe plus long");
    }
    else{
        res.status(200).send('Données d\'authentification reçues avec succès');
        // insert into database all information 
        // A FAIRE
        req.session.utilisateur = {
        Email,
        Password,
        }
        console.log(`Données d\'authentification reçues avec succès ${req.session.utilisateur.Email}`);
    }
});

app.post('/deconnexion', (req, res) => {
    req.session.destroy();
    console.log("Fait")
    res.status(200).send("Authentification réussie");
});



app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});