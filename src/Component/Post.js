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
} from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Snackbar } from "react-native-paper";

const Post = ({ userProfileImage, username, messageContent, postImage, date }) => {
  const bottomSheetModalRef = useRef(null);
  const SnapPoint = ["15%"];
  const navigation = useNavigation(); // Récupération de la navigation

  //A changé quand backend fait, et récupérer dans login pour savoir si l'utilisateur est admin ou pas
  const isAdmin = true; // Ajout de l'état "isAdmin" pour gérer l'affichage du bouton "Supprimer" en fonction du rôle de l'utilisateur

  function handlePressModal() {
    bottomSheetModalRef.current?.present();
  }

  const [liked, setLiked] = useState(false);
  const handleLikePress = () => {
    // Logique pour gérer l'événement de clic sur le bouton "Like"
    setLiked(!liked);
  };

  const handleCommentPress = () => {
    // Logique pour gérer l'événement de clic sur le bouton "Comment"
  };

  const [favoris, setFavoris] = useState(false); // Ajout de l'état "favoris" et de la fonction "setFavoris" pour gérer l'ajout aux favoris
  const [visibleFavorisSnackBar, setVisibleFavorisSnackBar] = useState(false); //Ajout favoris
  const [visibleNoFavorisSnackBar, setVisibleNoFavorisSnackBar] = useState(false); //Retiré favoris

  const handleFavorisPress = () => {
    // Logique pour gérer l'événement de clic sur le bouton "Favoris"
    setFavoris(!favoris); // Inversion de la valeur de l'état "favoris"
    if (!favoris) {
      setVisibleFavorisSnackBar(true); // Affichage de la barre de notification
    } else {
      setVisibleNoFavorisSnackBar(true); // Affichage de la barre de notification
    }
  };

  const redirectionProfil = () => {
    navigation.navigate("Profil", { username, userProfileImage});
  }  

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate("PostDetail", {
          userProfileImage,
          username,
          messageContent,
          postImage,
          date, 
        })
      }
    >
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
            <Text style={styles.date}>{date}</Text>
            <TouchableOpacity onPress={handlePressModal}>
              <Entypo name="dots-three-vertical" size={18} color="black" />
            </TouchableOpacity>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={SnapPoint}
              enableHandlePanningGesture={false}
            >
              <View style={styles.popupContainer}>
                {isAdmin ? (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        /* logique pour la suppression */
                      }}
                      style={styles.optionContainer}
                    >
                      <MaterialCommunityIcons
                        name="delete-outline"
                        size={24}
                        color="black"
                      />
                      <Text style={styles.optionText}>Supprimer le poste</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      /* logique pour ajouter au favoris */
                    }}
                    style={styles.optionContainer}
                  >
                    <Text style={styles.optionText}>Signaler le poste</Text>
                  </TouchableOpacity>
                )}
              </View>
            </BottomSheetModal>
          </View>
          <Text style={styles.messageContent}>{messageContent}</Text>
          {postImage && (
            <Image source={{ uri: postImage }} style={styles.postImage} />
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleLikePress} style={styles.button}>
              <MaterialCommunityIcons
                name={liked ? "heart" : "heart-outline"}
                size={26}
                color={liked ? "red" : "black"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCommentPress}
              style={styles.button}
            >
              <MaterialCommunityIcons
                name="chat-outline"
                size={26}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleFavorisPress}
              style={styles.button}
            >
              <MaterialCommunityIcons
                name={favoris ? "bookmark" : "bookmark-outline"}
                size={26}
                color={favoris ? "gray" : "black"}
              />
            </TouchableOpacity>
            <Snackbar
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
            </Snackbar>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
});

export default Post;
