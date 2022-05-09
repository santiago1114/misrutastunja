import React, { useCallback, useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import Inputs from "../components/inputs"
import RutasList from "../components/rutasList"
import { useFocusEffect } from "@react-navigation/native"

const Inicio = ({ route, navigation }) => {
  const [coords, setCoords] = useState({})

   useFocusEffect(
    useCallback(() => {

      if (route.params.type === "origen") {
        setCoords(prevState => ({ ...prevState, origen: route.params.selectedMarker }))
      }
      else if (route.params.type === "destino"){
       setCoords(prevState => ({ ...prevState, destino: route.params.selectedMarker }))
      }
    }, [route])
  ) 

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Inputs coords={coords} setData={(coords)=>{setCoords(coords)}} />
      <RutasList coords={coords} />
    </SafeAreaView>
  )
}

export default Inicio
