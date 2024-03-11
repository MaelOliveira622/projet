import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import CustomTextInput from '../Component/TextInput';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const MotDePasseOublieScreen = ({navigation}) => {

  const login = () => {
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style = {styles.icon}>
        <MaterialCommunityIcons name="arrow-left" size={50} color="black" onPress={login}/>
      </View>
       <Text style={styles.textTitle}>Retrouver votre compte</Text>
       <Text>Pour pouvoir retrouver votre compte, veuillez entrer votre adresse mail</Text>
       <CustomTextInput placeholder="Adresse mail" />
      <Button title="Continuer" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  icon: {
    position: 'absolute',
    top: 30,
    left: 10, 
  }, 
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default MotDePasseOublieScreen;
