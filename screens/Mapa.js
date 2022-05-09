import React, { useCallback, useState, useRef } from "react"
import MapView, { Circle, Polyline, PROVIDER_GOOGLE } from "react-native-maps"
import { StyleSheet, View, Dimensions, StatusBar, Text } from "react-native"
import { getRuta } from "../api/rutas"
import { mapStyle } from "../utils/mapStyle"
import Cartel from "../components/cartel"
import { FontAwesome, Ionicons } from "@expo/vector-icons"
import { COLORS } from "../utils/constants"
import { useFocusEffect, useIsFocused } from "@react-navigation/native"


async function getRef(mapRef, route) {
  if (
    mapRef &&
    route.params.coords.origen &&
    route.params.coords.destino
  ) {
    await setTimeout(() => {
      mapRef.current.fitToSuppliedMarkers(["origen", "destino"], {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
        animated: true,
      })
    }, 500)
  }
}

function Mapa({ route }) {
  const { item } = route.params

  const mapRef = useRef(null)
  const [pline, setPline] = useState([])
  const [markers, setMarkers] = useState({
    region: {
      latitude: 5.540147272002443,
      longitude: -73.35916010380109,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    markers: null,
  })
  const isFocused = useIsFocused()
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

  /*  useEffect(() => {
    getRuta(item.id)
      .then((ruta) => {
        setPline(ruta)
      })
      .catch(console.error)

      if (mapRef && route.params.coords.origen && route.params.coords.destino) {
        mapRef.current.fitToSuppliedMarkers(["origen","destino"], { edgePadding: { top: 100, right: 100, bottom: 100, left: 100 }, animated: true })
      }
  },[route])
 */
  return (
    <View>
      <StatusBar animated={true} backgroundColor="#18B8EC" />
      <MapView
        showsUserLocation={true}
        showsMyLocationButton={true}
        // customMapStyle={mapStyle}
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
            strokeColor="rgba(1,1,1,0.5)" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={[
              "#7F0000",
              "#00000000", // no color, creates a "long" gradient between the previous and next coordinate
              "#B24112",
              "#E5845C",
              "#238C23",
              "#7F0000",
            ]}
            strokeWidth={6}
          />
        )}

        {pline[0] && (
          <>
            <MapView.Marker key={1} coordinate={pline[0]}>
              <Ionicons name="bus-outline" size={30} />
              <Text>Inicio</Text>
            </MapView.Marker>
            <MapView.Marker key={2} coordinate={pline[pline.length - 1]}>
              <Ionicons name="bus-outline" size={30} />
              <Text>Fin</Text>
            </MapView.Marker>

            {route.params.coords.origen && (
              <MapView.Marker
                coordinate={route.params.coords.origen}
                title="Punto de partida"
                animation={1}
                key={3}
                identifier="origen"
              >
                <FontAwesome name="map-marker" size={40} color={COLORS.verde} />
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
                <FontAwesome name="map-marker" size={40} color={COLORS.azul} />
              </MapView.Marker>
            )}
          </>
        )}
      </MapView>
      <View style={{ position: "absolute", bottom: 30, left: 30 }}>
        <Cartel item={item} />
      </View>
    </View>
  )
}

export default Mapa

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 50,
  },
})
