import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"

function Inputs({onPress}) {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 100,
      }}
    >
      <TouchableOpacity onPress={onPress} style={styles.inputs}>
        <Icon size={30} color="black" name="search-location" />
        <Text>Agregar Origen</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPress} style={styles.inputs}>
        <Icon size={30} color="black" name="search-location" />
        <Text>Agregar Destino</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Inputs

const styles = StyleSheet.create({
  inputs: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    margin: 10
  },
})
