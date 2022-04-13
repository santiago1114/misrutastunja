import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../utils/constants";

export default function RutaItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.codigo}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.codigo}</Text>
      </View>
      <Text>{item.nombre}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#DDDDDD",
    borderRadius: 10,
    padding: 10,
    flex: 1,
    alignItems: "flex-start",
  },
  codigo: {
    backgroundColor: COLORS.azul_claro,
    borderRadius: 10,
    padding: 5,
    flexBasis: 10,
  },
});
