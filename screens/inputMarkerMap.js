import React, { useRef, useState, useCallback } from "react"
import {
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
} from "react-native"
import { getLocation } from "../utils/functions"
import { COLORS, TUNJA_LOCATION } from "../utils/constants"
import { FontAwesome, Ionicons, Entypo } from "@expo/vector-icons"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import * as rootNavigation from "../navigation/rootNavigation"
import { useFocusEffect } from "@react-navigation/native"
import AddressSearcher from "../components/addressSearcher"

/**
 * Mapa para seleccionar un *marcador*.
 */
function InputMarkerMap({ route }) {
  const [selectedMarker, setSelectedMarker] = useState({})
  const [address, setAddress] = useState("")
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
          <Entypo name="location-pin" size={50} color="#9B59B6" />
        </View>
      )}

      {selectedMarker.latitude ? (
        <TouchableOpacity
          style={[
            styles.button,
            { position: "absolute", bottom: 50, flexDirection: "row" },
          ]}
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
          style={[
            styles.button,
            { position: "absolute", bottom: 50, flexDirection: "row" },
          ]}
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

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          position: "absolute",
          top: 70,
          width: "90%",
        }}
      >
        <TextInput
          style={{
            height: 50,
            width: "90%",
            borderWidth: 2,
            borderColor: "gray",
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            padding: 10,
            backgroundColor: "white",
          }}
          value={address}
          onChangeText={setAddress}
          placeholder="Digita una ubicación"
        />
        <TouchableOpacity
          style={[
            {
              flexDirection: "column",
              backgroundColor: COLORS.azul_claro,
              padding: 8,
              borderBottomRightRadius: 10,
              borderTopRightRadius: 10,
              height:50,
              justifyContent: "center"
            },
          ]}

          onPress={()=>{}}

        >
          <FontAwesome name="search" size={24} />
        </TouchableOpacity>
      </View>
      
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
