import React, { useEffect, useState } from "react"
import { StyleSheet, TouchableOpacity, View, Text } from "react-native"
import Input from "./input"
import { EvilIcons } from "@expo/vector-icons"

function Inputs({ coords, setData }) {
  
  return (
    <View
      style={{
        padding: 20
      }}
    >
      {coords.origen ? (
        <>
          {coords.addressOrigen ? (
            <Input
              placeholder={coords.addressOrigen}
              type={"origen"}
              checkFlag={true}
            />
          ) : (
            <Input
              placeholder={"Punto de partida seleccionado"}
              type={"origen"}
              checkFlag={true}
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
         />
       ) : (
         <Input
           placeholder={"Punto destino seleccionado"}
           type={"destino"}
           checkFlag={true}
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

      {(coords.destino || coords.origen) && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setData({})
            }}
          >
            <EvilIcons size={24} color="black" name="trash" />
            <Text>Vaciar Campos</Text>
          </TouchableOpacity>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEEEEE",
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 15,
    marginHorizontal: 10,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
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
