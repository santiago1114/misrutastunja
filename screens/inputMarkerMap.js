import React, { useRef, useState, useCallback } from "react"
import {
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Dimensions,
  FlatList,
} from "react-native"
import { getLocation } from "../utils/functions"
import { COLORS, TUNJA_LOCATION } from "../utils/constants"
import {
  FontAwesome,
  Ionicons,
  Entypo,
  MaterialCommunityIcons ,
} from "@expo/vector-icons"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import * as rootNavigation from "../navigation/rootNavigation"
import { useFocusEffect } from "@react-navigation/native"
import { autocomplete, detail } from "../api/geocoder"

const handleEmpty = () => {
  return <></>
}

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
                  latitudeDelta: 0.001,
                  longitudeDelta: 0.001,
                })

                mapRef.current.animateToRegion(
                  {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                  },
                  1000
                )
              })
              .catch(() => "No se otorgaron permisos de localización")
          }
        >
          <MaterialCommunityIcons
            name="crosshairs-gps"
            size={44}
            color={COLORS.azul}
          />
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
            mapRef.current.animateToRegion(
              {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
              },
              1000
            )
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
      <MapView
        style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        ref={mapRef}
        onRegionChangeComplete={setRegion}
        showsUserLocation={true}
        showsMyLocationButton={false}
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
            top: 20,
            height: 80,
            width: 80,
            borderRadius: 40,
            flexDirection: "row",
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

      <View style={{ flex: 1, position: "absolute", bottom: 40, width: "90%" }}>
        {autoCompleteList.length > 0 && (
          <FlatList
            style={styles.autocompleteList}
            data={autoCompleteList}
            extraData={autoCompleteList}
            ListEmptyComponent={handleEmpty}
            keyExtractor={(item) => {
              return item.place_id
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  detail(item.place_id)
                    .then((res) => {
                      mapRef.current.animateToRegion(
                        {
                          latitude: res.geometry.location.lat,
                          longitude: res.geometry.location.lng,
                          latitudeDelta: 0.003,
                          longitudeDelta: 0.003,
                        },
                        1000
                      )
                      setAddress(res.formatted_address)
                      setAutoCompleteList([])
                    })
                    .catch(console.error)
                }}
                style={{ padding: 4 }}
              >
                <Text
                  AddressSearcher
                  style={{ color: "black", paddingVertical: 4 }}
                >
                  {item.description}
                </Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => (
              <View
                style={{ width: "100%", height: 2, backgroundColor: "#EEEEEE" }}
              ></View>
            )}
          />
        )}

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            style={styles.textInput}
            value={address}
            onChangeText={setAddress}
            onSubmitEditing={() => {
              autocomplete(address)
                .then((res) => {
                  setAutoCompleteList(res)
                })
                .catch(console.error)
            }}
            placeholder="Digita una ubicación"
          />
          <TouchableOpacity
            style={styles.textInputBtn}
            onPress={() => {
              autocomplete(address)
                .then((res) => {
                  setAutoCompleteList(res)
                })
                .catch(console.error)
            }}
          >
            <FontAwesome name="search" color="white" size={24} />
          </TouchableOpacity>
        </View>
      </View>
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
    marginHorizontal: 20,
    borderColor: "#EEEEEE",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 15,
    marginBottom: 10,
  },
  textInput: {
    height: 50,
    width: "90%",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 10,
    backgroundColor: "white",
  },
  textInputBtn: {
    flexDirection: "column",
    backgroundColor: COLORS.azul,
    padding: 8,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    height: 50,
    justifyContent: "center",
  },
})

export default InputMarkerMap
