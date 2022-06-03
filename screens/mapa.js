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
import {
  Entypo,
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons"
import { useFocusEffect } from "@react-navigation/native"
import { COLORS } from "../utils/constants"
import { getLocation } from "../utils/functions"
import HMSMap, { MapTypes, HMSPolyline, HMSMarker } from "@hmscore/react-native-hms-map";

async function getRef(mapRef, route) {
  if (mapRef && route.params.coords.origen && route.params.coords.destino) {
    await setTimeout(() => {
      mapRef.current.fitToSuppliedMarkers(["origen", "destino"], {
        edgePadding: { top: 150, right: 24, bottom: 0, left: 24 },
        animated: true,
      })
    }, 500)
  }
}

function Mapa({ route, navigation }) {
  const { item } = route.params

  const mapRef = useRef(null)
  const [pline, setPline] = useState([])
  const [hideFlag, setHideFlag] = useState(true)
  const [markers, setMarkers] = useState({
    markers: null,
  })
  const [region, setRegion] = useState({
    latitude: 5.540147272002443,
    longitude: -73.35916010380109,
    latitudeDelta: 0.09,
    longitudeDelta: 0.045,
  })
  //const isFocused = useIsFocused()
  useFocusEffect(
    useCallback(() => {
      getRuta(item.id)
        .then((ruta) => {
          setPline(ruta)
        })
        .catch(console.error)

      //getRef(mapRef, route)
    }, [])
  )

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ marginRight: 14 }}
            onPress={() => setHideFlag(!hideFlag)}>
            <MaterialIcons name="info" size={32} color={COLORS.azul} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              getLocation()
                .then((location) => {
                  setRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.004,
                    longitudeDelta: 0.004,
                  })

                  mapView.setCoordinates({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  })
                })
                .catch(() => "No se otorgaron permisos de localización")
            }>
            <MaterialIcons name="my-location" size={32} color={COLORS.azul} />
          </TouchableOpacity>
        </View>
      ),
    })
  }, [navigation, hideFlag])

  return (
    <View>
      <StatusBar animated={true} backgroundColor="white" />
      <HMSMap
        style={styles.mapStyle}
        ref={mapRef}>
        {
          // if state contains marker variable with a valid value, render the marker
          markers.marker && <HMSMarker coordinate={markers.marker} />
        }

        {pline.length > 0 && (
          <HMSPolyline
            points={pline}
            color="rgba(52, 73, 94 ,0.9)" // fallback for when `strokeColors` is not supported by the map-provider
            width={7}
          />
        )}

        {pline[0] && (
          <>
            <HMSMarker key={1} coordinate={pline[0]}>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "black",
                  }}>
                  Inicio Ruta
                </Text>
                <MaterialCommunityIcons name="bus-alert" size={24} />
              </View>
            </HMSMarker>
            <HMSMarker key={2} coordinate={pline[pline.length - 1]}>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "black",
                  }}>
                  Fin Ruta
                </Text>
                <MaterialCommunityIcons name="bus-alert" size={24} />
              </View>
            </HMSMarker>

            {route.params.coords.origen && (
              <HMSMarker
                coordinate={route.params.coords.origen}
                title="Punto de partida"
                animation={1}
                key={3}
                identifier="origen">
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      textShadowRadius: 10,
                      textShadowColor: "white",
                    }}>
                    Origen
                  </Text>
                  <Entypo name="location-pin" size={50} color={COLORS.rojo} />
                </View>
              </HMSMarker>
            )}
            {route.params.coords.destino && (
              <HMSMarker
                coordinate={route.params.coords.destino}
                title="Punto destino"
                animation={1}
                key={4}
                identifier="destino">
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      textShadowRadius: 10,
                      textShadowColor: "white",
                    }}>
                    Destino
                  </Text>
                  <Entypo name="location-pin" size={50} color={COLORS.verde} />
                </View>
              </HMSMarker>
            )}
          </>
        )}
      </HMSMap>
      <View style={{ position: "absolute", top: 20, left: 20 }}>
        {hideFlag ? (
          <></>
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
    width: "100%",
    height: "100%",
  },
})
