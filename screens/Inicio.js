import React, { useCallback, useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import Inputs from "../components/inputs"
import RutasList from "../components/rutasList"
import { useFocusEffect } from "@react-navigation/native"

const Inicio = ({ route, navigation }) => {
  const [coords, setCoords] = useState(null)

  useFocusEffect(
    useCallback(() => {
      console.log("PARAMETROS RUTA INICIO: ", route.params)
      if (route.params) {
        setCoords({ origen: true, destino: true })
      } else {
        setCoords(null)
      }
    }, [])
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Inputs coords={coords} />
      <RutasList coords={coords} />
    </SafeAreaView>
  )
}

export default Inicio
