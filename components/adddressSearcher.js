import React from "react"
import {
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { COLORS } from "../utils/constants"
import { autocomplete, detail } from "../api/geocoder"
import { RFPercentage } from "react-native-responsive-fontsize"

const handleEmpty = () => {
  return <></>
}

function AddressSearcher({
  address,
  setAddress,
  autoCompleteList,
  setAutoCompleteList,
  mapRef,
}) {
  return (
    <View
      style={{ flex: 1, position: "absolute", top: 10, marginHorizontal: 10 }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}>
        <TextInput
          style={[
            styles.textInput,
            address === ""
              ? { width: "100%", borderRadius: 20 }
              : {
                  width: "80%",
                  borderBottomLeftRadius: 20,
                  borderTopLeftRadius: 20,
                },
          ]}
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
        {address !== "" && (
          <TouchableOpacity
            style={styles.textInputBtn}
            onPress={() => {
              autocomplete(address)
                .then((res) => {
                  setAutoCompleteList(res)
                })
                .catch(console.error)
            }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "white", fontSize: RFPercentage(2) }}>
                Buscar
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

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
              style={{ padding: 4 }}>
              <Text
                AddressSearcher
                style={{ color: "black", paddingVertical: 4 }}>
                {item.description}
              </Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => (
            <View
              style={{
                width: "100%",
                height: 2,
                backgroundColor: "#EEEEEE",
              }}></View>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
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
    width: "20%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
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

export default AddressSearcher
