import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, Image, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const user = {
  username: 'John Doe',
  name: 'John',
  image: 'https://jvruwbadhnsfneaqhgps.supabase.co/storage/v1/object/sign/Wec/Drapeau/France.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJXZWMvRHJhcGVhdS9GcmFuY2UucG5nIiwiaWF0IjoxNzA5MDIxMjM0LCJleHAiOjE3NDA1NTcyMzR9.Xi_JfLK3ytuTvFnB8nZlTh3tje06Uaq5SNQhtfwqns0&t=2024-02-27T08%3A07%3A14.786Z'
}

//Fonction call Api pour publier un post
const publierPost = () => {

}

export default function PublierScreen() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);

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
  
    console.log(result.assets[0].uri);
  
    if (!result.canceled) {
        setImage(result.assets[0].uri);
    }
  }
    }    

  const quitPublier = () => {
    Alert.alert('', 'Êtes-vous sûr de vouloir quitter la publication ? Toutes modifications seront perdues.', [
      {
        text: 'ANNULER',
        onPress: () => console.log('Annuler'),
        style: 'cancel'
      },
      {
        text: 'QUITTER', 
        onPress: () => navigation.goBack(),
      }
    ])
  }

  return (
    <SafeAreaView style={style.container}>
    <View style={style.topBar}>
      <MaterialCommunityIcons
        name='close'
        size={30}
        color='black'
        onPress={() => quitPublier()}
      />  
      <Text style={style.textTopBar}>Publier</Text>
      <MaterialCommunityIcons
        name='check'
        size={30}
        color='black'
        onPress={() => {console.log('Publier')}}
      />  
    </View>   
      <View style={style.inputContainer}>
        <Image src={user.image} style={style.image} />
        <TextInput
          placeholder='Quoi de neuf ?'
          multiline
          numberOfLines={4}
          style={{flex: 1}}
        />  
      </View>
      <View style={style.imagePost}>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
      <View style={style.bottomBar}>
        <MaterialCommunityIcons
          name='image-plus'
          size={30}
          color='black'
          onPress={() => {pickImage()}}
        />  
      </View>  
    </SafeAreaView>  
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,

  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    // marginTop: 10, 
  },
  image: {
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    marginRight: 10,
    borderRadius: 50,
  }, 
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  textTopBar: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  imagePost: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  }
});
