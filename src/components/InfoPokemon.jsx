import {
  Text,
  Image,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";
import LoadingScreen from "../components/LoadingScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function InfoPokemon() {
  const route = useRoute();
  const { pokemonName, pokemonImage, pokemonUri } = route.params;
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [pokemonInfo, setPokemonInfo] = useState({});

  const getInfoPkemon = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(pokemonUri);
      setPokemonInfo(data.abilities);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.log("Error en getInfoPkemon", error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInfoPkemon();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons
          name="arrow-back"
          color={"white"}
          size={50}
          style={{ paddingTop: 40, paddingHorizontal: 10 }}
        />
      </TouchableOpacity>
      <ImageBackground
        source={require("../images/pxfuel.jpg")}
        style={styles.background}
      >
        <View style={styles.overlay}></View>
        <View style={{ marginTop: top + 10, alignItems: "center" }}>
          <Image
            source={require("../images/logo-pokemon.png")}
            style={styles.logoImage}
          />
        </View>
        <View style={{ marginTop: 30, alignItems: "center" }}>
          <View style={styles.containerBackground}>
            <View
              style={{
                alignItems: "center",
                paddingHorizontal: 20,
                flexDirection: "row",
                flex: 1,
                marginTop: 10,
              }}
            >
              <Image
                style={{ width: 100, height: 220, resizeMode: "contain" }}
                source={{ uri: pokemonImage }}
              />
              <Text
                style={{ fontSize: 44, fontWeight: "bold", color: "white" }}
              >
                {pokemonName}
              </Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                paddingBottom: 10,
                flexDirection: "column",
                paddingHorizontal: 40,
              }}
            >
              <Text
                style={{
                  fontSize: 34,
                  fontWeight: "bold",
                  color: "white",
                  paddingBottom: 10,
                }}
              >
                Ability:
              </Text>
              {pokemonInfo.length >= 2 && (
                <>
                  <Text style={styles.textAbility}>
                    <MaterialCommunityIcons
                      name="checkbox-blank-circle"
                      size={14}
                      color= "white"
                    />{" "}
                    {pokemonInfo[0].ability.name}
                  </Text>
                  <Text style={styles.textAbility}>
                    <MaterialCommunityIcons
                      name="checkbox-blank-circle"
                      size={14}
                      color= "white"
                    />{" "}
                    {pokemonInfo[1].ability.name}
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>
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
  containerBackground: {
    backgroundColor: "rgba(50, 46, 46, 1)",
    width: 333,
    height: 239,
    borderRadius: 10,
  },
  textAbility: {
    color: "white",
    fontSize: 20,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
});
