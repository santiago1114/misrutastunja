import React, { useEffect, useState } from "react"
import { StyleSheet, TouchableOpacity, View, Text } from "react-native"
import { COLORS } from "../utils/constants"
import Input from "./input"

function Inputs({ coords, setCoords }) {
  useEffect(() => {
    return () => {

    }
  }, [coords])

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "#34568B",
        borderBottomWidth: 2,
        borderBottomColor: "gray",
      }}
    >
      {coords.origen ? (
        <Input placeholder={"Punto de origen agregado"} type={"origen"} />
      ) : (
        <Input placeholder={"Selecciona el punto de partida"} type={"origen"} />
      )}

      {coords.destino ? (
        <Input placeholder={"Punto destino agregado"} type={"destino"} />
      ) : (
        <Input placeholder={"Selecciona el destino"} type={"destino"} />
      )}

      {coords.origen && coords.destino && (
        <TouchableOpacity style={styles.button} onPress={()=>{setCoords(coords)}}>
          <Text>Buscar Rutas</Text>
        </TouchableOpacity>
      )}
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

  txt: {
    fontSize: 14,
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

{
  /*       <View style={styles.Informacion}>
        <View style={styles.item}>
          <Icon size={20} color="black" name="search-location" />
          <Text style={styles.txt}> {coords ? coords.origen : "Agrega un origen"}</Text>
        </View>
        <View style={styles.separador} />
        <View style={styles.item}>
          <Icon size={20} color="black" name="search-location" />
          <Text style={styles.txt}> {coords ? coords.destino : "Agrega un destino"}</Text>
        </View>
        <View style={styles.linea} />
      </View> */
}
