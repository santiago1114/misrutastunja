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
import { COLORS, TUNJA_LOCATION } from "../utils/constants"
import { FontAwesome, Ionicons } from "@expo/vector-icons"

const getLocation = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== "granted") {
      throw new Error("Los permisos de localización fueron denegados")
    } else {
      const location = await Location.getCurrentPositionAsync({})
      return location
    }
  } catch (error) {
    setErrorMsg("Los permisos de localización fueron denegados")
  }
}

function InputMap({ navigation }) {
  const [isStartSelected, setIsStartSelected] = useState(false)
  const [isLocation, setIsLocation] = useState(false)
  const [ok, setOk] = useState(false)
  const [startMarker, setStartMarker] = useState({})
  const [endMarker, setEndMarker] = useState({})
  const [region, setRegion] = useState({
    latitude: 5.544528560673818,
    longitude: -73.35754935069738,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  })

  const mapRef = useRef(null)

  /* useEffect(() => {
    let isMounted = true
    getLocation()
      .then((location) => {
        if (isMounted) {
          setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          })
          if (mapRef) {
            mapRef.current.animateToRegion(region, 500)
          }
        }
      })
      .catch()

    return () => {
      isMounted = false
      setIsLocation(true)
    }
  }, []) */

  return (
    <View style={styles.container} flexDirection="column">
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
        {startMarker.latitude && (
          <MapView.Marker coordinate={startMarker} title="Punto de partida">
            <FontAwesome name="map-marker" size={40} color={COLORS.verde} />
          </MapView.Marker>
        )}
        {endMarker.latitude && (
          <MapView.Marker coordinate={endMarker} title="Punto de destino">
            <FontAwesome name="map-marker" size={40} color={COLORS.azul} />
          </MapView.Marker>
        )}
      </MapView>

      {ok ? (
        <></>
      ) : (
        <View style={styles.markerFixed}>
          {!isStartSelected ? (
            <FontAwesome name="map-marker" size={50} color={COLORS.verde} />
          ) : (
            <FontAwesome name="map-marker" size={50} color={COLORS.azul} />
            // <EvilIcons name="location" color="blue" size={50} />
            // <Ionicons name="location-sharp" color="#CCC" size={50} />
          )}
        </View>
      )}

      {ok ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setOk(false)
            navigation.goBack()
          }}
        >
          <Text style={styles.txt}>Buscar Rutas </Text>
          <Ionicons name="arrow-forward" color="#FFF" size={20} />
        </TouchableOpacity>
      ) : (
        <>
          {!isStartSelected ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setIsStartSelected(true)
                setStartMarker({
                  latitude: region.latitude,
                  longitude: region.longitude,
                })
                mapRef.current.animateToRegion(TUNJA_LOCATION, 500)
              }}
            >
              <Ionicons name="add" color="#FFF" size={20} />
              <Text style={styles.txt}>Agregar Origen</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setIsStartSelected(false)
                setEndMarker({
                  latitude: region.latitude,
                  longitude: region.longitude,
                })
                setOk(true)
                //navigation.goBack()
              }}
            >
              <Ionicons name="add" color="#FFF" size={20} />
              <Text style={styles.txt}>Agregar Destino</Text>
            </TouchableOpacity>
          )}
        </>
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
  txt: {
    fontSize: 14,
    //fontFamily: "Open Sans, sans-serif",
    fontWeight: "400",
    lineHeight: 19,
    color: "white",
  },
  mapStyle: {
    //marginTop: 50,
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
    borderRadius: 20,
  },
})

// <Image
//  style={{ width: 40, height: 40 }}
//    source={require("../assets/loading.gif")}
//  />
