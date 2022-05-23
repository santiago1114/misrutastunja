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
import { FontAwesome, Ionicons, Entypo } from "@expo/vector-icons"
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
function InputMarkerMap({ route }) {
  const [address, setAddress] = useState("")
  const [autoCompleteList, setAutoCompleteList] = useState([])
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

          if (mapRef && route.params.type === "origen") {
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
      />

      <View style={{ marginBottom: 50 }}>
        {route.params.type === "origen" ? (
          <Entypo name="location-pin" size={50} color={COLORS.morado} />
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

      <View style={{ flex: 1, position: "absolute", bottom: 50, width: "90%" }}>
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
                <Text AddressSearcher style={{ color: "black", fontSize: 13 }}>
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
    justifyContent: "center",
  },
  txt: {
    fontSize: 15,
    lineHeight: 19,
    color: "white",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
    top: 0,
    left: 0
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
