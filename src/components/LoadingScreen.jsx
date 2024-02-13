import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading...</Text>
      <Image source={require("../images/charmander-loading.gif")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    paddingBottom: 60,
  },
});
