import React, { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native"; // Importation de useNavigation
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Button,
  Pressable,
} from "react-native";
import "react-native-gesture-handler";

const PostModerationComponent = ({ userProfileImage, username, messageContent, postImage, date, onOkButton, onDeleteButton }) => {
  const navigation = useNavigation(); // Récupération de la navigation


  const redirectionProfil = () => {
    navigation.navigate("Profil", { username, userProfileImage});
  }  

  return (
      <SafeAreaView style={styles.container}>
        {userProfileImage && (
          <TouchableOpacity onPress={redirectionProfil}>
          <Image
            source={{ uri: userProfileImage }}
            style={styles.userProfileImage}
          />
          </TouchableOpacity>
        )}
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.username}>{username}</Text>
          </View>
          <Text style={styles.messageContent}>{messageContent}</Text>
          {postImage && (
            <Image source={{ uri: postImage }} style={styles.postImage} />
          )}
            <View style={styles.iconContainer2}>
            <Pressable onPress={() => onOkButton()}>
              <Text style={styles.buttonOK}>Ok Post</Text>
            </Pressable>  
            <Pressable onPress={() => onDeleteButton()}>
              <Text style={styles.buttonNon}>Non Post</Text>
            </Pressable>
            </View>
            {/* <Snackbar
              visible={visibleFavorisSnackBar}
              onDismiss={() => setVisibleFavorisSnackBar(false)}
              duration={1000}
            >
              Vous avez ajouté ce post au favoris !
            </Snackbar>
            <Snackbar
              visible={visibleNoFavorisSnackBar}
              onDismiss={() => setVisibleNoFavorisSnackBar(false)}
              duration={1000}
            >
              Vous avez retiré ce post des favoris !
            </Snackbar> */}
        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  contentContainer: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    fontSize: 15, 
    marginBottom: 2,
  },
  date: {
    color: "gray",
    marginTop: 3, 
    marginRight: 150,
    fontSize: 12,
  },
  messageContent: {
    fontSize: 16,
  },
  postImage: {
    width: "100%", // Ajustez la largeur selon vos besoins
    height: 200, // Ajustez la hauteur selon vos besoins
    marginTop: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 80,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  popupContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center", // Alignement vertical au centre
  },
  optionText: {
    marginLeft: 10, // Marge à gauche pour séparer l'icône du texte
    fontSize: 18, 
  },
  iconContainer2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14, 
    left: -30,
  },
  buttonOK: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  buttonNon: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  });

export default PostModerationComponent;
