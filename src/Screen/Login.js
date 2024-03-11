import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button, TouchableOpacity, SafeAreaView} from 'react-native';
import LogoComponent from '../Component/Logo';
import CustomTextInput from '../Component/TextInput';
import Checkbox from 'expo-checkbox';
import {URL_LOGIN} from "@env";

export default function Login({navigation}) {
    const Inscription = () => navigation.navigate("Inscription");
    const MotDePasseOublie = () => navigation.navigate("MotDePasseOublie");
    const Home = () => navigation.navigate("BottomTab")

    const [textLogin, setTextLogin] = useState('');
    const [textPassword, setTextPassword] = useState('');
    const [isCheckedStayLogger, setCheckedStayLogged] = useState(false); 

    const login = async () => {
        if (textLogin === "" || textPassword === "") {
            console.log("Veuillez remplir tous les champs");
            return;
        }
        else {
            try {
                const response = await fetch(URL_LOGIN, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: textLogin,
                        password: textPassword,
                    }),
                });
                if (response.ok) {
                    console.log("Tout va bien, les données ont été envoyées");
                    Home(); 
                } else {
                    console.log("Erreur lors de la requête :", response.status);
                }
            } catch (error) {
                console.error("Erreur :", error);
            }
            setTextLogin('');
            setTextPassword('')
        }
    }; 

    return (
        <SafeAreaView style={styles.container}>
            <LogoComponent />
            <View style={styles.interface}>
                <CustomTextInput
                    value={textLogin}
                    onChangeText={setTextLogin}
                    placeholder="Email"
                />
                <CustomTextInput
                    value={textPassword}
                    onChangeText={setTextPassword}
                    placeholder="Mot de passe"
                    secureTextEntry={true}
                />
            </View>
            <View>
                <TouchableOpacity onPress={MotDePasseOublie}>
                    <Text style={styles.login}>Mot de passe oublié ?</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textCheckbox}>
            <Checkbox style={styles.checkbox} value={isCheckedStayLogger} onValueChange={setCheckedStayLogged} />
                <Text style={styles.text}>Rester Connecté ?</Text>
                </View>    
            <Button title='Connexion' color={'#03989E'} onPress={login}/>
            <TouchableOpacity onPress={Inscription}>
                    <Text style={styles.inscription}>Pas inscrit ? Inscrivez vous !</Text>
                </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    checkbox: {
        margin: 8,
    },
    text: {
        color: "#171717",
    },
    textCheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    login: {
        fontWeight: 'bold',
        color: 'blue', 
        alignItems: 'center',
    }, 
    inscription: {
        fontWeight: 'bold',
        color: 'blue', 
        marginTop: 20, 
        alignItems: 'center',
    },
})
