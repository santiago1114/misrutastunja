import React, { useCallback, useState, useRef } from "react"
import MapView, { Polyline, PROVIDER_GOOGLE } from "react-native-maps"
import {
  StyleSheet,
  View,
  Dimensions,
  StatusBar,
  Text,
  TouchableOpacity,
} from "react-native"
import { getRuta } from "../api/rutas"
import { mapStyle } from "../utils/mapStyle"
import Cartel from "../components/cartel"
import { FontAwesome, Entypo, MaterialCommunityIcons } from "@expo/vector-icons"
import { useFocusEffect } from "@react-navigation/native"
import { COLORS } from "../utils/constants"

async function getRef(mapRef, route) {
  if (mapRef && route.params.coords.origen && route.params.coords.destino) {
    await setTimeout(() => {
      mapRef.current.fitToSuppliedMarkers(["origen", "destino"], {
        edgePadding: { top: 25, right: 25, bottom: 25, left: 25 },
        animated: true,
      })
    }, 500)
  }
}

function Mapa({ route }) {
  const { item } = route.params

  const mapRef = useRef(null)
  const [pline, setPline] = useState([])
  const [hideFlag, setHideFlag] = useState(true)
  const [markers, setMarkers] = useState({
    region: {
      latitude: 5.540147272002443,
      longitude: -73.35916010380109,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    markers: null,
  })
  //const isFocused = useIsFocused()
  useFocusEffect(
    useCallback(() => {
      getRuta(item.id)
        .then((ruta) => {
          setPline(ruta)
        })
        .catch(console.error)

      getRef(mapRef, route)
    }, [])
  )

  return (
    <View>
      <StatusBar animated={true} backgroundColor="#18B8EC" />
      <MapView
        showsUserLocation={true}
        showsMyLocationButton={true}
        customMapStyle={mapStyle}
        style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 5.540147272002443,
          longitude: -73.35916010380109,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        ref={mapRef}
      >
        {
          // if state contains marker variable with a valid value, render the marker
          markers.marker && <MapView.Marker coordinate={markers.marker} />
        }

        {pline.length > 0 && (
          <Polyline
            lineJoin={"bevel"}
            coordinates={pline}
            strokeColor="rgba(52, 73, 94 ,0.5)" // fallback for when `strokeColors` is not supported by the map-provider
            strokeWidth={7}
          />
        )}

        {pline[0] && (
          <>
            <MapView.Marker key={1} coordinate={pline[0]}>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Inicio Ruta
                </Text>
                <MaterialCommunityIcons name="bus-alert" size={24} />
              </View>
            </MapView.Marker>
            <MapView.Marker key={2} coordinate={pline[pline.length - 1]}>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  Fin Ruta
                </Text>
                <MaterialCommunityIcons name="bus-alert" size={24} />
              </View>
            </MapView.Marker>

            {route.params.coords.origen && (
              <MapView.Marker
                coordinate={route.params.coords.origen}
                title="Punto de partida"
                animation={1}
                key={3}
                identifier="origen"
              >
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      textShadowRadius: 10,
                      textShadowColor: "white",
                    }}
                  >
                    Origen
                  </Text>
                  <Entypo name="location-pin" size={50} color={COLORS.rojo} />
                </View>
              </MapView.Marker>
            )}
            {route.params.coords.destino && (
              <MapView.Marker
                coordinate={route.params.coords.destino}
                title="Punto destino"
                animation={1}
                key={4}
                identifier="destino"
              >
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      textShadowRadius: 10,
                      textShadowColor: "white",
                    }}
                  >
                    Destino
                  </Text>
                  <Entypo name="location-pin" size={50} color={COLORS.verde} />
                </View>
              </MapView.Marker>
            )}
          </>
        )}
      </MapView>
      <View style={{ position: "absolute", top: 20, left: 20 }}>
        {hideFlag ? (
          <TouchableOpacity
            onPress={() => setHideFlag(false)}
            style={{
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 20,
              padding: 10,
            }}
          >
            <FontAwesome name="info-circle" size={30} color="black" />
            <Text>Mostrar Ruta</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setHideFlag(true)}>
            <Cartel item={item} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default Mapa

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 50,
  },
})
