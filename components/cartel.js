import React from "react"
import { StyleSheet, View, Text } from "react-native"

function Cartel({ item }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <View style={[styles.cartelCodigo, { backgroundColor: item.color }]}>
        <Text style={styles.txtCodigo}>{item.codigo}</Text>
      </View>
      <View
        style={[
          styles.cartel,
          { backgroundColor: item.color },
          { justifyContent: "center" },
        ]}
      >
        <Text style={styles.txtNombre}>
          {item.nombre.split("-").join("\n").toUpperCase()}
        </Text>
      </View>
    </View>
  )
}

export default Cartel

const styles = StyleSheet.create({
  cartel: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 0, height: 0 },
    width: 150,
    height: 150,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    
    elevation: 8,
  },
  cartelCodigo: {
    width: 70,
    height: 35,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  txtNombre: {
    fontSize: 15,
    fontWeight: "normal",
    color: "white",
    width: "100%",
    textAlign: "center",
  },
  txtCodigo: {
    paddingTop: 8,
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 18,
    color: "white",
    textAlign: "center",
    width: 70,
    height: 25,
  },
})
