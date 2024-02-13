import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";
import KeyBoard from "./KeyBoard";

export default function Pokemons() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [filterPokemons, setFilterPokemons] = useState([]);
  const [imgPokemons, setImgPokemons] = useState({});

  const baseUri =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

  const getPokemons = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=1290&offset=0"
      );
      for (let index = 0; index < data.results.length; index++) {
        const uri = `${baseUri}${index + 1}.png`;
        setImgPokemons((prevState) => ({
          ...prevState,
          [data.results[index].name]: uri,
        }));
      }
      setPokemons(data.results);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.log("Error en getPokemons", error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const pokemonsToDisplay =
    filterPokemons.length > 0 ? filterPokemons : pokemons;

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <KeyBoard pokemons={pokemons} setFilterPokemons={setFilterPokemons} />

      <FlatList
        horizontal={false}
        numColumns={2}
        data={pokemonsToDisplay}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item: pokemon }) => (
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() =>
              navigation.navigate("DetailScreen", {
                pokemonName: pokemon.name,
                pokemonImage: imgPokemons[pokemon.name],
                pokemonUri: pokemon.url,
              })
            }
          >
            <Image
              style={styles.cardImg}
              source={{ uri: imgPokemons[pokemon.name] }}
            />
            <Text style={styles.cardText}>{pokemon.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: "rgba(50, 46, 46, 1)",
    width: 135,
    height: 135,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  cardImg: {
    height: "75%",
    resizeMode: "contain",
  },
  cardText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  // noResult: {
  //   fontSize: 30,
  //   fontWeight: "bold",
  //   color: "white",
  //   marginTop: 40,
  // },
});
