import React, { useState, useContext } from "react"
import { StyleSheet, TouchableOpacity, View, TextInput } from "react-native"
import Input from "./input"
import { EvilIcons } from "@expo/vector-icons"
import { FilterContext } from "../utils/constants"

function Inputs({ coords, setData, setFilterRuta }) {
  const [filterText, setFilterText] = useState("")
  const { setFilter } = useContext(FilterContext)

  return (
    <View
      style={{
        padding: 20,
      }}>
      {coords.origen ? (
        <>
          {coords.addressOrigen ? (
            <Input
              placeholder={coords.addressOrigen}
              type={"origen"}
              checkFlag={true}
              coords={coords}
            />
          ) : (
            <Input
              placeholder={"Punto de partida seleccionado"}
              type={"origen"}
              checkFlag={true}
              coords={coords}
            />
          )}
        </>
      ) : (
        <Input
          placeholder={"Selecciona el punto de partida"}
          type={"origen"}
          checkFlag={false}
        />
      )}

      {coords.destino ? (
        <>
          {coords.addressDestino ? (
            <Input
              placeholder={coords.addressDestino}
              type={"destino"}
              checkFlag={true}
              coords={coords}
            />
          ) : (
            <Input
              placeholder={"Punto destino seleccionado"}
              type={"destino"}
              checkFlag={true}
              coords={coords}
            />
          )}
        </>
      ) : (
        <Input
          placeholder={"Selecciona el destino"}
          type={"destino"}
          checkFlag={false}
        />
      )}
      <View
        style={{
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent: "flex-end",
          marginTop: 10,
        }}>
        <TextInput
          style={styles.textInput}
          value={filterText}
          onChangeText={setFilterText}
          onSubmitEditing={() => {
            setFilter(filterText)
          }}
          placeholder="Filtra rutas por nombre"
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "white", marginLeft: 10 }]}
          onPress={() => {
            setData({})
            setFilterText("")
            setFilter("")
          }}>
          <EvilIcons size={32} color="#126DB4" name="trash" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 20,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
  },
  textInput: {
    marginLeft: 10,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "rgba(229,228,226,0.4)",
  },
})

export default Inputs
