import { Keyboard, StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { EvilIcons } from "@expo/vector-icons";

export default function KeyBoard({ pokemons, setFilterPokemons }) {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text) => {
    setSearchText(text);
    const filteredResults = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilterPokemons(filteredResults);
  };

  return (
    <View style={style.container}>
      <View style={style.inputContainer}>
        <EvilIcons name="search" size={25} color="black" />
        <TextInput
          style={style.input}
          onSubmitEditing={Keyboard.dismiss}
          placeholder="Find your pokemon..."
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginTop: 25,
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 20,
    width: 300,
    height: 45,
    alignItems: "center",
    paddingLeft: 10,
  },
  input: {
    marginLeft: 10,
  },
});
