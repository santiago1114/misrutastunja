import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Inicio from '../screens/Inicio';
import Mapa from '../components/Mapa';
import { COLORS } from '../utils/constants';
import InputMap from '../screens/inputMap';

const Stack = createNativeStackNavigator();

function StackNav() {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Inicio" component={Inicio}/>
      <Stack.Screen name="Mapa" component={Mapa} />
      <Stack.Screen name="InputMap" component={InputMap} />
    </Stack.Navigator>
  )
}

export default StackNav

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: COLORS.morado,
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};