import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet } from "react-native"
import Inputs from "../components/inputs"
import RutasList from "../components/rutasList"

const Inicio = ({ route, navigation }) => {
  const [coords, setCoords] = useState(null)

  useEffect(() => {
    console.log(route.params);
    if (route.params) {
      setCoords({origen: true, destino: true})
    } else {
      setCoords(null)
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Inputs coords={coords} />
      <RutasList coords={coords} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
})

export default Inicio
