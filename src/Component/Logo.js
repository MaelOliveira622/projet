import React from "react";
import { View, Image, StyleSheet } from "react-native";

const LogoComponent = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <Image source={require("../Image/Logo.png")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Styles spécifiques au conteneur, si nécessaire
  },
});

export default LogoComponent;