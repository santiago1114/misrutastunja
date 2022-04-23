import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { COLORS } from "../utils/constants"

export default function RutaItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <View style={styles.cartelCodigo}>
          <Text style={styles.txtCodigo}>{item.codigo}</Text>
        </View>
        <View style={styles.cartel}>
          <Text style={styles.txtNombre}>{item.nombre.split('-').join('').toUpperCase()}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "column" }}>
        <View style={styles.horario}>
          <Text style={styles.txt1}>Horario: </Text>
          <Text style={styles.txt1}>Lunes a Sábado:</Text>
          <Text style={styles.txt2}>
            {item.hora_inicio_lunes_a_sabado} a {item.hora_fin_lunes_a_sabado}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 5,
            }}
          >
            <Text style={styles.txt1}>Frecuencia: </Text>
            <View style={styles.circle}>
              <Text style={styles.txt2}>{item.frecuencia_lunes_a_sabado} min</Text>
            </View>
          </View>
        </View>
        <View style={styles.horario}>
          <Text style={styles.txt1}>Horario: </Text>
          <Text style={styles.txt1}>Festivos y Domingos:</Text>
          <Text style={styles.txt2}>
            {item.hora_inicio_domingo_y_festivo} a{" "}
            {item.hora_fin_domingo_y_festivo}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 5,
            }}
          >
            <Text style={styles.txt1}>Frecuencia: </Text>
            <View style={styles.circle}>
              <Text style={styles.txt2}>{item.frecuencia_domingo_y_festivo} min</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

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
    backgroundColor: COLORS.morado_oscuro,
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
    backgroundColor: COLORS.morado_oscuro,
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
    width: 140,
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
  horario: {
    width: 164,
    height: 84,
    flex: 1,
    paddingTop: 5,
  },
  txt1: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 17,
    color: "gray",
  },
  txt2: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 17,
    color: "black",
  },
  circle: {
    borderWidth: 2,
    borderColor: "gray",
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
})
