import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import Inicio from "../screens/inicio"
import Mapa from "../screens/mapa"
import { COLORS } from "../utils/constants"
import InputMarkerMap from "../screens/inputMarkerMap"

const Stack = createNativeStackNavigator()

function StackNav() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Inicio"
        component={Inicio}
        options={{ title: "Inicio", headerShown: false }}
        initialParams={{}}
      />

      <Stack.Screen name="Mapa" component={Mapa} initialParams={{}} />
      <Stack.Screen
        name="MarkerMap"
        component={InputMarkerMap}
        options={{ title: "Selecciona en el mapa", headerShown: true }}
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
