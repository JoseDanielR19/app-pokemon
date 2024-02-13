import { Image, ImageBackground, StyleSheet, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Pokemons from "../components/Pokemons";

export default function HomeScreen() {
  const { top } = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../images/pxfuel.jpg")}
        style={styles.background}
      >
        <View style={styles.overlay}></View>
        <View style={{ marginTop: top + 35, alignItems: "center" }}>
          <Image
            source={require("../images/logo-pokemon.png")}
            style={styles.logoImage}
          />
        </View>
        <Pokemons />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.62)",
  },
  logoImage: {
    width: "80%",
    height: 100,
    resizeMode: "contain",
  },
});
