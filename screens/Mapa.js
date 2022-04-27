import React, { useEffect, useState } from "react"
import MapView, { Polyline, PROVIDER_GOOGLE } from "react-native-maps"
import { StyleSheet, View, Dimensions, StatusBar } from "react-native"
import { getRuta } from "../api/rutas"
import { mapStyle } from "../utils/mapStyle"
import Cartel from "../components/cartel"

function Mapa({ route }) {
  const { item } = route.params

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
    console.log(item)
    getRuta(item.id)
      .then((ruta) => {
        setPline(ruta)
      })
      .catch(console.error)
  }, [])

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
      <View style={{ position: "absolute", bottom: 30, left:30 }}>
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
