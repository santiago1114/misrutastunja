import React, { useEffect, useState, useRef } from "react"
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
import Ionicons from "react-native-vector-icons/Ionicons"
import { FontAwesome } from "@expo/vector-icons"

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
  const [region, setRegion] = useState({
    latitude: 5.540147272002443,
    longitude: -73.35916010380109,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  })
  
  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        setErrorMsg("Los permisos de localización fueron denegados")
        return
      }

      let location = await Location.getCurrentPositionAsync({})

      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      })
      //mapRef.current.animateToRegion(region)
    })()
  })

  useEffect(() => {}, [startMarker])

  return (
    <View style={styles.container} flexDirection="column">
      <StatusBar animated={true} backgroundColor="#18B8EC" />
      <MapView
        style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        {startMarker.latitude && (
          <MapView.Marker coordinate={startMarker}>
            <FontAwesome name="map-marker" size={40} color="#B12A5B" />
          </MapView.Marker>
        )}
        {endMarker.latitude && (
          <MapView.Marker coordinate={endMarker} title="Punto de partida">
            <FontAwesome name="map-marker" size={40} color="#B12A5B" />
          </MapView.Marker>
        )}
      </MapView>

      <View style={styles.markerFixed}>
        <Ionicons name="location-sharp" color="#ccc" size={50} />
      </View>

      {!isStartSelected && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            isStartSelected = true
            setStartMarker({
              latitude: region.latitude,
              longitude: region.longitude,
            })
          }}
        >
          <Text>Agregar Origen</Text>
        </TouchableOpacity>
      )}

      {isStartSelected && (
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text>Agregar Destino</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default InputMap

const styles = StyleSheet.create({
  markerFixed: {
    left: "50%",
    marginLeft: -24,
    marginTop: -48,
    position: "absolute",
    top: "50%",
  },
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
    borderRadius: 10,
  },
})
