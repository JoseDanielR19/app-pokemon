import { View, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import InfoPokemon from "../components/InfoPokemon";

export default function DetailScreen() {

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../images/pxfuel.jpg")}
        style={styles.background}
      >
        <View style={styles.overlay}></View>
        <InfoPokemon />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.62)",
  },
  background: {
    flex: 1,
  },
});
