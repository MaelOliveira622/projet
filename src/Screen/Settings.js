import React from "react";
import {StyleSheet, Text, View, TextInput, Button, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import LogoComponent from '../Component/Logo';
import {URL_DECONNECTION} from "@env";

const Deconnexion = async ({navigation}) => {
    try {
      const response = await fetch(URL_DECONNECTION, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        console.log("Déconnexion ok");
        navigation.navigate("Login");
      } else {
        console.log("Erreur lors de la requête :", response.status);
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };


export default function Settings({navigation}) {

    const handleLougout = ({navigation}) => {
        Alert.alert('', 'Êtes-vous sûr de vouloir vous déconnecter ?', [
            {
                text: 'ANNULER',
                onPress: () => console.log('Annulation de la déconnexion'),
                style: 'cancel'
            },     
            {
                text: 'SE DECONNECTER', 
                onPress: () => Deconnexion({navigation}),
            }
        ])
    }

    const redirectionFiltre = () => {
      navigation.navigate("Filtre");
    }

    //Direction vers la modération de post
    const redirectionModeration = () => {
      navigation.navigate("PostModeration"); 
    }

    //Direction vers la désactivation / réactivation de poste
    const redirectionDRCompte = () => {
      navigation.navigate("TopTab");
    }
    //Direction vers la création de compte admin/super-admin
    const redirectionCreation = () => {
      navigation.navigate("CreationCompte")
    }

    //Direction vers les stats
    const redirectionStatistique = () => {
      navigation.navigate("Statistique")
    }

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <LogoComponent />
            <TouchableOpacity onPress={redirectionFiltre}>
              <Text>Filtré catégorie</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Favoris')}>
                <Text>Favoris</Text>
            </TouchableOpacity>    
            <TouchableOpacity onPress={redirectionModeration}>
                <Text>Validation post (modérateur)</Text>
            </TouchableOpacity>    
            <TouchableOpacity onPress={redirectionDRCompte}>
                <Text>Désactiver / Réactivé un compte</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={redirectionCreation}>
                <Text>Création compte admin / super-admin</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={redirectionStatistique}>
                <Text>Statistique</Text>
            </TouchableOpacity>
            <Button title="Déconnexion" onPress={() => handleLougout({navigation})} />
        </View>
    )
}