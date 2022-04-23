import React, { useEffect, useState } from "react"
import MapView, { Polyline, PROVIDER_GOOGLE } from "react-native-maps"
import { StyleSheet, View, Dimensions, StatusBar } from "react-native"
import { getRuta } from "../api/rutas"
import { mapStyle } from "../utils/mapStyle"

function Mapa({ navigation }) {
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

  useEffect(() => {
    getRuta(2)
      .then((ruta) => {
        setPline(ruta)
      })
      .catch(console.error)
  }, [])

  return (
    <View style={styles.container} flexDirection="column">
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
        onPress={(e) => setMarkers({ marker: e.nativeEvent.coordinate })}
      >
        {
          // if state contains marker variable with a valid value, render the marker
          markers.marker && <MapView.Marker coordinate={markers.marker} />
        }

        {pline.length > 0 && (
          <Polyline
            coordinates={pline}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
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
      </MapView>
      <View
        style={{
          position: "absolute", //use absolute position to show button on top of the map
          top: "50%", //for center align
          alignSelf: "flex-end", //for align to right
        }}
      ></View>
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
    height: Dimensions.get("window").height,
  },
})
