import React, { useCallback, useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import Inputs from "../components/inputs"
import RutasList from "../components/rutasList"
import { useFocusEffect } from "@react-navigation/native"
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native"


const Inicio = ({ route, navigation }) => {
  const [coords, setCoords] = useState({})

  useFocusEffect(
    useCallback(() => {
      if (route.params.type === "origen") {
        console.log("ORIGEN PARAMS TO INICIO", route.params)
        setCoords((prevState) => ({
          ...prevState,
          origen: route.params.selectedMarker,
          addressOrigen: route.params.address,
        }))
      } else if (route.params.type === "destino") {
        console.log("DESTINO PARAMS TO INICIO", route.params)
        setCoords((prevState) => ({
          ...prevState,
          destino: route.params.selectedMarker,
          addressDestino: route.params.address,
        }))
      }
    }, [route])
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/BG.png")}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Image
            source={require("../assets/icon.png")}
            style={{
              width: 44,
              height: 44,
              borderRadius: 44 / 2,
              marginHorizontal: 40
            }}
          />
          <View>
          <Text style={{fontSize: 18}}>Mis Rutas Tunja</Text>
          <Text style={{fontSize: 10}}>por Dirección de TIC's y Gobierno Digital</Text>
          </View>

        </View>

        <Inputs
          coords={coords}
          setData={(coords) => {
            setCoords(coords)
          }}
        />
        <RutasList coords={coords} />
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Inicio
