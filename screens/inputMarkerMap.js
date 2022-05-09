import React, { useRef, useState, useCallback } from "react"
import {
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native"
import { getLocation } from "../utils/functions"
import { COLORS, TUNJA_LOCATION } from "../utils/constants"
import { FontAwesome, Ionicons } from "@expo/vector-icons"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import * as rootNavigation from "../navigation/rootNavigation"
import { useFocusEffect } from "@react-navigation/native"

/**
 * Mapa para seleccionar un *marcador*.
 */
function InputMarkerMap({ route }) {
  const [selectedMarker, setSelectedMarker] = useState({})
  const [region, setRegion] = useState({
    latitude: 5.544528560673818,
    longitude: -73.35754935069738,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  })

  const mapRef = useRef(null)

  useFocusEffect(
    useCallback(() => {
      getLocation()
        .then((location) => {
          setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          })

          if (mapRef) {
            mapRef.current.animateToRegion(
              {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
              },
              500
            )
          }
        })
        .catch()
    }, [])
  )

  return (
    <View style={styles.container}>
      <StatusBar animated={true} backgroundColor="#18B8EC" />
      <MapView
        style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        ref={mapRef}
        onRegionChangeComplete={setRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {selectedMarker.latitude && (
          <Marker
            coordinate={selectedMarker}
            title="Punto de partida"
            animation={1}
          >
            <FontAwesome name="map-marker" size={40} color={COLORS.verde} />
          </Marker>
        )}
      </MapView>

      {selectedMarker.latitude ? (
        <></>
      ) : (
        <View style={styles.markerFixed}>
          <FontAwesome name="map-marker" size={50} color={COLORS.verde} />
        </View>
      )}

      {selectedMarker.latitude ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            rootNavigation.navigate({
              name: "Inicio",
              params: { selectedMarker, type: route.params.type },
            })
          }}
        >
          <Ionicons name="checkmark" color="#FFF" size={20} />
          <Text style={styles.txt}> OK </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setSelectedMarker({
              latitude: region.latitude,
              longitude: region.longitude,
            })
            mapRef.current.animateToRegion(TUNJA_LOCATION, 500)
          }}
        >
          <Ionicons name="add" color="#FFF" size={24} />
          <Text style={styles.txt}>Agregar Ubicación</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

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
    alignItems: "center",
  },
  txt: {
    fontSize: 15,
    lineHeight: 19,
    color: "white",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  button: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: COLORS.azul_oscuro,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    marginHorizontal: 10,
  },
})

export default InputMarkerMap
