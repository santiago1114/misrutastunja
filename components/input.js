import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import * as rootNavigation from "../navigation/rootNavigation"
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons"
import { COLORS } from "../utils/constants"

function Input({ placeholder, type, checkFlag }) {
  return (
    <TouchableOpacity
      onPress={() => rootNavigation.navigate("MarkerMap", { type })}
    >
      <View style={styles.mapInput}>
        <View style={styles.group}>
          <View style={{ maxWidth: "90%" }}>
            <Text style={styles.txt}>{placeholder}</Text>
          </View>
          {checkFlag ? (
            <>
              {type === "origen" ? (
                <MaterialCommunityIcons
                  size={24}
                  color={COLORS.rojo}
                  name="map-marker-check"
                />
              ) : (
                <MaterialCommunityIcons
                  size={24}
                  color={COLORS.verde_claro}
                  name="map-marker-check"
                />
              )}
            </>
          ) : (
            <MaterialIcons size={24} color="black" name="location-searching" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  mapInput: {
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "rgba(255,253,253,1)",
  },
  group: {
    width: "100%",
    height: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txt: {
    fontSize: 14,
    fontWeight: "bold",
    color: "gray",
  },
})

export default Input
