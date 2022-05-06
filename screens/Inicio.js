import React, { useCallback, useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import Inputs from "../components/inputs"
import RutasList from "../components/rutasList"
import { useFocusEffect } from "@react-navigation/native"

const Inicio = ({ route, navigation }) => {
  const [coords, setCoords] = useState(null)

  useFocusEffect(
    useCallback(() => {
      if (route.params.origen) setCoords({ origen: route.params.origen })
      else if (route.params.destino) setCoords({ destino: route.params.destino }) 
      
      console.log("COORDS EN INICIO: ", coords)
    }, [route])
  ) 


/*   useEffect(() => {
    let isMounted = true
    console.log("PARAMETROS EN INICIO: ",route.params);
    return () => {
      if (route.params.origen) setCoords({ origen: route.params.origen })
      else if (route.params.destino) setCoords({ destino: route.params.destino })
      isMounted = false
    }
  }) */

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Inputs coords={coords} />
      <RutasList coords={coords} />
    </SafeAreaView>
  )
}

export default Inicio
