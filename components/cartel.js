import React, { useEffect } from "react"
import { StyleSheet, View, Text } from "react-native"
import { COLORS } from "../utils/constants"

function Cartel({ item }) {
  
  return (
    <View style={{ flexDirection: "column", alignItems: "center", backgroundColor: 'transparent'}}>
      <View style={[styles.cartelCodigo, {backgroundColor: item.color}]}>
        <Text style={styles.txtCodigo}>{item.codigo}</Text>
      </View>
      <View style={[styles.cartel, {backgroundColor: item.color}]}>
        <Text style={styles.txtNombre}>
          {item.nombre.split("-").join("").toUpperCase()}
        </Text>
      </View>
    </View>
  )
}

export default Cartel

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    height: 220,
    marginVertical: 30,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cartel: {
    borderRadius: 10,
    shadowColor: "rgba(136,152,170,0.15)",
    elevation: 3,
    shadowOffset: { width: 0, height: 0 },
    width: 130,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  cartelCodigo: {
    width: 60,
    height: 35,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: "center",
  },
  txtNombre: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 18,
    color: "rgba(255,252,252,1)",
    textAlign: "center",
    justifyContent: "center",
    width: 130,
    height: 90,
  },
  txtCodigo: {
    paddingTop: 8,
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 18,
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    width: 60,
    height: 25,
  },
})
