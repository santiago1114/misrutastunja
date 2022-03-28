import React, { useEffect, useState } from "react";
import MapView, { Geojson, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, Dimensions, StatusBar, Button } from "react-native";
import { getRutas } from "../api/rutas";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

function Mapa({ navigation }) {
  const [x, setx] = useState({ latitude: 0, longitude: 0 });
  const [ruta, setRuta] = useState({});

  useEffect(() => {
    getRutas()
      .then((rutas) => {
        setRuta(rutas);
        console.log(rutas);
      })
      .catch(console.error);
  }, []);

  return (
    <View style={styles.container} flexDirection="column">
      <StatusBar animated={true} backgroundColor="#18B8EC" />
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 5.540147272002443,
          longitude: -73.35916010380109,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
{/*         {ruta !== undefined && (
          <Geojson
          geojson={ruta}
          strokeColor="red"
          fillColor="green"
          strokeWidth={2}
          />
        )} */}
      </MapView>
      <View
        style={{
          position: "absolute", //use absolute position to show button on top of the map
          top: "50%", //for center align
          alignSelf: "flex-end", //for align to right
        }}
      ></View>
    </View>
  );
}

export default Mapa;
