import React, { useRef, useState, useCallback } from "react"
import { StatusBar, StyleSheet, View, TouchableOpacity } from "react-native"
import { getLocation } from "../utils/functions"
import { COLORS, TUNJA_LOCATION } from "../utils/constants"
import { Ionicons, Entypo, MaterialIcons } from "@expo/vector-icons"
//import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import * as rootNavigation from "../navigation/rootNavigation"
import { useFocusEffect } from "@react-navigation/native"
import AddressSearcher from "../components/adddressSearcher"
import HMSMap, { MapTypes } from "@hmscore/react-native-hms-map"
/**
 * Mapa para seleccionar un *marcador*.
 */
function InputMarkerMap({ route, navigation }) {
  const [address, setAddress] = useState("")
  const [autoCompleteList, setAutoCompleteList] = useState([])
  const [region, setRegion] = useState({
    latitude: 5.544528560673818,
    longitude: -73.35754935069738,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  })

  const mapRef = useRef(null)

  // Evento control en header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            getLocation()
              .then((location) => {
                setRegion({
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.003,
                  longitudeDelta: 0.003,
                })

                mapView.setCoordinates({
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                })

              })
              .catch(() => "No se otorgaron permisos de localización")
          }
        >
          <MaterialIcons name="my-location" size={32} color={COLORS.azul} />
        </TouchableOpacity>
      ),
    })
  }, [navigation])

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

          if (
            mapRef &&
            route.params.type === "origen" &&
            !route.params.coords.origen
          ) {
            mapView.setCoordinates({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            })
          }
        })
        .catch(() => "No se otorgaron permisos de localización")
      if (route.params.coords) {
        if (route.params.coords.origen && route.params.type === "origen") {
          setRegion({
            latitude: route.params.coords.origen.latitude,
            longitude: route.params.coords.origen.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          })
        } else if (
          route.params.coords.destino &&
          route.params.type === "destino"
        ) {
          setRegion({
            latitude: route.params.coords.destino.latitude,
            longitude: route.params.coords.destino.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          })
        }
      }
    }, [])
  )

  return (
    <View style={styles.container}>
      <StatusBar />
      <HMSMap
        mapType={MapTypes.NORMAL}
        style={styles.mapStyle}
        ref={mapRef}
        camera={{
          target: { latitude: region.latitude, longitude: region.latitude },
          zoom: 11,
        }}
        onCameraIdle={(e) =>
          setRegion({
            latitude: e.nativeEvent.target.latitude,
            longitude: e.nativeEvent.target.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          })
        }
      />

      <View style={{ marginBottom: 50 }}>
        {route.params.type === "origen" ? (
          <Entypo name="location-pin" size={50} color={COLORS.rojo} />
        ) : (
          <Entypo name="location-pin" size={50} color={COLORS.verde_claro} />
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          {
            position: "absolute",
            bottom: 20,
            right: 20,
            height: 80,
            width: 80,
            borderRadius: 40,
          },
        ]}
        onPress={() => {
          rootNavigation.navigate({
            name: "Inicio",
            params: {
              selectedMarker: {
                latitude: region.latitude,
                longitude: region.longitude,
              },
              type: route.params.type,
              address,
            },
          })
        }}
      >
        <Ionicons name="checkmark" color="#FFF" size={50} />
      </TouchableOpacity>

      <AddressSearcher
        address={address}
        setAddress={setAddress}
        autoCompleteList={autoCompleteList}
        setAutoCompleteList={setAutoCompleteList}
        mapRef={mapRef}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: "100%", //Dimensions.get("window").width,
    height: "100%", //Dimensions.get("window").height,
    position: "absolute",
  },
  button: {
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#50C878",
  },
  autocompleteList: {
    marginHorizontal: 5,
    borderColor: "#EEEEEE",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    paddingHorizontal: 5,
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: 5,
  },
  textInput: {
    height: 50,
    width: "90%",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    paddingHorizontal: 5,
  },
  textInputBtn: {
    flexDirection: "column",
    backgroundColor: COLORS.morado_oscuro,
    padding: 8,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    height: 50,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
})

export default InputMarkerMap
