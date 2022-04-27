import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import * as rootNavigation from "../navigation/rootNavigation"
import Icon from "react-native-vector-icons/FontAwesome5"


function Inputs({ coords }) {

  return (
    <>
      <TouchableOpacity onPress={() => rootNavigation.navigate("InputMap")}>
        <View style={styles.mapInput}>
          <View style={styles.group}>
            <Text style={styles.txt}>¿A dónde quieres ir?</Text>
            <Icon size={24} color="black" name="search-location" />
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.Informacion}>
        <View style={styles.item}>
          <Icon size={20} color="black" name="search-location" />
          <Text style={styles.txt}> {coords ? coords.origen : "Agrega un origen"}</Text>
        </View>
        <View style={styles.separador} />
        <View style={styles.item}>
          <Icon size={20} color="black" name="search-location" />
          <Text style={styles.txt}> {coords ? coords.destino : "Agrega un destino"}</Text>
        </View>
      </View>

      <View style={styles.linea} />
    </>
  )
}

const styles = StyleSheet.create({
  mapInput: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255,253,253,1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(223,230,236,1)",
  },
  group: {
    width: "100%",
    height: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txt: {
    fontSize: 14,
    //fontFamily: "Open Sans, sans-serif",
    fontWeight: "400",
    lineHeight: 19,
    color: "rgba(136,152,170,1)",
  },
  Informacion: {
    marginVertical: 20,
    width: "100%",
    height: 25,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  item: {
    display: "flex",
    flexDirection: "row",
  },
  separador: {
    backgroundColor: "rgba(23,43,77,1)",
    width: 1,
    height: 24,
  },
  Destino: {
    display: "flex",
    flexDirection: "row",
  },
  linea: {
    backgroundColor: "#DEDDDD",
    width: "100%",
    height: 2,
  },
  inputs: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    backgroundColor: "#F5F5F5",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
})

export default Inputs