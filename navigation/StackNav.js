import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import Inicio from "../screens/Inicio"
import Mapa from "../screens/Mapa"
import { COLORS } from "../utils/constants"
import InputMap from "../screens/inputMap"
import RutasList from "../components/rutasList"

const Stack = createNativeStackNavigator()

function StackNav() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Inicio"
        component={Inicio}
        options={{ title: "Inicio" }}
      />
      <Stack.Screen name="Mapa" component={Mapa} />
      <Stack.Screen
        name="InputMap"
        component={InputMap}
        options={{ title: "Mapa", headerShown: false }}
      />
      <Stack.Screen
        name="RutasList"
        component={RutasList}
        options={{ title: "rutas", headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default StackNav

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: COLORS.azul_oscuro,
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
}
