import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import Inicio from "../screens/Inicio"
import Mapa from "../screens/Mapa"
import { COLORS } from "../utils/constants"
import RutasList from "../components/rutasList"
import InputMarkerMap from "../screens/inputMarkerMap"
import Menu from "../screens/menu"

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
      {/* <Stack.Screen name="Menu" component={Menu} initialParams={{}} /> */}
      
      <Stack.Screen name="Mapa" component={Mapa} initialParams={{}} />
      <Stack.Screen
        name="MarkerMap"
        component={InputMarkerMap}
        options={{ title: "Selecciona en el mapa", headerShown: true }}
      />
      {/*<Stack.Screen
        name="RutasList"
        component={RutasList}
        options={{ title: "rutas", headerShown: false }}
      />*/}
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
