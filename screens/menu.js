import React from "react"
import { View, TouchableOpacity, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

function Menu() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <TouchableOpacity>
          <Text>Busca tu ruta</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Lista de rutas</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Menu
