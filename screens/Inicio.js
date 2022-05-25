import React, { useCallback, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import Inputs from "../components/inputs"
import RutasList from "../components/rutasList"
import { useFocusEffect } from "@react-navigation/native"
import { ImageBackground, View, Image, Text } from "react-native"
import { COLORS, FilterContext } from "../utils/constants"

const Inicio = ({ route, navigation }) => {
  const [coords, setCoords] = useState({})
  const [filter, setFilter] = useState("")

  useFocusEffect(
    useCallback(() => {
      if (route.params.type === "origen") {
        setCoords((prevState) => ({
          ...prevState,
          origen: route.params.selectedMarker,
          addressOrigen: route.params.address,
        }))
      } else if (route.params.type === "destino") {
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
      <FilterContext.Provider value={{ filter, setFilter }}>
        <ImageBackground
          source={require("../assets/BG.png")}
          resizeMode="cover"
          style={{
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
              marginLeft: 10,
            }}
          >
            <Image
              source={require("../assets/icon.png")}
              style={{
                width: 44,
                height: 44,
                borderRadius: 44 / 2,
                marginHorizontal: 10,
              }}
            />
            <View>
              <Text style={{ fontSize: 20, color: "white" }}>
                Mis Rutas Tunja
              </Text>
              <Text style={{ fontSize: 12, color: "white" }}>
                por Dirección de TIC's y Gobierno Digital
              </Text>
            </View>
          </View>

          <View style={{ paddingEnd: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Text style={{ color: "white", fontSize: 16, paddingEnd: 20 }}>
                Diurno
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "black",
                  backgroundColor: COLORS.azul_claro,
                  padding: 4,
                  borderRadius: 10,
                  marginVertical: 10,
                }}
              >
                $ 1.900
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Text style={{ color: "white", fontSize: 16, paddingEnd: 20 }}>
                Nocturno, Domingos y Festivos
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: COLORS.morado_oscuro,
                  padding: 4,
                  borderRadius: 10,
                }}
              >
                $ 2.000
              </Text>
            </View>
          </View>

          <Inputs
            coords={coords}
            setData={(coords) => {
              setCoords(coords)
            }}
          />
        </ImageBackground>
        <RutasList coords={coords} />
      </FilterContext.Provider>
    </SafeAreaView>
  )
}

export default Inicio
