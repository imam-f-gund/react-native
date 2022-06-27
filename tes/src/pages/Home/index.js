import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Container, Content, Card, CardItem, Text, Body } from 'native-base';
import Chart from '../Chart';

const image = { uri: "https://reactjs.org/logo-og.png" };

const Home = () => (
  <View style={styles.container}>
    <ImageBackground source={image} style={styles.image}>
      {/* <Text style={styles.text}>Inside</Text> */}
      <Chart/>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  }
});

export default Home;