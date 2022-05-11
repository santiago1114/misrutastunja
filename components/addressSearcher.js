import React from "react"
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { COLORS } from "../utils/constants"

function AddressSearcher() {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.button}>
        <FontAwesome name="search" size={24} />
        <Text>Buscar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: COLORS.azul_oscuro,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    marginHorizontal: 10,
  },
})

export default AddressSearcher
