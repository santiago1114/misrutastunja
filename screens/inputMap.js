import React, { useEffect, useState } from "react"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import {
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Text,
} from "react-native"
import * as Location from "expo-location"
import { COLORS } from "../utils/constants"

function NextButton({ navigation }) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => {}}>
      <Text>Agregar Destino</Text>
    </TouchableOpacity>
  )
}

function InputMap() {
  let isStartSelected = false
  const [startMarker, setStartMarker] = useState({})
  const [endMarker, setEndMarker] = useState({})

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        setErrorMsg("Los permisos de localización fueron denegados")
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      setStartMarker({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      })
    })()
  }, [])

  return (
    <View style={styles.container} flexDirection="column">
      <StatusBar animated={true} backgroundColor="#18B8EC" />
      <MapView
        style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 5.540147272002443,
          longitude: -73.35916010380109,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={(e) => {
          isStartSelected
            ? setStartMarker(e.nativeEvent.coordinate)
            : setEndMarker(e.nativeEvent.coordinate)
        }}
      >
        {
          // if state contains marker variable with a valid value, render the marker
          startMarker.latitude && <MapView.Marker coordinate={startMarker} />
        }
        {
          // if state contains marker variable with a valid value, render the marker
          isStartSelected && endMarker.latitude && (
            <MapView.Marker coordinate={endMarker} />
          )
        }
      </MapView>

      { !isStartSelected &&
        <TouchableOpacity
        style={styles.button}
        onPress={() => {
          isStartSelected = true
        }}
      >
        <Text>Agregar Destino</Text>
      </TouchableOpacity>}

      { isStartSelected &&
        <TouchableOpacity
        style={styles.button}
        onPress={() => {
          
        }}
      >
        <Text>Encontrar Rutas Disponibles</Text>
      </TouchableOpacity>}

      {/*    <View
        style={{
          position: "absolute", //use absolute position to show button on top of the map
          top: "50%", //for center align
          alignSelf: "flex-end", //for align to right
        }}
      ></View> */}
    </View>
  )
}

export default InputMap

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  button: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.azul_claro,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10
  },
})
