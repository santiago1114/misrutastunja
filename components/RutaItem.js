import * as rootNavigation from '../navigation/rootNavigation';

import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { COLORS } from "../utils/constants"
import Cartel from "./cartel"


export default function RutaItem({ item, coords }) {
  return (
    <TouchableOpacity style={styles.card} onPress={()=>{rootNavigation.navigate('Mapa', { item, coords })}}>
      <Cartel item={item} />
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
    width: "100%",
    height: 240,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
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
    color: "#191970",
  },
  txt2: {
    fontSize: 14,
    fontWeight: "normal",
    lineHeight: 17,
    color: "black",
  },
  txtCircle: {
    fontSize: 14,
    fontWeight: "normal",
    lineHeight: 17,
    color: "black",
    textAlign: "center"
  },
  circle: {
    borderWidth: 1,
    borderColor: "black",
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
})
