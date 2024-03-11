import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Image,
    TouchableOpacity,
    Pressable,
    Platform,
    SafeAreaView
} from 'react-native';
import Checkbox from 'expo-checkbox';
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import LogoComponent from '../Component/Logo';
import CustomTextInput from '../Component/TextInput';
import {URL_INSCRIPTION} from "@env";

export default function Inscription({navigation}) {

    const Login = () => navigation.navigate("Login");

    const [textNom, setTextNom] = useState('');
    const [textPrenom, setTextPrenom] = useState('');
    const [dateNaiss, setDateNaiss] = useState("");
    const [textLogin, setTextLogin] = useState('');
    const [textPassword, setTextPassword] = useState('');

    const [isCheckedHomme, setCheckedHomme] = useState(false);
    const [isCheckedFemme, setCheckedFemme] = useState(false);
    const [isCheckedAutre, setCheckedAutre] = useState(false);

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const [image, setImage] = useState(null);

    const toggleDatepicker = () => {
        setShowPicker(!showPicker);
    }

    const onChangeDateNaissance = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate;
            setDate(currentDate);

            if (Platform.OS === "android") {
                toggleDatepicker();
                setDateNaiss(currentDate.toDateString());
            }
        } else {
            toggleDatepicker();
        }
    }

    const confirmDateNaissIOS = () => {
        setDateNaiss(date.toDateString());
        toggleDatepicker();
    }

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!');
        } else {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });
      
        console.log(result);
      
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
      }
    }
    
    const inscription = async () => {
        try {
            const response = await fetch(URL_INSCRIPTION, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Correction du type de contenu
                },
                body: JSON.stringify({
                    Nom: textNom,
                    Prenom: textPrenom, 
                    DateNaissance: dateNaiss,
                    Genre: isCheckedHomme ? "Homme" : isCheckedFemme ? "Femme" : "Autre",
                    Email: textLogin,
                    Password: textPassword,
                    CarteIdentite: image,
                }),
            });
            
            if (response.ok) {
                console.log("Tout va bien, les données ont été envoyées");
            } else {
                console.log("Erreur lors de la requête :", response.status);
            }
        } catch (error) {
            console.error("Erreur :", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LogoComponent />
            <Text>Prénom</Text>
            <CustomTextInput
                value={textPrenom}
                onChangeText={setTextPrenom}
                placeholder="Entrée Prénom"
            />

            <Text>Nom de Famille</Text>
            <CustomTextInput
                value={textNom}
                onChangeText={setTextNom}
                placeholder="Entrée Nom"
            />

            <Text>Date Naissance</Text>
            {showPicker && (
                <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={date}
                    onChange={onChangeDateNaissance}
                    style={styles.datePicker}
                />
            )}

            {showPicker && Platform.OS === "ios" && (
                <View style = {{flexDirection: "row", justifyContent: "space-around"}}>
                    <TouchableOpacity style={[styles.pickerButton]} onPress={toggleDatepicker}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.pickerButton]} onPress={confirmDateNaissIOS}>
                        <Text>Confirmé</Text>
                    </TouchableOpacity>
                </View>
            )}

            {!showPicker && (
                <Pressable onPress={toggleDatepicker}>
                    <TextInput
                        style={styles.input}
                        value={dateNaiss}
                        placeholder="Cliqué pour mettre votre date de naissance"
                        editable={false}
                        onPressIn={toggleDatepicker}
                    />
                </Pressable>
            )}

            <Text>Genre</Text>
            <View style={styles.section}>
                <Checkbox style={styles.checkbox} value={isCheckedHomme} onValueChange={setCheckedHomme} />
                <Text style={styles.paragraph}>Homme</Text>
                <Checkbox style={styles.checkbox} value={isCheckedFemme} onValueChange={setCheckedFemme} />
                <Text style={styles.paragraph}>Femme</Text>
                <Checkbox style={styles.checkbox} value={isCheckedAutre} onValueChange={setCheckedAutre} />
                <Text style={styles.paragraph}>Autre</Text>
            </View>

            <Text>Email</Text>
            <CustomTextInput
                value={textLogin}
                onChangeText={setTextLogin}
                placeholder="Entrée Nom"
            />

            <Text>Mot de Passe</Text>
            <CustomTextInput
                value={textPassword}
                onChangeText={setTextPassword}
                placeholder="Entrée Nom"
            />

            <Text>Carte d'identité</Text>
            <Button title="Photo carte identité" onPress={pickImage} color={'#03989E'}/>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

            <TouchableOpacity onPress={Login}>
                <Text>Vous avez un compte ? Connectez vous !</Text>
            </TouchableOpacity>
            <Button title="S'inscire" color={'#03989E'} onPress={inscription}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    checkbox: {
        margin: 8,
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    datePicker: {
        height: 120,
        marginTop: -10
    },
    pickerButton: {
        paddingHorizontal: 20,
    }
});
