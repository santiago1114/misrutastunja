import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function RutaItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} >
      <Text>{item.codigo}</Text>
      <Text>{item.nombre}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#DDDDDD",
    borderRadius: 10,
    padding: 10
  },
});
