import React from "react";
import { Text, StyleSheet, View, Image} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Compte = ({ userProfileImage, Username }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Image
                    source={{ uri: userProfileImage}}
                    style={styles.userProfileImage}
                 />   
                 <Text>{Username}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userProfileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
      },
});

export default Compte;