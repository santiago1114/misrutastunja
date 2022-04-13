import React  from "react"
import { StyleSheet } from "react-native"

import { SafeAreaView } from "react-native-safe-area-context"

import Inputs from "../components/inputs"
import RutasList from "../components/rutasList"

const Inicio = ({ navigation }) => {
 
  return (
    <SafeAreaView style={styles.container}>
      <Inputs onPress={() => navigation.navigate("InputMap")} />
      <RutasList onPress={() => navigation.navigate("Mapa")} />
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
