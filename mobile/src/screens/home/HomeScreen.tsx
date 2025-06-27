import React from "react";
import { ImageBackground, Text, View } from "react-native";
import styles from "./HomeScreen.styles";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ImageBackground
          source={{ uri: "https://galaxies.dev/img/authors/simong.webp" }}
          style={styles.image}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.overlay}>
            <Text style={styles.title}>Titulli i Lajmit</Text>
          </View>
        </ImageBackground>
        <Text style={styles.description}>
          Vance Boelter, who is suspected in the attacks on two Minnesota
          politicians and their spouses, was taken into custody on Sunday,
          ending a major manhunt.
        </Text>
      </View>
    </View>
  );
}
