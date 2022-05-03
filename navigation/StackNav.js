import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import Inicio from "../screens/Inicio"
import Mapa from "../screens/Mapa"
import { COLORS } from "../utils/constants"
import InputMap from "../screens/inputMap"
import RutasList from "../components/rutasList"
import InputMarkerMap from "../screens/inputMarkerMap"

const Stack = createNativeStackNavigator()

function StackNav() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Inicio"
        component={Inicio}
        options={{ title: "Inicio", headerShown: false }}
      />
      <Stack.Screen name="Mapa" component={Mapa} />
      <Stack.Screen
        name="MarkerMap"
        component={InputMarkerMap}
        options={{ headerShown: false }}
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
